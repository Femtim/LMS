import { useEffect, useRef, useState } from "react";
import { Button } from "./button.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import supabase from "../../utils/supabase.ts"; 
import type { User as SupabaseUser } from "@supabase/supabase-js";
import ProfilePanel from "../user/profile.tsx"; 

const links = [
  { to: "/explore", label: "Course" },
  { to: "/about-us", label: "About Us" },
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

  const initials =
    (user.user_metadata?.full_name as string | undefined)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U";

  // close on outside click
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
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        {initials}
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
            onClick={() => {
              setOpen(false);
              navigate("/dashboard");
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          end
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            EduLearn
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "px-4 py-2 transition-colors font-[600]",
                    isActive
                      ? "text-blue-600 underline underline-blue-500 underline-offset-4"
                      : "text-slate-600 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            {loadingUser ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
            ) : user ? (
              <ProfileMenu user={user} onOpenProfile={() => setProfilePanelOpen(true)} />
            ) : (
              <Button text="Login" link="/login" />
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={[
          "overflow-hidden border-t border-slate-200 transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                [
                  "rounded-md px-4 py-2 text-sm font-[600] transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-2">
            {user ? (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setProfilePanelOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-left text-sm font-[600] text-slate-600 hover:bg-slate-50"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-[600] text-slate-600 hover:bg-slate-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-left text-sm font-[600] text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            ) : (
              <Button text="Login" link="/login" />
            )}
          </div>
        </nav>
      </div>

      <ProfilePanel open={profilePanelOpen} onClose={() => setProfilePanelOpen(false)} />
    </header>
  );
}

export default Navbar;