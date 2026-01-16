import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { getChangeColor, getChangeBgColor } from "../../utils/styles";

const PortfolioSummaryCard = ({
  totalValue,
  totalChange,
  totalChangePercent,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Portfolio Summary
      </h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Change</p>
            <p
              className={`text-xl font-semibold ${getChangeColor(
                totalChangePercent
              )}`}
            >
              {formatCurrency(totalChange)}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full ${getChangeBgColor(
              totalChangePercent
            )}`}
          >
            <span
              className={`font-semibold ${getChangeColor(totalChangePercent)}`}
            >
              {formatPercentage(totalChangePercent)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioSummaryCard.propTypes = {
  totalValue: PropTypes.number.isRequired,
  totalChange: PropTypes.number.isRequired,
  totalChangePercent: PropTypes.number.isRequired,
};

export default PortfolioSummaryCard;
