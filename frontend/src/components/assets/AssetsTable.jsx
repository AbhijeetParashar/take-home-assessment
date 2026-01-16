import PropTypes from "prop-types";
import SortableTableHeader from "./SortableTableHeader";
import AssetRow from "./AssetRow";

const AssetsTable = ({ assets, currentSort, onSort, onAssetClick }) => {
  if (assets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No assets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <SortableTableHeader
                label="Asset"
                sortKey="symbol"
                currentSort={currentSort}
                onSort={onSort}
              />
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Type
              </th>
              <SortableTableHeader
                label="Price"
                sortKey="currentPrice"
                currentSort={currentSort}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Change %"
                sortKey="changePercent"
                currentSort={currentSort}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Volume"
                sortKey="volume"
                currentSort={currentSort}
                onSort={onSort}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {assets.map((asset) => (
              <AssetRow
                key={`${asset.symbol}-${asset.type}`}
                asset={asset}
                onClick={onAssetClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
        {assets.map((asset) => (
          <div
            key={`${asset.symbol}-${asset.type}`}
            onClick={() => onAssetClick(asset)}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{asset.symbol}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{asset.name}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {asset.type}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  ${asset.currentPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Change</p>
                <p
                  className={`font-semibold ${
                    asset.changePercent >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {asset.changePercent >= 0 ? "+" : ""}
                  {asset.changePercent.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {asset.volume >= 1e6
                    ? `${(asset.volume / 1e6).toFixed(1)}M`
                    : `${(asset.volume / 1e3).toFixed(1)}K`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AssetsTable.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      currentPrice: PropTypes.number.isRequired,
      changePercent: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentSort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  onAssetClick: PropTypes.func.isRequired,
};

export default AssetsTable;
