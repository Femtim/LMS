import { Bell, GraduationCap, Search } from "lucide-react";

const links = [
    { to : "/dashboard", label: "Dashboard" },
    { to: "/myCourses", label: "My Courses" },
    { to: "#", label: "Library" },
    { to: "#", label: "Messages" },
];

function TopNav() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div className="flex items-center gap-10">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold text-slate-900">EduLearn</span>
        </a>
        <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className={
                link.label === "Dashboard"
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              {link.label }
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-orange-300 ring-1 ring-slate-200" />
      </div>
    </header>
  );
}

export default TopNav;