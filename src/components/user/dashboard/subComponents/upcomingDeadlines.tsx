import { Clock } from "lucide-react";

// ── Types
interface Deadline {
  month: string;
  day: string;
  dateColor: string;
  title: string;
  subtitle: string;
  time: string;
}

const deadlines: Deadline[] = [
  {
    month: "OCT",
    day: "24",
    dateColor: "text-red-500",
    title: "React Design Patterns Quiz",
    subtitle: "Advanced Web Development",
    time: "11:59 PM",
  },
  {
    month: "OCT",
    day: "26",
    dateColor: "text-blue-600",
    title: "Wireframing Project",
    subtitle: "UI Design Fundamentals",
    time: "05:00 PM",
  },
  {
    month: "NOV",
    day: "02",
    dateColor: "text-slate-400",
    title: "Midterm Exam",
    subtitle: "Computer Architecture",
    time: "09:00 AM",
  },
];


function UpcomingDeadlines() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Upcoming Deadlines
      </h2>
      <div className="flex flex-col gap-3">
        {deadlines.map((d) => (
          <div
            key={d.title}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-slate-50 py-1.5">
              <span
                className={`text-[10px] font-bold tracking-wide ${d.dateColor}`}
              >
                {d.month}
              </span>
              <span className="text-lg font-bold text-slate-900">{d.day}</span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                {d.title}
              </p>
              <p className="text-sm text-slate-500">{d.subtitle}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {d.time}
              </div>
            </div>
          </div>
        ))}

        <button className="rounded-2xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-50">
          View Full Schedule
        </button>
      </div>
    </section>
  );
}

export default UpcomingDeadlines;