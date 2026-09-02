// File location: supabase/functions/paystack-webhook/index.ts
// Deploy with: supabase functions deploy paystack-webhook --no-verify-jwt
// (Paystack sends its own HMAC signature, not a Supabase user JWT, so the
// default JWT check must be disabled — this file verifies the signature itself below.)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// service_role bypasses RLS — this function is the one trusted place
// allowed to insert into my_courses, since it only runs after Paystack's
// signature is verified below.
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifySignature(rawBody: string, signature: string | null) {
  if (!signature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(PAYSTACK_SECRET_KEY),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const computedSignature = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedSignature === signature;
}

serve(async (req) => {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const isValid = await verifySignature(rawBody, signature);
  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const { course_id, user_id } = event.data.metadata;
    const amountPaid = event.data.amount / 100; // convert back from kobo
    const reference = event.data.reference;

    const { error } = await supabaseAdmin.from("my_courses").upsert(
      {
        user_id,
        course_id,
        amount_paid: amountPaid,
        payment_status: "paid",
        payment_reference: reference,
      },
      { onConflict: "user_id,course_id" },
    );

    if (error) {
      console.error("Failed to record enrollment:", error);
      return new Response("DB error", { status: 500 });
    }
  }

  // Always 200 quickly so Paystack doesn't retry unnecessarily
  return new Response("ok", { status: 200 });
});