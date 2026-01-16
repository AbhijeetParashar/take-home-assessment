import PropTypes from "prop-types";
import NewsItem from "../items/NewsItem";

const NewsList = ({ news }) => {
  if (news.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No news found for this category.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {news.map((item) => (
          <div key={item.id} className="p-4">
            <NewsItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewsList;
