import { createContext, useContext, useState } from "react";

const PollingContext = createContext();

export const PollingProvider = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(null);

  return (
    <PollingContext.Provider value={{ lastUpdated, setLastUpdated }}>
      {children}
    </PollingContext.Provider>
  );
};

export const usePollingContext = () => {
  const context = useContext(PollingContext);
  if (!context) {
    throw new Error("usePollingContext must be used within PollingProvider");
  }
  return context;
};
