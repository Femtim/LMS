import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../../../types";
import Footer from "../../ui/Footer";
import Navbar from "../../ui/Navbar";


function InputField({
  label, placeholder, type = "text", value, onChange, hint,
}: {
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
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();

  const course = COURSES.find((c) => c.id === Number(id));

  // Form state
  const [cardName,   setCardName]   = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry,     setExpiry]     = useState("");
  const [cvv,        setCvv]        = useState("");
  const [email,      setEmail]      = useState("");
  const [success,    setSuccess]    = useState(false);
  const [loading,    setLoading]    = useState(false);

  // Format card number with spaces every 4 digits
  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  // Format expiry as MM/YY
  const handleExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setExpiry(digits);
    }
  };

  const allFilled = cardName && cardNumber.length === 19 && expiry.length === 5 && cvv.length >= 3 && email;

  const handleSubmit = () => {
    if (!allFilled) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500 text-sm">Course not found.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none">
          Back to Courses
        </button>
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-16">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">You're enrolled!</h2>
            <p className="text-gray-500 text-sm mb-1">
              Welcome to <span className="font-semibold text-gray-800">{course.title}</span>.
            </p>
            <p className="text-gray-400 text-xs mb-6">A confirmation has been sent to <span className="text-gray-600 font-medium">{email}</span>.</p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm border-none cursor-pointer transition-colors"
            >
              Browse More Courses
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = course.originalPrice ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-1 max-w-6xl mx-auto px-5 py-10 w-full">

        {/* Back */}
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
        <p className="text-gray-500 text-sm mb-8 mt-0">Secure checkout — your payment info is encrypted.</p>

        <div className="flex gap-8 items-start">

          {/* LEFT: payment form */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Email */}
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

            {/* Card details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-bold text-base m-0 mb-4">Payment details</h2>

              {/* Accepted cards */}
              <div className="flex items-center gap-2 mb-5">
                {["VISA", "MC", "AMEX", "DISC"].map((card) => (
                  <span key={card} className="border border-gray-200 rounded-md px-2.5 py-1 text-xs font-bold text-gray-500 bg-gray-50">
                    {card}
                  </span>
                ))}
                <span className="text-xs text-gray-400 ml-1">accepted</span>
              </div>

              <div className="flex flex-col gap-4">
                <InputField
                  label="Name on card"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={setCardName}
                />
                <InputField
                  label="Card number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumber}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Expiry date"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiry}
                  />
                  <InputField
                    label="CVV"
                    placeholder="123"
                    type="password"
                    value={cvv}
                    onChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                  />
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 px-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-gray-400">256-bit SSL encryption. We never store your card details.</span>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div className="shrink-0 sticky top-20" style={{ width: 300 }}>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
              <h2 className="text-gray-900 font-bold text-base m-0 mb-4">Order summary</h2>

              {/* Course thumbnail + title */}
              <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-xs font-bold leading-snug m-0 mb-0.5 line-clamp-2">{course.title}</p>
                  <p className="text-gray-400 text-xs m-0">{course.duration} · {course.level}</p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Original price</span>
                  <span className="text-gray-400 text-xs line-through">
                    ${(course.originalPrice ?? course.price).toFixed(2)}
                  </span>
                </div>
                {discount && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-xs font-medium">Discount ({discount}% off)</span>
                    <span className="text-green-600 text-xs font-medium">
                      -${((course.originalPrice ?? 0) - course.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-900 font-bold text-sm">Total</span>
                <span className="text-gray-900 font-extrabold text-xl">${course.price.toFixed(2)}</span>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                disabled={!allFilled || loading}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm border-none transition-all duration-200 ${
                  !allFilled
                    ? "bg-gray-300 cursor-not-allowed"
                    : loading
                    ? "bg-blue-400 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-500 cursor-pointer"
                }`}
              >
                {loading ? "Processing..." : `Pay $${course.price.toFixed(2)}`}
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