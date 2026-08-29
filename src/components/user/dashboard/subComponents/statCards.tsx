import { useEffect, useState } from "react";
import { Clock, CheckCircle2, Star, Award } from "lucide-react";
import supabase from "../../../../utils/supabase"; 

interface StatCard {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  badgeStyle: string;
  label: string;
  value: string;
}

export default function StatCards() {
  const [completedCount, setCompletedCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompletedCount = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCompletedCount(0);
        return;
      }

      const { count, error } = await supabase
        .from("my_courses")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "completed");

      if (error) {
        console.error("Failed to fetch completed course count:", error);
        setCompletedCount(0);
        return;
      }

      setCompletedCount(count ?? 0);
    };

    fetchCompletedCount();
  }, []);

  const stats: StatCard[] = [
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      iconBg: "bg-blue-50",
      badge: "+12%",
      badgeStyle: "bg-emerald-50 text-emerald-600",
      label: "Hours Spent",
      value: "124.5h",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-purple-600" />,
      iconBg: "bg-purple-50",
      badge: "Active",
      badgeStyle: "bg-purple-50 text-purple-600",
      label: "Completed",
      value:
        completedCount === null
          ? "..."
          : `${completedCount} Course${completedCount === 1 ? "" : "s"}`,
    },
    {
      icon: <Star className="h-5 w-5 text-amber-500" />,
      iconBg: "bg-amber-50",
      badge: "Top 5%",
      badgeStyle: "bg-slate-100 text-slate-500",
      label: "Average Grade",
      value: "A- (3.8)",
    },
    {
      icon: <Award className="h-5 w-5 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      badge: "In Progress",
      badgeStyle: "bg-slate-100 text-slate-500",
      label: "Certificates Earned",
      value: "12",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
              {s.icon}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.badgeStyle}`}
            >
              {s.badge}
            </span>
          </div>
          <p className="text-sm text-slate-500">{s.label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}