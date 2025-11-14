import React, { useState } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setFlag }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.isAdmin) {
      const response = await apiInstance.post("/auth/login", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await apiInstance.post("/auth/admin/login", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
    }
    setFormData({
      email: "",
      password: "",
      isAdmin: false,
    });
  };

  return (
    <section className="min-h-screen w-full bg-slate-900 px-4 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-900/40 sm:p-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-indigo-500/30 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-indigo-300">
            Tech-Terms Portal
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Welcome back to Tech-Terms
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            Sign in to continue exploring curated tech terminology, manage your saved lists, and stay updated with the latest definitions.
          </p>
          <ul className="space-y-3 text-lg text-slate-200">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/40 text-xl font-semibold text-indigo-300">
                1
              </span>
              Access expert-reviewed glossary entries anywhere.
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/40 text-xl font-semibold text-indigo-300">
                2
              </span>
              Switch between user and admin panels effortlessly.
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/40 text-xl font-semibold text-indigo-300">
                3
              </span>
              Stay synced with personalized learning spaces.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 shadow-xl backdrop-blur sm:p-8">
          <form
            autoComplete="off"
            className="flex flex-col gap-6"
            onSubmit={handleFormSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-lg font-semibold text-slate-200"
              >
                Email Address
              </label>
              <input
                id="email"
                className="w-full rounded-xl border border-slate-600 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="email"
                name="email"
                placeholder="name@techterms.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full rounded-xl border border-slate-600 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-900/30 px-4 py-3">
              <label
                htmlFor="isAdmin"
                className="flex items-center gap-3 text-lg font-medium text-slate-200"
              >
                <input
                  name="isAdmin"
                  id="isAdmin"
                  type="checkbox"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-500 bg-slate-900 text-indigo-500 focus:ring-indigo-400"
                />
                Login as admin
              </label>
              <p className="text-sm text-slate-400">
                Toggle to access the admin dashboard.
              </p>
            </div>

            <button className="w-full rounded-xl bg-indigo-500 px-6 py-3 text-2xl font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
              Login
            </button>

            <p className="text-center text-lg text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-300 underline-offset-4 transition hover:text-indigo-200 hover:underline"
              >
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
