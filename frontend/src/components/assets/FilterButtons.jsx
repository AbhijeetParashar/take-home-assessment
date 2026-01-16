import PropTypes from "prop-types";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Stocks", value: "stocks" },
    { label: "Crypto", value: "crypto" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter.value
              ? "bg-pulse-primary text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

FilterButtons.propTypes = {
  activeFilter: PropTypes.oneOf(["all", "stocks", "crypto"]).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterButtons;
