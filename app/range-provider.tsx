"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the context value
interface DateRangeContextType {
  dateRange: string;
  toggleDateRange: () => void;
}

// Create context with a default value (will be overridden by the provider)
const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

// Provider Component
export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<string>("wide");

  const toggleDateRange = () => {
    setDateRange((prevRange) => (prevRange === "daily" ? "wide" : "daily"));
  };

  return (
    <DateRangeContext.Provider value={{ dateRange, toggleDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};

// Custom hook to use DateRangeContext safely
export const useDateRange = (): DateRangeContextType => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
