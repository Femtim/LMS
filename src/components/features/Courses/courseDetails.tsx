import { useNavigate } from "react-router-dom";
import type { Course } from "../../../types";
import Curriculum from "./Curriculum";
import Footer from "../../ui/Footer";

function StarIcons({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-base ${i <= rating ? "text-amber-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 mt-0.5"
    >
      <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M7.5 12l3 3 6-6"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* BODY */}
        <div className="flex-1 bg-gray-50">
          {/* Back button */}
          <div className="max-w-6xl mx-auto px-4 py-4 mt-6">
              <button
                onClick={() => navigate(`/explore`)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M5 12l7 7M5 12l7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>
            </div>

          <div className="max-w-6xl mx-auto px-8 py-8 flex gap-8 items-start">
            <div className="flex-1 min-w-0">
              {/* Hero */}
              <div
                className="relative rounded-2xl overflow-hidden mb-6"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={course.heroImage ?? course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {course.badge && (
                    <span
                      className={`inline-block text-white text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-3 ${
                        course.badge === "BEST SELLER"
                          ? "bg-blue-600"
                          : "bg-emerald-600"
                      }`}
                    >
                      {course.badge}
                    </span>
                  )}
                  <h1 className="text-white text-3xl font-extrabold leading-tight m-0">
                    {course.title}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 mt-0">
                {course.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  {
                    icon: "👥",
                    label: "STUDENTS",
                    value: course.students ?? "—",
                  },
                  {
                    icon: "🕐",
                    label: "DURATION",
                    value: course.duration ?? "—",
                  },
                  { icon: "⭐", label: "RATING", value: `${course.rating}/5` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{stat.icon}</span>
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-gray-900 font-extrabold text-xl">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Curriculum */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 9h8M8 13h5"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2 className="text-blue-600 font-bold text-base m-0 uppercase tracking-wider">
                    Course Curriculum
                  </h2>
                </div>
                {course.modules?.map((mod, i) => (
                  <Curriculum key={i} mod={mod} defaultOpen={i === 0} />
                ))}
              </section>

              {/* Instructor */}
              {course.instructor && (
                <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
                  <h2 className="text-gray-900 font-bold text-lg m-0 mb-4">
                    Meet Your Instructor
                  </h2>
                  <div className="flex gap-4 items-start">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-bold text-base m-0 mb-0.5">
                        {course.instructor.name}
                      </h3>
                      <p className="text-blue-600 text-sm font-medium m-0 mb-3">
                        {course.instructor.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed m-0 mb-4">
                        {course.instructor.bio}
                      </p>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                          👥 {course.instructor.students}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                          💬 {course.instructor.reviews}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Reviews */}
              {course.studentReviews && course.studentReviews.length > 0 && (
                <section>
                  <h2 className="text-blue-600 font-bold text-base m-0 mb-4 uppercase tracking-wider">
                    What students are saying
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {course.studentReviews.map((rev, i) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                      >
                        <StarIcons rating={rev.rating} />
                        <p className="text-gray-700 text-sm leading-relaxed mt-2 mb-3">
                          {rev.text}
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-gray-500 text-xs font-semibold">
                            {rev.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT: purchase card */}
            <div className="shrink-0 sticky top-20" style={{ width: 280 }}>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-gray-900 text-3xl font-extrabold">
                    ${course.price.toFixed(0)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-gray-400 text-base line-through">
                      ${course.originalPrice.toFixed(0)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/payment/${course.id}`)}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm cursor-pointer transition-all duration-200 border-none mb-2 bg-blue-600 hover:bg-blue-500"
                >
                  Enroll Now
                </button>
                <p className="text-gray-400 text-xs text-center mt-1 mb-4">
                  3-Days Money-Back Guarantee
                </p>

                <div className="border-t border-gray-100 mb-4" />

                <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
                  What's Included
                </p>
                <div className="flex flex-col gap-2.5">
                  {course.includes?.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-gray-600 text-xs leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
