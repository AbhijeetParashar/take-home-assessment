import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PollingProvider } from "./contexts/PollingContext";
import Layout from "./components/Layout";
import LoadingCard from "./components/ui/LoadingCard";

// Lazy load all page components for better initial load performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Assets = lazy(() => import("./pages/Assets"));
const News = lazy(() => import("./pages/News"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Portfolio = lazy(() => import("./pages/Portfolio"));

// Loading fallback component
const PageLoader = () => (
  <div className="p-4">
    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
    <LoadingCard count={2} />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <PollingProvider>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/news" element={<News />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/portfolio" element={<Portfolio />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </PollingProvider>
    </ThemeProvider>
  );
}

export default App;
