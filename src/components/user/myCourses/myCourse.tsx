import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COURSES } from "../../../types";
import { ActiveCourseCard } from "./subComponents/ActiveCourseCard";
import { CompletedCourseRow } from "./subComponents/CompletedCourses";
import TopNav from "../Navs/topNav";
import Sidebar from "../Navs/sideNav";
import supabase from "../../../utils/supabase";

// ── Types ────────────────────────────────────────────────────────────────
// Matches the my_courses table: course_id, progress_percent, status, completed_at
interface EnrolledCourse {
  courseId: string;
  progress: number;
  completed: boolean;
  completedAt: string | null;
}

type FilterTab = "All Courses" | "In Progress" | "Completed";

// ── MyLearning (main page) ──────────────────────────────────────────────
export default function MyLearning() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    newCourseId?: number | string;
    email?: string;
  } | null;

  const [tab, setTab] = useState<FilterTab>("All Courses");
  const [enrolled, setEnrolled] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(!!state?.newCourseId);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to be logged in to view your courses.");
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("my_courses")
      .select("course_id, progress_percent, status, completed_at")
      .eq("user_id", user.id)
      .order("enrolled_at", { ascending: false });

    if (fetchError) {
      setError("Failed to load your courses: " + fetchError.message);
      setLoading(false);
      return;
    }

    setEnrolled(
      (data ?? []).map((row) => ({
        courseId: row.course_id,
        progress: row.progress_percent,
        completed: row.status === "completed",
        completedAt: row.completed_at,
      })),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Demo/testing helper — bumps progress by 10%. Wire this to real lesson
  // completion events instead of a button once that flow exists.
  const handleSimulateProgress = async (courseId: string) => {
    const current = enrolled.find((e) => e.courseId === courseId)?.progress ?? 0;
    const next = Math.min(current + 10, 100);

    const { error: updateError } = await supabase
      .from("my_courses")
      .update({ progress_percent: next })
      .eq("course_id", courseId);

    if (updateError) {
      setError("Failed to update progress: " + updateError.message);
      return;
    }

    fetchEnrollments();
  };

  const inProgress = enrolled.filter((e) => !e.completed);
  const completed = enrolled.filter((e) => e.completed);

  const visibleActive =
    tab === "Completed" ? [] : tab === "In Progress" ? inProgress : inProgress;

  const visibleCompleted =
    tab === "In Progress" ? [] : tab === "All Courses" ? completed : completed;

  const newCourse = state?.newCourseId
    ? COURSES.find((c) => String(c.id) === String(state.newCourseId))
    : null;

  return (
    <>
      <TopNav />
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        {/* ── MAIN ── */}
        <main className="flex-1 max-w-5xl mx-auto px-5 py-5 w-full">
          

          {/* Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-blue-600 text-lg font-extrabold uppercase tracking-widest m-0 mb-1">
                Student Workspace
              </p>
              <h1 className="text-slate-900 text-4xl font-extrabold m-0 mb-2">
                My Learning Journey
              </h1>
              <p className="text-gray-500 text-sm m-0 max-w-sm leading-relaxed">
                Continue where you left off and track your academic progress
                across all enrolled modules.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 rounded-2xl p-1 bg-white border border-gray-200 shadow-sm">
              {(["All Courses", "In Progress", "Completed"] as FilterTab[]).map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-5 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200"
                    style={{
                      background: tab === t ? "#2563eb" : "transparent",
                      color: tab === t ? "#fff" : "#6b7280",
                      boxShadow:
                        tab === t ? "0 2px 10px rgba(37, 99, 235, 0.2)" : "none",
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>

              {/* New enrollment banner */}
          {showBanner && newCourse && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm text-green-800">
                  <span className="font-bold">You're enrolled!</span> "{newCourse.title}" has been added to your courses.
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                aria-label="Dismiss"
                className="shrink-0 text-green-700 hover:text-green-900 bg-transparent border-none cursor-pointer text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}
          
          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <p className="text-gray-500 text-sm">Loading your courses...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-100">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Empty state */}
              {enrolled.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-3xl border border-gray-200 border-dashed shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        stroke="#2563eb"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-900 text-lg font-bold m-0">
                    No courses yet
                  </p>
                  <p className="text-gray-500 text-sm m-0">
                    Enroll in a course to start your learning journey.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl border-none cursor-pointer transition-colors shadow-md shadow-blue-600/20"
                  >
                    Browse Courses
                  </button>
                </div>
              )}

              {/* Active courses grid */}
              {visibleActive.length > 0 && (
                <div
                  className="grid gap-6 mb-12"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  }}
                >
                  {visibleActive.map((e) => {
                    const course = COURSES.find(
                      (c) => String(c.id) === e.courseId,
                    );
                    if (!course) return null;
                    return (
                      <ActiveCourseCard
                        key={e.courseId}
                        enrolled={e}
                        course={course}
                        onContinue={() => navigate(`/courses/${course.id}`)}
                        onSimulateProgress={() =>
                          handleSimulateProgress(e.courseId)
                        }
                      />
                    );
                  })}
                </div>
              )}

              {/* Completed courses */}
              {visibleCompleted.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-slate-900 text-xl font-extrabold m-0">
                      Completed Courses
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-500 bg-white text-xs font-bold border border-gray-200 rounded-full px-3 py-1 shadow-sm">
                      {visibleCompleted.length} ARCHIVED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {visibleCompleted.map((e) => {
                      const course = COURSES.find(
                        (c) => String(c.id) === e.courseId,
                      );
                      if (!course) return null;
                      return (
                        <CompletedCourseRow
                          key={e.courseId}
                          course={course}
                          completedAt={e.completedAt}
                          onRevisit={() => navigate(`/courses/${course.id}`)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No results for tab filter */}
              {enrolled.length > 0 &&
                visibleActive.length === 0 &&
                visibleCompleted.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm mt-4">
                    <p className="text-gray-500 text-sm">
                      No courses found in this category.
                    </p>
                  </div>
                )}

              {/* Browse more CTA */}
              {enrolled.length > 0 && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => navigate("/")}
                    className="bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold text-sm px-6 py-3 rounded-xl cursor-pointer transition-all shadow-sm"
                  >
                    Browse More Courses →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}