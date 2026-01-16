import { useEffect, useState, useMemo } from "react";
import { getAlerts } from "../services/api";
import AlertsGrouped from "../components/alerts/AlertsGrouped";
import SearchBar from "../components/assets/SearchBar";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAlerts();
        const alertsData = response.data?.data || [];

        setAlerts(alertsData);
      } catch (err) {
        console.error("Error fetching alerts:", err);
        setError("Failed to load alerts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const filteredAlerts = useMemo(() => {
    if (!searchQuery) return alerts;

    return alerts.filter((alert) =>
      alert.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [alerts, searchQuery]);

  const groupedAlerts = useMemo(() => {
    const grouped = {
      critical: [],
      high: [],
      medium: [],
      low: [],
    };

    filteredAlerts.forEach((alert) => {
      if (grouped[alert.severity]) {
        grouped[alert.severity].push(alert);
      }
    });

    return grouped;
  }, [filteredAlerts]);

  const totalAlerts = useMemo(() => {
    return Object.values(groupedAlerts).reduce(
      (sum, group) => sum + group.length,
      0
    );
  }, [groupedAlerts]);

  if (loading) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          Alerts
        </h1>
        <LoadingCard count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          Alerts
        </h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
        Alerts
      </h1>

      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search alerts by message..."
        />

        <div className="text-sm text-gray-600">
          Showing {totalAlerts} alert{totalAlerts !== 1 ? "s" : ""}
        </div>
      </div>

      <AlertsGrouped groupedAlerts={groupedAlerts} />
    </div>
  );
};

export default Alerts;
