import {
  Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/myCourses", label: "My Courses" },
  { to: "/schedule", label: "Schedule" },
  { to: "/achievements", label: "Achievements" },
];

function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <div>
        <p className="mb-3 px-2 text-s font-semibold tracking-wider text-slate-400">
          MAIN MENU
        </p>
        <nav className="flex flex-col gap-2 text-m font-medium text-slate-600 px-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              {link.label}
            </NavLink>
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