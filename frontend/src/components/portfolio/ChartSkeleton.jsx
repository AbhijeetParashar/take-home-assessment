const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
    <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border-8 border-gray-300 dark:border-gray-600 animate-pulse"></div>
    </div>
  </div>
);

export default ChartSkeleton;
