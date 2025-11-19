import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiInstance from "../apiInstance";
import DashboardHeader from "../components/admin/DashboardHeader";
import StatsCards from "../components/admin/StatsCards";
import DashboardFilters from "../components/admin/DashboardFilters";
import PostsGrid from "../components/admin/PostsGrid";
import SpotlightSection from "../components/admin/SpotlightSection";

const initialFilters = {
  search: "",
  sortBy: "date",
  sortOrder: "desc",
  page: 1,
  limit: 6,
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await apiInstance.get("/admin/dashboard", {
          params: filters,
        });
        if (!ignore) {
          setDashboard(data);
        }
      } catch (err) {
        if (ignore) return;
        const status = err.response?.status;
        const message =
          err.response?.data?.message || "Unable to load dashboard data.";
        setError(message);

        if (status === 401 || status === 403) {
          toast.info("Please login as an admin to continue.");
          navigate("/login");
        } else {
          toast.error(message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      ignore = true;
    };
  }, [filters, navigate]);

  console.log(dashboard);

  const uiFilters = useMemo(
    () => ({
      ...filters,
      totalPages: dashboard?.filters?.totalPages || 1,
    }),
    [filters, dashboard]
  );

  const handleSearch = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      page: 1,
    }));
  };

  const handleOrderToggle = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
      page: 1,
    }));
  };

  const handleLimitChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    const totalPages = dashboard?.filters?.totalPages || 1;
    if (page < 1 || page > totalPages) return;
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleRefresh = () => {
    setFilters((prev) => ({ ...prev }));
  };

  const handleDeletePost = async (postId) => {
    if (!postId) return;
    const confirmDelete = window.confirm(
      "Remove this post from the platform? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setDeletingId(postId);
    try {
      await apiInstance.delete(`/admin/posts/${postId}`);
      toast.success("Post removed successfully.");
      setFilters((prev) => ({ ...prev }));
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message || "Unable to remove the post.";
      if (status === 401 || status === 403) {
        toast.info("Please login as an admin to continue.");
        navigate("/login");
      } else {
        toast.error(message);
      }
    } finally {
      setDeletingId(null);
    }
  };

  const initialLoading = loading && !dashboard;
  const refreshing = loading && Boolean(dashboard);

  if (initialLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 py-20 text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <p className="mt-6 text-lg text-slate-300">
          Preparing your control center...
        </p>
      </div>
    );
  }

  if (!dashboard && error) {
    return (
      <div className="rounded-3xl border border-red-500/50 bg-red-500/10 px-8 py-16 text-center text-red-100">
        <h2 className="text-3xl font-semibold">Access unavailable</h2>
        <p className="mt-4 text-lg">{error}</p>
        <button
          type="button"
          onClick={handleRefresh}
          className="mt-8 rounded-2xl border border-red-500/60 px-6 py-3 text-sm font-semibold text-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <DashboardHeader
        stats={dashboard?.stats}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <StatsCards stats={dashboard?.stats} />

      {error && (
        <div className="rounded-3xl border border-amber-500/40 bg-amber-500/10 px-6 py-4 text-sm text-amber-100">
          Latest data may be cached: {error}
        </div>
      )}

      <DashboardFilters
        filters={uiFilters}
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onOrderToggle={handleOrderToggle}
        onLimitChange={handleLimitChange}
      />

      <PostsGrid
        posts={dashboard?.posts || []}
        loading={refreshing}
        error={error}
        meta={dashboard?.filters}
        onRetry={handleRefresh}
        onPageChange={handlePageChange}
        onDelete={handleDeletePost}
        deletingId={deletingId}
      />

      <SpotlightSection spotlight={dashboard?.spotlight} />
    </div>
  );
};

export default AdminDashboard;
