import PropTypes from "prop-types";

const SearchBar = ({ value, onChange, placeholder = "Search assets..." }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pulse-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">🔍</span>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
