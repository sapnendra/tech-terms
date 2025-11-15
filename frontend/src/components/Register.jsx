import React, { useState } from "react";
import apiInstance from "../apiInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiInstance.post("/auth/register", formData);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigate("/login");
  };

  return (
    <section className="w-full bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 rounded-3xl border border-slate-700 p-8 shadow-2xl shadow-slate-900/70 sm:p-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-indigo-300">
            Join Tech-Terms
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Create your Tech-Terms account
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            Unlock the curated encyclopedia of technology, organize favorite
            terminologies, and collaborate with a community of lifelong
            learners.
          </p>
          <div className="grid gap-4 text-lg text-slate-200 sm:grid-cols-2">
            {[
              "Unlimited glossary bookmarks",
              "Access to curated study paths",
              "Personalized weekly digests",
              "Early admin beta access",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl backdrop-blur sm:p-10">
          <form
            autoComplete="off"
            className="flex flex-col gap-6"
            onSubmit={handleFormSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-lg font-semibold text-slate-200"
              >
                Full Name
              </label>
              <input
                id="name"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-lg font-semibold text-slate-200"
              >
                Email Address
              </label>
              <input
                id="email"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="email"
                name="email"
                placeholder="you@techterms.com"
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
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="w-full rounded-2xl bg-indigo-500 px-6 py-3 text-2xl font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
              Create account
            </button>

            <p className="text-center text-lg text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-300 underline-offset-4 transition hover:text-indigo-200 hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
