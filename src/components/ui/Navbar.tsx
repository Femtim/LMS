import { useState } from "react";
import { Button } from "./button.tsx";
import { NavLink } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

const links = [
  { to: "/explore", label: "Course" },
  { to: "/about-us", label: "About Us" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Button text="Login" link="/login" />
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
            <Button text="Login" link="/login" />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
