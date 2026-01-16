import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { getChangeColor, getChangeBgColor } from "../../utils/styles";

const PortfolioSummary = ({ portfolio }) => {
  const changeColor = getChangeColor(portfolio.totalChangePercent);
  const changeBgColor = getChangeBgColor(portfolio.totalChangePercent);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Portfolio Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Value</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(portfolio.totalValue)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Change</p>
          <p className={`text-2xl font-semibold ${changeColor}`}>
            {formatCurrency(portfolio.totalChange)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Change Percentage</p>
          <div className={`inline-block px-4 py-2 rounded-lg ${changeBgColor}`}>
            <p className={`text-2xl font-bold ${changeColor}`}>
              {formatPercentage(portfolio.totalChangePercent)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioSummary.propTypes = {
  portfolio: PropTypes.shape({
    totalValue: PropTypes.number.isRequired,
    totalChange: PropTypes.number.isRequired,
    totalChangePercent: PropTypes.number.isRequired,
  }).isRequired,
};

export default PortfolioSummary;
