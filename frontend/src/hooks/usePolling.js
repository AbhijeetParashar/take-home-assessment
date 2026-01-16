import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Custom hook for polling data at regular intervals
 * @param {Function} fetchFunction - The async function to call for fetching data
 * @param {number} interval - Polling interval in milliseconds (default: 30000ms / 30s)
 * @param {boolean} enabled - Whether polling is enabled (default: true)
 * @returns {Object} - { data, loading, error, refetch, lastUpdated }
 */
export const usePolling = (fetchFunction, interval = 30000, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();

      if (isMountedRef.current) {
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error("Polling error:", err);
        setError(err.message || "Failed to fetch data");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchFunction]);

  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      // Initial fetch
      fetchData();

      // Set up polling interval
      intervalRef.current = setInterval(() => {
        fetchData();
      }, interval);
    }

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, interval, enabled]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdated,
  };
};
