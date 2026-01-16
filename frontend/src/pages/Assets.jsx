import { useEffect, useState, useMemo } from "react";
import { getStocks, getCrypto } from "../services/api";
import SearchBar from "../components/assets/SearchBar";
import FilterButtons from "../components/assets/FilterButtons";
import AssetsTable from "../components/assets/AssetsTable";
import AssetDetailsModal from "../components/assets/AssetDetailsModal";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const Assets = () => {
  const [stocks, setStocks] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "asc",
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const [stocksResponse, cryptoResponse] = await Promise.all([
          getStocks(),
          getCrypto(),
        ]);

        const stocksData = stocksResponse.data || [];
        const cryptoData = cryptoResponse.data || [];
        const stocksWithType = stocksData.map((stock) => ({
          ...stock,
          type: "Stock",
        }));

        const cryptoWithType = cryptoData.map((coin) => ({
          ...coin,
          type: "Crypto",
        }));

        setStocks(stocksWithType);
        setCrypto(cryptoWithType);
      } catch (err) {
        console.error("Error fetching assets:", err);
        setError("Failed to load assets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const filteredAndSortedAssets = useMemo(() => {
    let allAssets = [];

    if (activeFilter === "all") {
      allAssets = [...stocks, ...crypto];
    } else if (activeFilter === "stocks") {
      allAssets = [...stocks];
    } else if (activeFilter === "crypto") {
      allAssets = [...crypto];
    }

    const filtered = allAssets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [stocks, crypto, activeFilter, searchQuery, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Assets</h1>
        <LoadingCard count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Assets</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
        Assets
      </h1>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by symbol or name..."
            />
          </div>
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedAssets.length} asset
          {filteredAndSortedAssets.length !== 1 ? "s" : ""}
        </div>
      </div>

      <AssetsTable
        assets={filteredAndSortedAssets}
        currentSort={sortConfig}
        onSort={handleSort}
        onAssetClick={handleAssetClick}
      />

      {selectedAsset && (
        <AssetDetailsModal asset={selectedAsset} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Assets;
