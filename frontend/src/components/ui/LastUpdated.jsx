import { usePollingContext } from "../../contexts/PollingContext";
import { formatDateTime } from "../../utils/dateTime";
import { useState } from "react";

const LastUpdated = () => {
  const { lastUpdated } = usePollingContext();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!lastUpdated) {
    return null;
  }

  return (
    <div className="px-2 lg:px-3 py-2 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 rounded-lg p-3 lg:p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-center lg:justify-start relative">
            <div
              className="lg:hidden cursor-pointer relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <svg
                className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {showTooltip && (
                <div className="fixed left-20 bottom-4 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-[9999] animate-fade-in">
                  <div className="text-left">
                    <div className="text-blue-600 dark:text-blue-400 text-[10px] uppercase tracking-wide mb-1">
                      Last Refreshed
                    </div>
                    <div className="text-sm text-black dark:text-white">
                      {formatDateTime(lastUpdated)}
                    </div>
                  </div>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px]">
                    <div className="border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
                  </div>
                </div>
              )}
            </div>
            <svg
              className="hidden lg:block w-4 h-4 flex-shrink-0 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden lg:inline text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase">
              Last Refreshed :
            </span>
          </div>
          <div className="hidden lg:block text-center lg:text-left">
            <span className="text-sm font-bold text-black dark:text-white">
              {formatDateTime(lastUpdated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastUpdated;
