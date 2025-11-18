import React, { useEffect, useState } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Check if user is authenticated
        const authResponse = await apiInstance.get("/auth/is-auth");
        if (!authResponse.data?.success) {
          toast.info("Please login to edit posts.");
          navigate("/login");
          return;
        }

        // Fetch post data
        const response = await apiInstance.get(`/post/${id}`);
        if (response.data?.success) {
          const post = response.data.post;
          
          // Check if user owns this post
          const userId = authResponse.data.user._id.toString();
          const postUserId = post.user._id.toString();
          
          if (userId !== postUserId) {
            toast.error("You can only edit your own posts.");
            navigate("/profile");
            return;
          }

          setFormData({
            title: post.title || "",
            content: post.content || "",
          });
        } else {
          setError(response.data?.message || "Failed to fetch post");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.info("Please login to edit posts.");
          navigate("/login");
        } else if (err.response?.status === 404) {
          toast.error("Post not found.");
          navigate("/profile");
        } else {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiInstance.put(`/post/edit/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message || "Post updated successfully");
        navigate("/profile");
      } else {
        toast.error(response.data.message || "Failed to update post");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <section className="space-y-10 py-10">
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-10 py-10">
        <div className="rounded-3xl border border-red-500/50 bg-red-500/10 px-6 py-10 text-center text-red-100">
          <p className="text-xl font-semibold">Something went wrong</p>
          <p className="mt-2 text-lg text-red-200">{error}</p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-4 rounded-xl bg-red-500 px-6 py-2 font-semibold text-white transition hover:bg-red-400"
          >
            Back to Profile
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <p className="inline-flex items-center rounded-full border border-indigo-500/30 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-indigo-300">
            Edit Post
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Update Your Tech Term
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            Modify your post to keep the information accurate and up-to-date.
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
                onClick={() => navigate("/profile")}
                className="rounded-2xl border border-slate-600 bg-slate-800/50 px-6 py-3 text-lg font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.content.length < 200}
                className="rounded-2xl bg-indigo-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Edit;
