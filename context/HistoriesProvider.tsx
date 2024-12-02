import React, { createContext, useContext, useState } from "react";

type History = number[];
type HistoriesContextType = {
  allHistories: History[];
  addHistory: (history: History) => void;
};

const HistoriesContext = createContext<HistoriesContextType | undefined>(undefined);

export const HistoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allHistories, setAllHistories] = useState<History[]>([]);

  const addHistory = (history: History) => {
    setAllHistories((prev) => [...prev, history]);
  };

  return (
    <HistoriesContext.Provider value={{ allHistories, addHistory }}>
      {children}
    </HistoriesContext.Provider>
  );
};

// Use the context in components
export const useHistories = () => {
  const context = useContext(HistoriesContext);
  if (!context) {
    throw new Error("useHistories must be used within a HistoriesProvider");
  }
  return context;
};
