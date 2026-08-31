import type { EnrolledCourse, Course } from "../../../../types";
import { ProgressBar } from "./ProgressBar";

// ── Category color map ────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string }> = {
  Development: { bg: "#2563eb", text: "#fff" },
  Design: { bg: "#7c3aed", text: "#fff" },
  Business: { bg: "#059669", text: "#fff" },
  Marketing: { bg: "#d97706", text: "#fff" },
};

export function ActiveCourseCard({
  enrolled,
  course,
  onContinue,
  onSimulateProgress,
}: {
  enrolled: EnrolledCourse;
  course: Course;
  onContinue: () => void;
  onSimulateProgress: () => void;
}) {
  const catColor = categoryColors[course.category] ?? { bg: "#2563eb", text: "#fff" };
  const isAlmostDone = enrolled.progress >= 80 && enrolled.progress < 100;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
      style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        <img src={course.heroImage ?? course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm"
          style={{ background: catColor.bg, color: catColor.text }}
        >
          {course.category}
        </span>

        {/* Almost done badge */}
        {isAlmostDone && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 shadow-sm">
            🔥 Almost there
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-gray-900 font-extrabold text-base leading-snug m-0">{course.title}</h3>
        <p className="text-gray-500 text-xs m-0">
          {course.instructor?.name ?? "Instructor"}
        </p>

        {/* Progress */}
        <div className="mt-auto pt-2">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Current Progress</span>
            <span className="font-extrabold text-sm" style={{ color: catColor.bg }}>{enrolled.progress}%</span>
          </div>
          <ProgressBar value={enrolled.progress} color={isAlmostDone ? "#f59e0b" : catColor.bg} />
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={onContinue}
            className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm border-none cursor-pointer flex items-center justify-center gap-2 transition-opacity hover:opacity-90 shadow-sm"
            style={{ background: catColor.bg }}
          >
            {isAlmostDone ? "Finish Course" : "Continue Lesson"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Simulate progress button for demo */}
          {!enrolled.completed && (
            <button
              onClick={onSimulateProgress}
              title="Simulate progress (demo)"
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 bg-white cursor-pointer transition-colors text-xs font-bold"
            >
              +10%
            </button>
          )}
        </div>
      </div>
    </div>
  );
}