import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Guidelines", to: "/guidelines" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await apiInstance.get("/auth/is-auth");
      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const handleLogout = async () => {
    try {
      await apiInstance.post("/auth/logout");
      setIsAuthenticated(false);
      setUser(null);
      window.dispatchEvent(new Event("auth-change"));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-backdrop-blur:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-3xl font-black tracking-tight text-white">
          <span className="text-indigo-500 uppercase">Tech-Terms</span>{" "}
          <span className="text-slate-500 text-lg lowecase">by </span>
          <span className="text-red-400 text-lg uppercase">Sapnendra</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:border-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className={`h-6 w-6 transition ${
              open ? "opacity-0" : "opacity-100"
            }`}
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
            className={`absolute h-6 w-6 transition ${
              open ? "opacity-100" : "opacity-0"
            }`}
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
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/50 p-2 transition hover:border-indigo-500 hover:bg-slate-800"
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-400 to-indigo-600">
                  <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
              </button>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-2xl backdrop-blur">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/create-post"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
                    >
                      Create New Post
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="mt-2 w-full rounded-xl bg-red-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>

      <div
        className={`lg:hidden ${
          open ? "block" : "hidden"
        } border-t border-slate-800 bg-slate-950/95`}
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
          {isAuthenticated ? (
            <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/50 px-4 py-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-400 to-indigo-600">
                  <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
                <span className="text-base font-medium text-slate-200">
                  {user?.name || "User"}
                </span>
              </div>
              <Link
                to="/profile"
                className="block rounded-2xl px-4 py-3 text-center text-white transition hover:bg-slate-900"
                onClick={() => setOpen(false)}
              >
                View Profile
              </Link>
              <Link
                to="/create-post"
                className="block rounded-2xl px-4 py-3 text-center text-white transition hover:bg-slate-900"
                onClick={() => setOpen(false)}
              >
                Create New Post
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full rounded-2xl bg-red-600 px-4 py-3 text-center text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
}
