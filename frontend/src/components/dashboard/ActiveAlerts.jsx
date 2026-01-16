import PropTypes from 'prop-types'
import AlertItem from '../items/AlertItem'

const ActiveAlerts = ({ alerts }) => {

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Active Alerts</h2>
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  )
}

ActiveAlerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      message: PropTypes.string.isRequired,
      severity: PropTypes.oneOf(['critical', 'high', 'medium', 'low']).isRequired,
      timestamp: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ActiveAlerts
