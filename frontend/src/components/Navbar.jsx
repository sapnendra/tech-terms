import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-backdrop-blur:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-3xl font-black uppercase tracking-tight text-white"
        >
          Tech-Terms
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:border-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className={`h-6 w-6 transition ${open ? "opacity-0" : "opacity-100"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            className={`absolute h-6 w-6 transition ${open ? "opacity-100" : "opacity-0"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="hidden items-center gap-10 text-lg font-semibold text-slate-200 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="rounded-2xl border border-indigo-500/70 px-6 py-2 text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500/10"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-2xl bg-indigo-500 px-6 py-2 text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400"
          >
            Sign Up
          </Link>
        </nav>
      </div>

      <div
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-slate-800 bg-slate-950/95`}
      >
        <nav className="space-y-2 px-4 py-6 text-xl font-semibold text-slate-100 sm:px-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block rounded-2xl px-4 py-3 transition hover:bg-slate-900 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/login"
              className="rounded-2xl border border-indigo-500/50 px-4 py-3 text-center text-white transition hover:bg-indigo-500/10"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-2xl bg-indigo-500 px-4 py-3 text-center text-white transition hover:bg-indigo-400"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}