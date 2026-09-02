import { useEffect, useRef, useState } from "react";
import { Bell, GraduationCap, Search, LogOut, UserCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import  supabase from "../../../utils/supabase"; 
import type { User as SupabaseUser } from "@supabase/supabase-js";
import ProfilePanel from "../profile"; 

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/myCourses", label: "My Courses" },
  { to: "/library", label: "Library" },
  { to: "/messages", label: "Messages" },
];

function ProfileMenu({
  user,
  onOpenProfile,
}: {
  user: SupabaseUser;
  onOpenProfile: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const initials =
    (user.user_metadata?.full_name as string | undefined)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={open}
        className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-slate-200 transition-transform hover:scale-105"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-blue-600 text-sm font-semibold text-white">
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onOpenProfile();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <UserCircle className="h-4 w-4" />
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function TopNav() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoadingUser(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

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

        {loadingUser ? (
          <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
        ) : user ? (
          <ProfileMenu user={user} onOpenProfile={() => setProfilePanelOpen(true)} />
        ) : (
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-orange-300 ring-1 ring-slate-200" />
        )}
      </div>

      <ProfilePanel open={profilePanelOpen} onClose={() => setProfilePanelOpen(false)} />
    </header>
  );
}

export default TopNav;