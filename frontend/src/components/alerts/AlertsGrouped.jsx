import PropTypes from "prop-types";
import SeverityGroup from "./SeverityGroup";

const AlertsGrouped = ({ groupedAlerts }) => {
  const severityOrder = ["critical", "high", "medium", "low"];

  const hasAlerts = severityOrder.some(
    (severity) => groupedAlerts[severity]?.length > 0
  );

  if (!hasAlerts) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No alerts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {severityOrder.map((severity) => (
        <SeverityGroup
          key={severity}
          severity={severity}
          alerts={groupedAlerts[severity] || []}
        />
      ))}
    </div>
  );
};

AlertsGrouped.propTypes = {
  groupedAlerts: PropTypes.shape({
    critical: PropTypes.arrayOf(PropTypes.object),
    high: PropTypes.arrayOf(PropTypes.object),
    medium: PropTypes.arrayOf(PropTypes.object),
    low: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default AlertsGrouped;
