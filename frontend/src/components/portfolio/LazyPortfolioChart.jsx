import { lazy, Suspense } from "react";
import PropTypes from "prop-types";

// Lazy load the PortfolioChart component to reduce initial bundle size
const PortfolioChart = lazy(() => import("./PortfolioChart"));

// Loading skeleton that matches the chart dimensions
const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
    <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center">
      <svg
        className="w-12 h-12 text-gray-300 dark:text-gray-600 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
);

const LazyPortfolioChart = ({ historicalData }) => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <PortfolioChart historicalData={historicalData} />
    </Suspense>
  );
};

LazyPortfolioChart.propTypes = {
  historicalData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LazyPortfolioChart;
