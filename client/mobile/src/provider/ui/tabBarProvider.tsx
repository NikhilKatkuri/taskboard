import React, { createContext, useContext, useState, useMemo } from "react";
import CustomTabBar from "../../components/ui/CustomTabBar";

type TabBarContextType = {
  activeRoute: string;
  setActiveRoute: (route: string) => void;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeRoute, setActiveRoute] = useState("Home");

  const value = useMemo(() => ({ activeRoute, setActiveRoute }), [activeRoute]);

  return (
    <TabBarContext.Provider value={value}>
      {children}
      <CustomTabBar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error("useTabBar must be used within a TabBarProvider");
  return ctx;
};
