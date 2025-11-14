import React, { useEffect, useMemo, useState } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [likingId, setLikingId] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await apiInstance.get("/post/all");
        setTerms(response.data.post || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const { data } = await apiInstance.get("/auth/is-auth");
        if (data?.success) {
          setCurrentUserId(data.user?._id || null);
        } else {
          setCurrentUserId(null);
        }
      } catch {
        setCurrentUserId(null);
      }
    };
    fetchAuthState();
  }, []);

  const handleLikeToggle = async (postId) => {
    setLikingId(postId);
    try {
      const { data } = await apiInstance.get(`/post/like/${postId}`);
      if (data?.post) {
        setTerms((prev) =>
          prev.map((item) => (item._id === data.post._id ? data.post : item))
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.info("Please login to like posts.");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Unable to update like.");
      }
    } finally {
      setLikingId(null);
    }
  };

  const renderedPosts = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-3xl border border-red-500/50 bg-red-500/10 px-6 py-10 text-center text-red-100">
          <p className="text-xl font-semibold">Something went wrong</p>
          <p className="mt-2 text-lg text-red-200">{error}</p>
        </div>
      );
    }

    if (!terms.length) {
      return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12 text-center text-slate-300">
          No posts yet. Check back soon for new Tech-Terms insights.
        </div>
      );
    }

    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {terms.map((term) => {
          const likesCount = term.likes?.length || 0;
          const isLiked = currentUserId
            ? term.likes?.includes(currentUserId)
            : false;

          return (
            <article
              key={term._id}
              className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-slate-900/40 transition hover:border-indigo-500/60"
            >
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>
                  {new Date(term.date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="rounded-full border border-slate-800 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
                  Tech-Terms
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">
                {term.title}
              </h2>
              <p className="mt-3 flex-1 text-lg text-slate-300">
                {term.content}
              </p>

              <button
                type="button"
                onClick={() => handleLikeToggle(term._id)}
                disabled={likingId === term._id}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/60 bg-indigo-500/10 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLiked ? "Unlike:" : "Like:"}
                <span className="text-lg font-medium text-red-500">
                  {likesCount} {likesCount === 1 ? "like" : "likes"}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    );
  }, [error, terms, loading, currentUserId, likingId]);

  return (
    <section className="space-y-10 py-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
          Tech-Terms Library
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          Discover the latest definitions and insights
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Browse community-curated entries, deepen your knowledge, and show
          appreciation with a quick like.
        </p>
      </div>
      {renderedPosts}
    </section>
  );
};

export default Home;
