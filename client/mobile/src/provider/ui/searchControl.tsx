import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getValueFor, save } from "../../api/storage";
import useTask from "../task/useTask";

export type SearchBy = "title" | "description";
export const SearchMapBy: SearchBy[] = ["title", "description"];

type SearchControlContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchBy: SearchBy;
  SetSearchBy: React.Dispatch<React.SetStateAction<SearchBy>>;
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  addToSearchHistory: (query: string) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
};

const SearchControlContext = createContext<
  SearchControlContextType | undefined
>(undefined);

export const SearchControlProvider = ({
  children,
  routeName,
}: {
  children: React.ReactNode;
  routeName?: string;
}) => {


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchBy, SetSearchBy] = useState<SearchBy>("title");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  async function addToSearchHistory(query: string) {
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, 10);
    setSearchHistory(updatedHistory);

    await save("searchHistory", JSON.stringify(updatedHistory));
  }

  async function clearSearchHistory() {
    setSearchHistory([]);
    await save("searchHistory", JSON.stringify([]));
  }

  const { tasks } = useTask();

  async function executeSearch(query: string, by: SearchBy, allTasks: any[]) {
    if (routeName !== "search") {
      return;
    }
    const results = allTasks.filter((task) => {
      if (by === "title") {
        return task.title.toLowerCase().includes(query.toLowerCase());
      } else if (by === "description") {
        return task.description.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
    setSearchResults(results);
  }

  type Debounced<T extends (...args: any[]) => any> = ((
    ...args: Parameters<T>
  ) => void) & {
    cancel: () => void;
  };

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay = 300,
  ): Debounced<T> {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const debounced = ((...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    }) as Debounced<T>;
    debounced.cancel = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    return debounced;
  }

  const debouncedSearch = useMemo(() => debounce(executeSearch, 300), []);

  useEffect(() => {
    debouncedSearch(searchQuery, searchBy, tasks);
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [searchQuery, searchBy, tasks, debouncedSearch]);

  useEffect(() => {
    async function loadSearchHistory() {
      if (routeName !== "search") {
        return;
      }
      const storedHistory = await getValueFor("searchHistory");
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    }
    loadSearchHistory();
  }, [routeName]);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      searchBy,
      SetSearchBy,
      searchHistory,
      setSearchHistory,
      addToSearchHistory,
      clearSearchHistory,
      searchQuery,
      setSearchQuery,
      searchResults,
      setSearchResults,
    }),
    [
      isOpen,
      setIsOpen,
      searchBy,
      SetSearchBy,
      searchHistory,
      setSearchHistory,
      addToSearchHistory,
      clearSearchHistory,
      searchQuery,
      setSearchQuery,
      searchResults,
      setSearchResults,
    ],
  );

  return (
    <SearchControlContext.Provider value={value}>
      {children}
    </SearchControlContext.Provider>
  );
};

export const useSearchControl = () => {
  const ctx = useContext(SearchControlContext);
  if (!ctx)
    throw new Error(
      "useSearchControl must be used within a SearchControlProvider",
    );
  return ctx;
};
