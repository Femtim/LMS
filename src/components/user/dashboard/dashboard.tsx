import { useEffect, useState } from "react";
import TopNav from "../Navs/topNav";
import LearningActivity from "./subComponents/learningActivity";
import Sidebar from "../Navs/sideNav";
import StatCards from "./subComponents/statCards";
import ContinueLearning from "./subComponents/continueLearning";
import Recommended from "./subComponents/recommended";
import UpcomingDeadlines from "./subComponents/upcomingDeadlines";
import DailyStreak from "./subComponents/dailyStreak";
import supabase from "../../../utils/supabase"; 

// ── Page ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [firstName, setFirstName] = useState<string>("");
  const [loadingName, setLoadingName] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoadingName(false);
        return;
      }

      const { data, error } = await supabase
        .from("user")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch profile:", error);
        // Fallback: try auth metadata instead
        const metaName = user.user_metadata?.full_name as string | undefined;
        setFirstName(metaName?.split(" ")[0] ?? "there");
      } else {
        setFirstName(data?.full_name?.split(" ")[0] ?? "there");
      }

      setLoadingName(false);
    };

    fetchUserName();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav />

      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="flex-1 px-6 py-8 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back, {loadingName ? "..." : firstName}!{" "}
              </h1>
              <p className="mt-1 text-slate-500">
                You're doing great! You have 3 assignments due this week.
              </p>
            </div>
            <DailyStreak />
          </div>

          <div className="mb-10">
            <StatCards />
          </div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-10">
              <ContinueLearning />
              <Recommended />
            </div>
            <div className="flex flex-col gap-10">
              <UpcomingDeadlines />
              <LearningActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
