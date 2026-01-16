import PropTypes from "prop-types";
import AssetItem from "../items/AssetItem";

const TopGainersLosers = ({ topGainers, topLosers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Top Gainers & Losers
      </h2>

      {/* Top Gainers */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-green-600 mb-2">Top Gainers</h3>
        <div className="space-y-2">
          {topGainers.slice(0, 3).map((asset) => (
            <AssetItem key={asset.symbol} asset={asset} isGainer={true} />
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div>
        <h3 className="text-sm font-medium text-red-600 mb-2">Top Losers</h3>
        <div className="space-y-2">
          {topLosers.slice(0, 3).map((asset) => (
            <AssetItem key={asset.symbol} asset={asset} isGainer={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

TopGainersLosers.propTypes = {
  topGainers: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      currentPrice: PropTypes.number.isRequired,
      changePercent: PropTypes.number.isRequired,
    })
  ).isRequired,
  topLosers: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      currentPrice: PropTypes.number.isRequired,
      changePercent: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TopGainersLosers;
