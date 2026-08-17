import { Smartphone } from "lucide-react";

// ── Types
interface CourseProgress {
  moduleLabel: string;
  title: string;
  subtitle: string;
  progress: number;
  progressColor: string;
  buttonStyle: string;
  cover: React.ReactNode;
}


const continueLearning: CourseProgress[] = [
  {
    moduleLabel: "MODULE 4 / 12",
    title: "Advanced Web Development",
    subtitle: "React Hooks & State Management",
    progress: 65,
    progressColor: "bg-blue-600",
    buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    cover: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-teal-300 via-teal-400 to-teal-600">
        <div className="absolute -right-6 h-40 w-40 rounded-full bg-white/25 blur-xl" />
        <span className="relative font-['Georgia',serif] text-2xl italic text-white/90">
          Advanced
          <br />
          <span className="text-lg not-italic">Web dev</span>
        </span>
      </div>
    ),
  },
  {
    moduleLabel: "MODULE 2 / 8",
    title: "UI Design Fundamentals",
    subtitle: "Color Theory & Visual Hierarchy",
    progress: 32,
    progressColor: "bg-purple-500",
    buttonStyle: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    cover: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-pink-200 to-rose-300">
        <div className="flex h-24 w-16 items-center justify-center rounded-2xl border-4 border-slate-700/80 bg-white/70 shadow-lg">
          <Smartphone className="h-8 w-8 text-slate-500" />
        </div>
      </div>
    ),
  },
];

function ContinueLearning() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
        <a
          href="#"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {continueLearning.map((c) => (
          <div
            key={c.title}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="relative h-40">
              {c.cover}
              <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                {c.moduleLabel}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-[17px] font-bold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">{c.subtitle}</p>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-500">Overall Progress</span>
                <span className="font-semibold text-slate-900">
                  {c.progress}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${c.progressColor}`}
                  style={{ width: `${c.progress}%` }}
                />
              </div>

              <button
                className={`mt-5 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${c.buttonStyle}`}
              >
                Resume Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ContinueLearning;