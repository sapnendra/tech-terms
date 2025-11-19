import AdminPostCard from "./AdminPostCard";

const PostsGrid = ({
  posts = [],
  loading,
  error,
  meta,
  onRetry,
  onPageChange,
  onDelete,
  deletingId,
}) => {
  if (loading && !posts.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/20 py-16 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent" />
        <p className="mt-4 text-lg text-slate-400">Loading dashboard data...</p>
      </div>
    );
  }

  if (error && !posts.length) {
    return (
      <div className="rounded-3xl border border-red-500/50 bg-red-500/5 p-10 text-center text-red-100">
        <p className="text-xl font-semibold">Unable to load posts</p>
        <p className="mt-2">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-xl border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/10"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/40 px-6 py-16 text-center text-slate-300">
        <p className="text-xl font-semibold text-white">
          Clean slate, great job!
        </p>
        <p className="mt-2 text-slate-400">
          No posts match the current filters. Try adjusting your search to view
          more activity.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <AdminPostCard
            key={post.id}
            post={post}
            onDelete={onDelete}
            deleting={deletingId === post.id}
          />
        ))}
      </div>

      {meta?.totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-950/40 px-6 py-4 text-sm text-slate-300 md:flex-row">
          <p>
            Page {meta.page} of {meta.totalPages}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPageChange(meta.page - 1)}
              disabled={meta.page === 1 || loading}
              className="rounded-xl border border-slate-700 px-4 py-2 text-white transition hover:border-indigo-500/70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(meta.page + 1)}
              disabled={meta.page === meta.totalPages || loading}
              className="rounded-xl border border-slate-700 px-4 py-2 text-white transition hover:border-indigo-500/70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostsGrid;

