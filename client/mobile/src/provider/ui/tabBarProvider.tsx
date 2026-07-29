import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import CustomTabBar from "../../../assets/imgs/CustomTabBar";
import { SearchControlProvider } from "./searchControl";

type TabBarContextType = {
  activeRoute: string;
  setActiveRoute: (route: string) => void;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeRoute, setActiveRoute] = useState("Home");
  const value = { activeRoute, setActiveRoute };

  return (
    <TabBarContext.Provider value={value}>
      <SearchControlProvider
        routeName={activeRoute === "Search" ? "search" : undefined}
      >
        {children}
        <CustomTabBar
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
        />
      </SearchControlProvider>
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error("useTabBar must be used within a TabBarProvider");
  return ctx;
};
