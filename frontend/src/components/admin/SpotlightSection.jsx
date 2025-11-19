const SpotlightList = ({ title, items, emptyText }) => (
  <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <ul className="mt-4 space-y-4">
      {items.length ? (
        items.map((item) => (
          <li
            key={`${title}-${item._id}`}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-white">
                {item.title}
              </p>
              {typeof item.likesCount === "number" && (
                <span className="rounded-full border border-indigo-500/60 px-3 py-1 text-xs text-indigo-100">
                  {item.likesCount} likes
                </span>
              )}
            </div>
            <p className="mt-1 text-slate-400">
              {item.author?.name || "Unknown author"}
            </p>
            {item.date && (
              <p className="text-xs text-slate-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))
      ) : (
        <li className="rounded-2xl border border-dashed border-slate-800/60 bg-slate-900/20 p-4 text-sm text-slate-400">
          {emptyText}
        </li>
      )}
    </ul>
  </div>
);

const SpotlightSection = ({ spotlight }) => {
  const recentPosts = spotlight?.recentPosts ?? [];
  const topLiked = spotlight?.topLiked ?? [];

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <SpotlightList
        title="Fresh arrivals"
        items={recentPosts}
        emptyText="No recent posts to highlight right now."
      />
      <SpotlightList
        title="Crowd favourites"
        items={topLiked}
        emptyText="No top liked posts yet."
      />
    </section>
  );
};

export default SpotlightSection;

