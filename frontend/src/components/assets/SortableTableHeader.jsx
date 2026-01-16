import PropTypes from "prop-types";

const SortableTableHeader = ({ label, sortKey, currentSort, onSort }) => {
  const isSorted = currentSort.key === sortKey;
  const isAscending = isSorted && currentSort.direction === "asc";

  const handleClick = () => {
    const newDirection =
      isSorted && currentSort.direction === "asc" ? "desc" : "asc";
    onSort(sortKey, newDirection);
  };

  return (
    <th
      onClick={handleClick}
      className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
        isSorted
          ? "bg-blue-50 dark:bg-blue-900 text-pulse-primary font-bold"
          : "text-gray-700 dark:text-gray-200"
      }`}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <span className={isSorted ? "text-pulse-primary" : "text-gray-400 dark:text-gray-500"}>
          {isSorted ? (isAscending ? "↑" : "↓") : "↕"}
        </span>
      </div>
    </th>
  );
};

SortableTableHeader.propTypes = {
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  currentSort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }).isRequired,
  onSort: PropTypes.func.isRequired,
};

export default SortableTableHeader;
