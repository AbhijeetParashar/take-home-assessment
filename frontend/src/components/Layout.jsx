import { Link, useLocation } from "react-router-dom";
import MetaMaskButton from "./MetaMaskButton";
import ThemeToggle from "./ui/ThemeToggle";

const Layout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Assets", path: "/assets", icon: "💰" },
    { name: "News", path: "/news", icon: "📰" },
    { name: "Alerts", path: "/alerts", icon: "🔔" },
    { name: "Portfolio", path: "/portfolio", icon: "💼" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pulse-primary dark:text-pulse-light">Pulse</h1>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                Market Monitoring Engine
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <MetaMaskButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-16 lg:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)] transition-all duration-300">
          <nav className="p-2 lg:p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? "bg-pulse-primary text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      title={item.name}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="hidden lg:inline">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-colors duration-300">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
