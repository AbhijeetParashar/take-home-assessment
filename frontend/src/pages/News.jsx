import { useEffect, useState, useMemo } from "react";
import { getNews } from "../services/api";
import CategoryFilter from "../components/news/CategoryFilter";
import NewsList from "../components/news/NewsList";
import SearchBar from "../components/assets/SearchBar";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getNews();
        const newsData = response.data?.data || [];

        setNews(newsData);
      } catch (err) {
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(news.map((item) => item.category))];
    return uniqueCategories.sort();
  }, [news]);

  const filteredNews = useMemo(() => {
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
        <ErrorMessage message={error} />
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
