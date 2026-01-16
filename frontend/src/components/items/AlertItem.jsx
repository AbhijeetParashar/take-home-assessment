import PropTypes from "prop-types";
import { formatRelativeTime } from "../../utils/dateTime";
import { getSeverityStyle } from "../../utils/styles";
import { capitalizeFirst } from "../../utils/formatters";

const AlertItem = ({ alert }) => {
  const style = getSeverityStyle(alert.severity);

  return (
    <div
      className="border-l-4 pl-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r"
      style={{ borderColor: style.border }}
    >
      <div className="flex justify-between items-start mb-1">
        <p className="text-sm text-gray-900 dark:text-white flex-1">{alert.message}</p>
        <span
          className={`ml-2 px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${style.badge}`}
        >
          {capitalizeFirst(alert.severity)}
        </span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {formatRelativeTime(alert.timestamp)}
      </p>
    </div>
  );
};

AlertItem.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(["critical", "high", "medium", "low"]).isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlertItem;
