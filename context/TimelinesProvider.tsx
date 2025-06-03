import React, { createContext, useContext, useState } from "react";

type Timeline = number[];
type TimelinesContextType = {
  allTimelines: Timeline[];
  addTimeline: (timeline: Timeline) => void;
};

const TimelinesContext = createContext<TimelinesContextType | undefined>(undefined);

export const TimelinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allTimelines, setAllTimelines] = useState<Timeline>([]);

  const addTimeline = (timeline: Timeline) => {
    setAllTimelines((prev) => [...prev, timeline]);
  };

  return (
    <TimelinesContext.Provider value={{ allTimelines, addTimeline }}>
      {children}
    </TimelinesContext.Provider>
  );
};

// Use the context in components
export const useTimelines = () => {
  const context = useContext(TimelinesContext);
  if (!context) {
    throw new Error("useTimelines must be used within a TimelinesProvider");
  }
  return context;
};
