import PropTypes from "prop-types";
import { formatRelativeTime } from "../../utils/dateTime";
import { getCategoryStyle } from "../../utils/styles";
import { capitalizeFirst } from "../../utils/formatters";

const NewsItem = ({ item }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm flex-1">
          {item.title}
        </h3>
        <span
          className={`ml-2 px-2 py-1 text-xs rounded-full whitespace-nowrap ${getCategoryStyle(
            item.category
          )}`}
        >
          {capitalizeFirst(item.category)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.source}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatRelativeTime(item.timestamp)}
        </p>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsItem;
