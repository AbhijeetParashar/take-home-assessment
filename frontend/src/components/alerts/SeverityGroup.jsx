import PropTypes from "prop-types";
import { capitalizeFirst } from "../../utils/formatters";
import { getSeverityStyle } from "../../utils/styles";
import AlertItem from "../items/AlertItem";

const SeverityGroup = ({ severity, alerts }) => {
  const style = getSeverityStyle(severity);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div
        className={`px-6 py-4 border-l-4 ${style.badge}`}
        style={{ borderLeftColor: style.border }}
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>{capitalizeFirst(severity)}</span>
          <span className="text-sm font-normal text-gray-600 dark:text-gray-300">
            ({alerts.length})
          </span>
        </h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4">
            <AlertItem alert={alert} />
          </div>
        ))}
      </div>
    </div>
  );
};

SeverityGroup.propTypes = {
  severity: PropTypes.oneOf(["critical", "high", "medium", "low"]).isRequired,
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      message: PropTypes.string.isRequired,
      severity: PropTypes.oneOf(["critical", "high", "medium", "low"])
        .isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SeverityGroup;
