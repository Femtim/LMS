// File location: supabase/functions/verify-transaction/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      return new Response(
        JSON.stringify({ error: "Missing reference" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Ask Paystack directly whether this transaction actually succeeded —
    // don't trust the client's word for it.
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } },
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return new Response(
        JSON.stringify({ error: "Payment not successful", status: verifyData.data?.status }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { course_id, user_id } = verifyData.data.metadata;
    const amountPaid = verifyData.data.amount / 100;

    // Same upsert as the webhook — idempotent, so it's safe if the webhook
    // already inserted this row (onConflict just updates it again with the
    // same values), and it's the reason enrollment still works even if the
    // webhook delivery itself was delayed or dropped.
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
      return new Response(
        JSON.stringify({ error: "Failed to record enrollment: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ courseId: course_id, status: "paid" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});