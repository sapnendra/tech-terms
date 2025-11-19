const AdminPostCard = ({ post, onDelete, deleting }) => {
  const publishedDate = post.publishedOn
    ? new Date(post.publishedOn).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/40 p-6 shadow-xl shadow-slate-950/40">
      <div>
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
          <span>{publishedDate}</span>
          <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-300">
            Likes {post.likesCount ?? 0}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-white">
          {post.title}
        </h3>
        <p className="mt-3 text-base text-slate-300">{post.contentPreview}</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 text-sm text-slate-300">
          <p className="text-slate-400">Author</p>
          <p className="text-white">{post.author?.name}</p>
          <p className="text-slate-400">{post.author?.email}</p>
        </div>

        {post.permissions?.canDelete && (
          <button
            type="button"
            onClick={() => onDelete(post.id)}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Removing..." : "Remove post"}
            {deleting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-transparent" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 0 0-3.478-.397m-12 .563L4.5 19.5A2.25 2.25 0 0 0 6.736 21.75h10.528a2.25 2.25 0 0 0 2.237-2.25"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 5.25h4.5m-6 0h7.5m-8.25 0L7.5 6.75h9"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default AdminPostCard;

