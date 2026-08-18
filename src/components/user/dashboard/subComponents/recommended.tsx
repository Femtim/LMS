import {
  Coffee,
  Glasses,
  Laptop,
    ChevronLeft,    
    ChevronRight
} from "lucide-react";



// ── Types
interface RecommendedCourse {
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  instructor: string;
  avatarColor: string;
  price: string;
  cover: React.ReactNode;
}

const recommended: RecommendedCourse[] = [
  {
    tag: "NEW • 24 LESSONS",
    tagColor: "text-emerald-600",
    title: "Cybersecurity Essentials",
    description:
      "Learn the fundamentals of protecting systems, networks, and programs from digital attacks.",
    instructor: "Dr. Sarah Chen",
    avatarColor: "bg-emerald-600",
    price: "$49.99",
    cover: (
      <div className="flex h-full w-full items-end justify-center gap-4 bg-slate-900 pb-6">
        <Glasses className="h-8 w-8 text-white/70" />
        <Laptop className="h-14 w-14 text-white/90" />
        <Coffee className="h-8 w-8 text-white/70" />
      </div>
    ),
  },
  {
    tag: "POPULAR • 42 LESSONS",
    tagColor: "text-orange-500",
    title: "Data Science with Python",
    description:
      "Master data analysis, visualization, and machine learning techniques using Python's top libraries.",
    instructor: "Prof. James Miller",
    avatarColor: "bg-teal-800",
    price: "$59.99",
    cover: (
      <div className="flex h-full w-full flex-col items-start justify-center bg-gradient-to-br from-teal-600 to-teal-800 px-6">
        <span className="font-serif text-2xl font-bold uppercase tracking-tight text-white/90">
          Data
        </span>
        <span className="font-serif text-2xl font-bold uppercase tracking-tight text-white/90">
          Anlyyic<span className="align-super text-sm">s</span>
        </span>
      </div>
    ),
  },
];

function Recommended() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Recommended for You
        </h2>
        <div className="flex gap-2">
          <button
            aria-label="Previous"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {recommended.map((r) => (
          <div
            key={r.title}
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row"
          >
            <div className="h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-56">
              {r.cover}
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p
                className={`text-xs font-semibold tracking-wide ${r.tagColor}`}
              >
                {r.tag}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-slate-900">
                {r.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {r.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`h-7 w-7 rounded-full ${r.avatarColor}`} />
                  <span className="text-sm font-medium text-slate-700">
                    {r.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-blue-600">
                    {r.price}
                  </span>
                  <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recommended;