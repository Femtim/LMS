import {
  Calendar,
  FileText,
  LayoutGrid,
  Settings,
  Trophy
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: FileText, label: "My Courses", active: false },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: Trophy, label: "Achievements", active: false },
];

function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <div>
        <p className="mb-3 px-2 text-xs font-semibold tracking-wider text-slate-400">
          MAIN MENU
        </p>
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-blue-600 p-5 text-white">
          <p className="text-xs font-semibold tracking-wide text-blue-100">
            PRO PLAN
          </p>
          <p className="mt-1 text-lg font-bold leading-tight">
            Upgrade to Premium
          </p>
          <p className="mt-2 text-[13px] leading-snug text-blue-100">
            Access 500+ specialized courses and mentorship.
          </p>
          <button className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
            Upgrade Now
          </button>
        </div>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-[15px] font-medium text-slate-600 hover:text-slate-900"
        >
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;