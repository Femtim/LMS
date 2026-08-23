import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import supabase from "../../../../utils/supabase"; // adjust to your actual path

function DailyStreak() {
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const loadStreak = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.rpc("update_daily_streak", {
        p_user_id: user.id,
      });

      if (error) {
        console.error("Failed to update streak:", error);
        return;
      }
      setStreak(data as number);
    };

    loadStreak();
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
        <Flame className="h-5 w-5 text-orange-500" />
      </span>
      <div>
        <p className="text-xs text-slate-500">Daily Streak</p>
        <p className="text-sm font-bold text-slate-900">
          {streak === null ? "…" : `${streak} Day${streak === 1 ? "" : "s"}`}
        </p>
      </div>
    </div>
  );
}

export default DailyStreak;