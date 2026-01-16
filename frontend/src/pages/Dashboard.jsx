import { useCallback } from "react";
import { getDashboard, getPortfolio } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import PortfolioSummaryCard from "../components/dashboard/PortfolioSummaryCard";
import TopGainersLosers from "../components/dashboard/TopGainersLosers";
import RecentNews from "../components/dashboard/RecentNews";
import ActiveAlerts from "../components/dashboard/ActiveAlerts";
import LoadingCard from "../components/ui/LoadingCard";
import ErrorMessage from "../components/ui/ErrorMessage";

const Dashboard = () => {
  const fetchDashboardData = useCallback(async () => {
    const [dashboardResponse, portfolioResponse] = await Promise.all([
      getDashboard(),
      getPortfolio(),
    ]);
    console.log("Dashboard response:", dashboardResponse);
    console.log("Portfolio response:", portfolioResponse);

    return {
      dashboardData: dashboardResponse.data?.data,
      portfolioData: portfolioResponse.data?.data,
    };
  }, []);

  const { data, loading, error } = usePolling(fetchDashboardData, 30000);

  const dashboardData = data?.dashboardData;
  const portfolioData = data?.portfolioData;

  if (loading) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          Dashboard
        </h1>
        <LoadingCard count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
          Dashboard
        </h1>
        <ErrorMessage message="Failed to load dashboard data. Please try again." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {portfolioData && (
          <PortfolioSummaryCard
            totalValue={portfolioData.totalValue}
            totalChange={portfolioData.totalChange}
            totalChangePercent={portfolioData.totalChangePercent}
          />
        )}

        {dashboardData && (
          <TopGainersLosers
            topGainers={dashboardData.topGainers || []}
            topLosers={dashboardData.topLosers || []}
          />
        )}

        {dashboardData && <RecentNews news={dashboardData.recentNews || []} />}

        {dashboardData && (
          <ActiveAlerts alerts={dashboardData.activeAlerts || []} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
