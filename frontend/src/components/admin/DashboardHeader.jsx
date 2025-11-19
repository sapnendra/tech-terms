const DashboardHeader = ({ stats, onRefresh, refreshing }) => {
  const totalPosts = stats?.totalPosts ?? 0;
  const activeAuthors = stats?.activeAuthors ?? 0;

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950/80 p-8 shadow-2xl shadow-slate-900/40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-300/70">
            Control Center
          </p>
          <h1 className="mt-2 text-3xl font-bold text-red-400 sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            Monitor every published insight, track engagement, and keep Tech
            Terms tidy. {totalPosts} curated{" "}
            {totalPosts === 1 ? "post" : "posts"} authored by{" "}
            {activeAuthors || "zero"} community{" "}
            {activeAuthors === 1 ? "expert" : "authors"} are at your command.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 px-6 py-3 text-lg font-semibold text-indigo-100 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{refreshing ? "Refreshing" : "Refresh data"}</span>
          {refreshing ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-300 border-t-transparent" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-indigo-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.242V5.106M2.25 14.652v4.242h4.243"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 0 1-15.334 6.364L2.25 21.75M3 12a9 9 0 0 1 15.334-6.364L21.75 2.25"
              />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default DashboardHeader;

