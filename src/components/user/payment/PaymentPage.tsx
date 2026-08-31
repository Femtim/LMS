import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Course } from "../../../types";
import { getCourseById } from "../../../services/courseService";
import Footer from "../../ui/Footer";
import Navbar from "../../ui/Navbar";
import supabase from "../../../utils/supabase";

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

function InputField({ label, placeholder, type = "text", value, onChange, hint }: {
  label: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 transition-colors bg-white"
      />
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M7.5 12l3 3 6-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      getCourseById(Number(id)).then(setCourse).catch(() => setCourse(null));
    }
  }, [id]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allFilled = email.includes("@");

  const handleCheckout = async () => {
    if (!allFilled || !course) return;
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in to enroll.");
      setLoading(false);
      navigate("/login", { state: { redirectTo: `/payment/${course.id}` } });
      return;
    }

    // Calls a Supabase Edge Function that initializes a Paystack transaction
    // server-side and returns its authorization_url. No card data ever
    // touches our app — Paystack's hosted page collects it directly.
    const { data, error: fnError } = await supabase.functions.invoke(
      "initialize-transaction",
      {
        body: {
          courseId: course.id,
          userId: user.id,
          email,
          amount: course.price, // NGN, converted to kobo server-side
        },
      },
    );

    if (fnError || !data?.authorization_url) {
      setError("Couldn't start checkout. Please try again.");
      setLoading(false);
      return;
    }

    // Redirect to Paystack's hosted checkout page.
    window.location.href = data.authorization_url;
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <p className="text-gray-500 text-sm">Course not found.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none">
          Back to Courses
        </button>
      </div>
    );
  }

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-5 py-10 w-full">
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none mb-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to course
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5 mt-0">Complete your enrollment</h1>
        <p className="text-gray-500 text-sm mb-8 mt-0">
          Secure checkout — you'll enter payment details on Paystack's encrypted checkout page.
        </p>

        <div className="flex gap-8 items-start">
          {/* LEFT: form */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-bold text-base m-0 mb-4">Contact information</h2>
              <InputField
                label="Email address"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={setEmail}
                hint="Your receipt and course access will be sent here."
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-bold text-base m-0 mb-4">Payment</h2>
              <div className="flex items-center gap-2 mb-5">
                {["Card", "Bank Transfer", "USSD"].map((method) => (
                  <span key={method} className="border border-gray-200 rounded-md px-2.5 py-1 text-xs font-bold text-gray-500 bg-gray-50">{method}</span>
                ))}
                <span className="text-xs text-gray-400 ml-1">accepted</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                You'll be redirected to Paystack's secure checkout to enter your
                card, bank transfer, or USSD details. We never see or store your
                card number.
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <div className="flex items-center gap-2 px-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-gray-400">256-bit SSL encryption via Paystack. We never store your card details.</span>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div className="shrink-0 sticky top-20" style={{ width: 300 }}>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
              <h2 className="text-gray-900 font-bold text-base m-0 mb-4">Order summary</h2>

              <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                <img src={course.image} alt={course.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-xs font-bold leading-snug m-0 mb-0.5">{course.title}</p>
                  <p className="text-gray-400 text-xs m-0">{course.duration} · {course.level}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Original price</span>
                  <span className="text-gray-400 text-xs line-through">
                    {formatNaira(course.originalPrice ?? course.price)}
                  </span>
                </div>
                {discount && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-xs font-medium">Discount ({discount}% off)</span>
                    <span className="text-green-600 text-xs font-medium">
                      -{formatNaira((course.originalPrice ?? 0) - course.price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-900 font-bold text-sm">Total</span>
                <span className="text-gray-900 font-extrabold text-xl">{formatNaira(course.price)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!allFilled || loading}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm border-none transition-all duration-200 ${
                  !allFilled ? "bg-gray-300 cursor-not-allowed"
                  : loading   ? "bg-blue-400 cursor-wait"
                  :             "bg-blue-600 hover:bg-blue-500 cursor-pointer"
                }`}
              >
                {loading ? "Redirecting to Paystack..." : `Pay ${formatNaira(course.price)}`}
              </button>
              <p className="text-gray-400 text-xs text-center mt-2 mb-0">30-Day Money-Back Guarantee</p>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2">What's Included</p>
                <div className="flex flex-col gap-2">
                  {course.includes?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-gray-500 text-xs leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}