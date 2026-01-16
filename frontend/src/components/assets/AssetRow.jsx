import PropTypes from "prop-types";
import { formatCurrency, formatPercentage, formatNumber } from "../../utils/formatters";
import { getChangeColor } from "../../utils/styles";

const AssetRow = ({ asset, onClick }) => {
  const changeColor = getChangeColor(asset.changePercent);

  return (
    <tr
      onClick={() => onClick(asset)}
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{asset.symbol}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{asset.name}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
          {asset.type}
        </span>
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
        {formatCurrency(asset.currentPrice)}
      </td>
      <td className={`px-4 py-3 font-semibold ${changeColor}`}>
        {formatPercentage(asset.changePercent)}
      </td>
      <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
        {formatNumber(asset.volume)}
      </td>
    </tr>
  );
};

AssetRow.propTypes = {
  asset: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    changePercent: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AssetRow;
