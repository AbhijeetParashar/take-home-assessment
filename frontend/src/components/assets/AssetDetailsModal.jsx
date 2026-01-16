import PropTypes from "prop-types";
import { formatCurrency, formatPercentage, formatNumber } from "../../utils/formatters";
import { getChangeColor } from "../../utils/styles";

const AssetDetailsModal = ({ asset, onClose }) => {
  if (!asset) return null;

  const changeColor = getChangeColor(asset.changePercent);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{asset.symbol}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{asset.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Price Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(asset.currentPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Change</p>
                  <p className={`text-lg font-semibold ${changeColor}`}>
                    {formatPercentage(asset.changePercent)}
                  </p>
                </div>
              </div>
            </div>

            {/* Trading Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Trading Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                  <span className="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                    {asset.type}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {formatNumber(asset.volume)}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(asset.marketCap || asset.high24h || asset.low24h) && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Market Data</h3>
                  <div className="space-y-2">
                    {asset.marketCap && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Market Cap</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(asset.marketCap)}
                        </span>
                      </div>
                    )}
                    {asset.high24h && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">24h High</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(asset.high24h)}
                        </span>
                      </div>
                    )}
                    {asset.low24h && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">24h Low</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(asset.low24h)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-pulse-primary text-white rounded-lg hover:bg-pulse-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

AssetDetailsModal.propTypes = {
  asset: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    changePercent: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    marketCap: PropTypes.number,
    high24h: PropTypes.number,
    low24h: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default AssetDetailsModal;
