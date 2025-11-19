const formatNumber = (value) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(value ?? 0);

const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Published posts",
      value: stats?.totalPosts ?? 0,
      helper: "Across all categories",
      accent: "text-indigo-300 border-indigo-500/40",
    },
    {
      label: "Community members",
      value: stats?.totalUsers ?? 0,
      helper: "Registered contributors",
      accent: "text-emerald-300 border-emerald-500/40",
    },
    {
      label: "Total likes",
      value: stats?.totalLikes ?? 0,
      helper: "Audience applause",
      accent: "text-pink-300 border-pink-500/40",
    },
    {
      label: "Avg. likes / post",
      value: stats?.averageLikes ?? 0,
      helper: "Engagement health",
      accent: "text-amber-300 border-amber-500/40",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`rounded-3xl border bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 ${card.accent}`}
        >
          <p className="text-sm uppercase tracking-widest text-slate-400">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-bold text-white">
            {formatNumber(card.value)}
          </p>
          <p className="mt-2 text-sm text-slate-400">{card.helper}</p>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;

