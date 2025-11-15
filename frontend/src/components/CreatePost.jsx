import React, { useState } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiInstance.post("/post/newpost", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ title: "", content: "" });
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-4 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <p className="inline-flex items-center rounded-full border border-indigo-500/30 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-indigo-300">
            Create New Post
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Share Your Tech Knowledge
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            Create a new tech term definition to help others learn and grow in the
            technology space.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur sm:p-10">
          <form
            autoComplete="off"
            className="flex flex-col gap-6"
            onSubmit={handleFormSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-slate-200"
              >
                Title
              </label>
              <input
                id="title"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                type="text"
                name="title"
                placeholder="e.g., React Hooks, API Gateway, Microservices"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-lg font-semibold text-slate-200"
              >
                Content
              </label>
              <textarea
                id="content"
                className="min-h-[300px] w-full rounded-2xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-lg text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 resize-y"
                name="content"
                placeholder="Write a detailed explanation of the tech term. Minimum 200 characters required."
                value={formData.content}
                onChange={handleChange}
                required
                minLength={200}
              />
              <p className="text-sm text-slate-400">
                {formData.content.length}/200 minimum characters
                {formData.content.length >= 200 && (
                  <span className="ml-2 text-green-400">✓</span>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-2xl border border-slate-600 bg-slate-800/50 px-6 py-3 text-lg font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.content.length < 200}
                className="rounded-2xl bg-indigo-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
