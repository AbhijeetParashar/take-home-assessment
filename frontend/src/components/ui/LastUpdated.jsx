import { usePollingContext } from "../../contexts/PollingContext";
import { formatDateTime } from "../../utils/dateTime";

const LastUpdated = () => {
  const { lastUpdated } = usePollingContext();

  if (!lastUpdated) {
    return null;
  }

  return (
    <div className="px-2 lg:px-4 py-3 mt-auto">
      <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <svg
            className="w-4 h-4 flex-shrink-0"
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
          <span className="hidden lg:inline font-medium">Last updated:</span>
        </div>
        <span className="hidden lg:block text-center lg:text-left">
          {formatDateTime(lastUpdated)}
        </span>
      </div>
    </div>
  );
};

export default LastUpdated;
