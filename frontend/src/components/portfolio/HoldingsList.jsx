import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { getChangeColor } from "../../utils/styles";

const HoldingsList = ({ holdings }) => {
  if (holdings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No holdings in portfolio.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Holdings</h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Avg Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Gain/Loss
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Return %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {holdings.map((holding) => {
              const changeColor = getChangeColor(holding.returnPercent);
              return (
                <tr key={holding.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{holding.symbol}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{holding.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {holding.shares}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {formatCurrency(holding.avgCost)}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {formatCurrency(holding.currentValue)}
                  </td>
                  <td className={`px-6 py-4 font-semibold ${changeColor}`}>
                    {formatCurrency(holding.gainLoss)}
                  </td>
                  <td className={`px-6 py-4 font-bold ${changeColor}`}>
                    {formatPercentage(holding.returnPercent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {holdings.map((holding) => {
          const changeColor = getChangeColor(holding.returnPercent);
          return (
            <div key={holding.symbol} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{holding.symbol}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{holding.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(holding.currentValue)}
                  </p>
                  <p className={`text-sm font-semibold ${changeColor}`}>
                    {formatPercentage(holding.returnPercent)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Shares</p>
                  <p className="text-gray-900 dark:text-white">{holding.shares}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg Cost</p>
                  <p className="text-gray-900 dark:text-white">{formatCurrency(holding.avgCost)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                  <p className="text-gray-900 dark:text-white">
                    {formatCurrency(holding.currentPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Gain/Loss</p>
                  <p className={`font-semibold ${changeColor}`}>
                    {formatCurrency(holding.gainLoss)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

HoldingsList.propTypes = {
  holdings: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      shares: PropTypes.number.isRequired,
      avgCost: PropTypes.number.isRequired,
      currentPrice: PropTypes.number.isRequired,
      currentValue: PropTypes.number.isRequired,
      gainLoss: PropTypes.number.isRequired,
      returnPercent: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HoldingsList;
