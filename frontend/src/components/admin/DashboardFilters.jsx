import { useEffect, useState } from "react";

const sortOptions = [
  { label: "Newest first", value: "date", order: "desc" },
  { label: "Oldest first", value: "date", order: "asc" },
  { label: "Title (A-Z)", value: "title", order: "asc" },
  { label: "Most liked", value: "likes", order: "desc" },
];

const DashboardFilters = ({
  filters,
  onSearch,
  onSortChange,
  onOrderToggle,
  onLimitChange,
}) => {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  useEffect(() => {
    setSearchValue(filters.search || "");
  }, [filters.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue.trim());
  };

  const currentSortLabel =
    sortOptions.find(
      (option) =>
        option.value === filters.sortBy && option.order === filters.sortOrder
    )?.label || "Custom view";

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Filters
          </p>
          <h2 className="text-2xl font-semibold text-white">
            {currentSortLabel}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Showing page {filters.page} of {filters.totalPages || 1}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            type="button"
            onClick={() => onSortChange("date")}
            className={`rounded-full border px-4 py-2 ${
              filters.sortBy === "date"
                ? "border-indigo-500/70 bg-indigo-500/10 text-indigo-100"
                : "border-slate-700 text-slate-300 hover:border-indigo-500/60 hover:text-indigo-100"
            }`}
          >
            Date
          </button>
          <button
            type="button"
            onClick={() => onSortChange("title")}
            className={`rounded-full border px-4 py-2 ${
              filters.sortBy === "title"
                ? "border-indigo-500/70 bg-indigo-500/10 text-indigo-100"
                : "border-slate-700 text-slate-300 hover:border-indigo-500/60 hover:text-indigo-100"
            }`}
          >
            Title
          </button>
          <button
            type="button"
            onClick={() => onSortChange("likes")}
            className={`rounded-full border px-4 py-2 ${
              filters.sortBy === "likes"
                ? "border-indigo-500/70 bg-indigo-500/10 text-indigo-100"
                : "border-slate-700 text-slate-300 hover:border-indigo-500/60 hover:text-indigo-100"
            }`}
          >
            Likes
          </button>
          <button
            type="button"
            onClick={onOrderToggle}
            className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-indigo-500/70 hover:text-indigo-100"
          >
            {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
          <select
            value={filters.limit}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          >
            {[6, 12, 18, 24].map((value) => (
              <option key={value} value={value} className="bg-slate-900">
                {value} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 md:flex-row"
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.2-5.2m1.2-4.8a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title, content, or author"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-2xl border border-indigo-500/60 bg-indigo-500/10 px-8 py-3 text-lg font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
        >
          Apply search
        </button>
      </form>
    </section>
  );
};

export default DashboardFilters;

