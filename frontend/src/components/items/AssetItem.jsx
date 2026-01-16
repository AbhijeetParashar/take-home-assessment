import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

const AssetItem = ({ asset, isGainer }) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{asset.symbol}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{asset.name}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900 dark:text-white">
          {formatCurrency(asset.currentPrice)}
        </p>
        <p
          className={`text-sm font-semibold ${
            isGainer ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatPercentage(asset.changePercent)}
        </p>
      </div>
    </div>
  );
};

AssetItem.propTypes = {
  asset: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    changePercent: PropTypes.number.isRequired,
  }).isRequired,
  isGainer: PropTypes.bool.isRequired,
};

export default AssetItem;
