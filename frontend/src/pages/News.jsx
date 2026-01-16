import { useState, useMemo, useCallback } from "react";
import { getNews } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import CategoryFilter from "../components/news/CategoryFilter";
import NewsList from "../components/news/NewsList";
import SearchBar from "../components/assets/SearchBar";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const News = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = useCallback(async () => {
    const response = await getNews();
    return response.data?.data || [];
  }, []);

  const { data: news, loading, error } = usePolling(fetchNews, 30000);

  const categories = useMemo(() => {
    if (!news) return [];
    const uniqueCategories = [...new Set(news.map((item) => item.category))];
    return uniqueCategories.sort();
  }, [news]);

  const filteredNews = useMemo(() => {
    if (!news) return [];
    let filtered = news;

    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [news, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          News
        </h1>
        <LoadingCard count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          News
        </h1>
        <ErrorMessage message="Failed to load news. Please try again." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
        News
      </h1>

      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search news by title or source..."
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="text-sm text-gray-600">
          Showing {filteredNews.length} news article
          {filteredNews.length !== 1 ? "s" : ""}
        </div>
      </div>

      <NewsList news={filteredNews} />
    </div>
  );
};

export default News;
