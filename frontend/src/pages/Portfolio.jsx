import { useEffect, useState } from "react";
import { getPortfolio } from "../services/api";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import PortfolioChart from "../components/portfolio/PortfolioChart";
import AllocationChart from "../components/portfolio/AllocationChart";
import PerformanceMetrics from "../components/portfolio/PerformanceMetrics";
import HoldingsList from "../components/portfolio/HoldingsList";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPortfolio();
        const data = response.data?.data || {};
        const transformedData = {
          totalValue: data.totalValue,
          totalChange: data.totalChange,
          totalChangePercent: data.totalChangePercent,
          holdings: (data.assets || []).map((asset) => ({
            symbol: asset.assetId,
            name: asset.assetId,
            shares: asset.quantity,
            avgCost: asset.avgBuyPrice,
            currentPrice: asset.currentPrice,
            currentValue: asset.value,
            gainLoss: asset.change,
            returnPercent: asset.changePercent,
          })),
          historicalData: generateHistoricalData(
            data.totalValue,
            data.totalChange
          ),
        };

        setPortfolioData(transformedData);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Helper function to generate historical data
  const generateHistoricalData = (currentValue, totalChange) => {
    const data = [];
    const days = 30;
    const startValue = currentValue - totalChange;

    for (let i = 0; i < days; i++) {
      const progress = i / (days - 1);
      const value = startValue + totalChange * progress;
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        value: Math.round(value * 100) / 100,
      });
    }

    return data;
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
        <LoadingCard count={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  const {
    totalValue,
    totalChange,
    totalChangePercent,
    holdings = [],
    historicalData = [],
  } = portfolioData;

  return (
    <div>
      <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
        Portfolio
      </h1>

      <div className="space-y-6">
        {/* Portfolio Overview */}
        <PortfolioSummary
          portfolio={{ totalValue, totalChange, totalChangePercent }}
        />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {historicalData.length > 0 && (
            <PortfolioChart historicalData={historicalData} />
          )}
          {holdings.length > 0 && <AllocationChart holdings={holdings} />}
        </div>

        {/* Performance Metrics */}
        {holdings.length > 0 && <PerformanceMetrics holdings={holdings} />}

        {/* Holdings List */}
        <HoldingsList holdings={holdings} />
      </div>
    </div>
  );
};

export default Portfolio;
