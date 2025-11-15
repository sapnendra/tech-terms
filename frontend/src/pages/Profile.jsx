import React, { useEffect, useState } from "react";
import apiInstance from "../apiInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        // Check if user is authenticated
        const authResponse = await apiInstance.get("/auth/is-auth");
        if (!authResponse.data?.success) {
          toast.info("Please login to view your profile.");
          navigate("/login");
          return;
        }

        // Set user data
        setUser(authResponse.data.user);

        // Fetch user's posts
        const postsResponse = await apiInstance.get("/post/user-posts");
        if (postsResponse.data?.success) {
          setPosts(postsResponse.data.post || []);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.info("Please login to view your profile.");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeletingId(postId);
    try {
      const response = await apiInstance.delete(`/post/delete/${postId}`);
      if (response.data?.success) {
        toast.success(response.data.message || "Post deleted successfully");
        // Remove the deleted post from the list
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      } else {
        toast.error(response.data?.message || "Failed to delete post");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  if (loading) {
    return (
      <section className="space-y-10 py-10">
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
        </div>
      </section>
    );
  }

  if (error && !user) {
    return (
      <section className="space-y-10 py-10">
        <div className="rounded-3xl border border-red-500/50 bg-red-500/10 px-6 py-10 text-center text-red-100">
          <p className="text-xl font-semibold">Something went wrong</p>
          <p className="mt-2 text-lg text-red-200">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="space-y-10 py-10">
        {/* User Info Section */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-4 text-center">
            <p className="inline-flex items-center rounded-full border border-indigo-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-indigo-200">
              Your Profile
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Welcome back, {user?.name || "User"}
            </h1>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-slate-900/40 sm:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Name
                </label>
                <p className="mt-2 text-xl font-semibold text-white">
                  {user?.name || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <p className="mt-2 text-xl font-semibold text-white">
                  {user?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Your Posts ({posts.length})
          </h2>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12 text-center text-slate-300">
              <p className="text-lg">
                You haven't created any posts yet.{" "}
                <button
                  onClick={() => navigate("/create-post")}
                  className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-indigo-300 hover:underline"
                >
                  Create your first post
                </button>
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-slate-900/40 transition hover:border-indigo-500/60"
                >
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>
                      {new Date(post.date).toLocaleDateString(undefined, {
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
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-lg text-slate-300">
                    {post.content}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(post._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/60 bg-indigo-500/10 px-6 py-3 text-lg font-semibold text-white transition hover:bg-indigo-500/20"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post._id)}
                      disabled={deletingId === post._id}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/60 bg-red-500/10 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingId === post._id ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
