import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

const PerformanceMetrics = ({ holdings }) => {
  const performanceData = holdings
    .map((holding) => ({
      name: holding.symbol,
      gainLoss: holding.gainLoss,
    }))
    .sort((a, b) => b.gainLoss - a.gainLoss)
    .slice(0, 10);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {payload[0].payload.name}
          </p>
          <p
            className={`text-lg font-bold ${
              payload[0].value >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Top Performers (Gain/Loss)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="gainLoss"
            fill="#3b82f6"
            name="Gain/Loss"
            radius={[4, 4, 0, 0]}
            barSize={70}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

PerformanceMetrics.propTypes = {
  holdings: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      gainLoss: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PerformanceMetrics;
