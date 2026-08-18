import { Flame } from "lucide-react";

function DailyStreak() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
        <Flame className="h-5 w-5 text-orange-500" />
      </span>
      <div>
        <p className="text-xs text-slate-500">Daily Streak</p>
        <p className="text-sm font-bold text-slate-900">12 Days</p>
      </div>
    </div>
  );
}
export default DailyStreak