import type { Course } from "../../../../types";


export function CompletedCourseRow({ course }: { course: Course }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-7 h-7 rounded-full bg-white border-2 border-green-500 flex items-center justify-center shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-gray-900 font-bold text-sm m-0 leading-snug">{course.title}</h4>
          <span className="text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded shrink-0">
            CERTIFIED
          </span>
        </div>
        <p className="text-gray-500 text-xs m-0">Instructor: {course.instructor?.name ?? "—"}</p>
        <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            View Certificate
          </button>
          <button className="flex items-center gap-1 text-gray-500 text-xs font-semibold hover:text-gray-900 bg-transparent border-none cursor-pointer p-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Revisit Course
          </button>
        </div>
      </div>
    </div>
  );
}
