import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourseById } from "../../../../services/courseService";
import supabase from "../../../../utils/supabase";

type Status = "verifying" | "success" | "error";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Paystack appends the reference as either `reference` or `trxref`
    // depending on how checkout was initiated.
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");

    if (!reference) {
      setStatus("error");
      setError("No payment reference found in the URL.");
      return;
    }

    const verify = async () => {
      const { data, error: fnError } = await supabase.functions.invoke(
        "verify-transaction",
        { body: { reference } },
      );

      if (fnError || !data?.courseId) {
        setStatus("error");
        setError("We couldn't confirm your payment. If you were charged, contact support.");
        return;
      }

      setStatus("success");

      const course = await getCourseById(Number(data.courseId));

      // Brief pause so the success state is actually visible before redirecting.
      setTimeout(() => {
        navigate("/myCourses", {
          state: { newCourseId: course?.id ?? Number(data.courseId) },
        });
      }, 1200);
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="max-w-sm w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        {status === "verifying" && (
          <>
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
            <h1 className="text-gray-900 font-bold text-lg mb-1.5">Confirming your payment</h1>
            <p className="text-gray-500 text-sm">
              Hang tight — we're verifying your transaction with Paystack.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-5 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-gray-900 font-bold text-lg mb-1.5">Payment confirmed!</h1>
            <p className="text-gray-500 text-sm">Taking you to your course...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-5 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-gray-900 font-bold text-lg mb-1.5">Something went wrong</h1>
            <p className="text-gray-500 text-sm mb-5">{error}</p>
            <button
              onClick={() => navigate("/myCourses")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl border-none cursor-pointer"
            >
              Go to My Courses
            </button>
          </>
        )}
      </div>
    </div>
  );
}