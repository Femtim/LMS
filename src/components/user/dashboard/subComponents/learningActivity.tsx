
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const activityData = [
  { day: "MON", hours: 3.2 },
  { day: "TUE", hours: 1.6 },
  { day: "WED", hours: 4.1 },
  { day: "THU", hours: 3.4 },
  { day: "FRI", hours: 5.4 },
  { day: "SAT", hours: 2.6 },
  { day: "SUN", hours: 0 },
];


function LearningActivity() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Learning Activity
      </h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} barCategoryGap="30%">
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
              />
              <Bar dataKey="hours" radius={[4, 4, 4, 4]}>
                {activityData.map((entry, i) => (
                  <Cell
                    key={entry.day}
                    fill={entry.hours >= 5 ? "#2563eb" : "#bfdbfe"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default LearningActivity;