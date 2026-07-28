import { useCallback, useEffect, useMemo, useState } from 'react';
import TaskContext from './task.context';
import {
  FilterOption,
  Priority,
  SortOption,
  Status,
  order,
  task,
} from '../../schemas/task';
import { useAuth } from '../auth';
import apiEndpoints, { PAGINATION, STORAGE_KEYS } from '../../api';
import { save, getValueFor } from '../../api/storage';

const priorities: Priority[] = ['Low', 'Medium', 'High'];
const statuses: Status[] = ['todo', 'in-progress', 'review', 'done'];

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  // UI state
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  // Filter / Sort state
  const [filterOption, setFilterOption] = useState<FilterOption>('none');
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [sortOrder, setSortOrder] = useState<order>('asc');

  // Data state
  const [tasksCache, setTasksCache] = useState<task[]>([]);
  const [selectedTask, setSelectedTask] = useState<task>();

  const maxPerPage = PAGINATION.MAX_PER_PAGE;
  const maxPagesLength = PAGINATION.MAX_PAGES_LENGTH;

  const toggleSearchBox = () => setIsSearchBoxOpen((p) => !p);

  const priorityValue = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 3;
      case 'Medium':
        return 2;
      case 'Low':
        return 1;
      default:
        return 0;
    }
  };

  // Fetch from API
  const fetchTasks = useCallback(async (): Promise<task[]> => {
    if (!token) return [];

    try {
      const { url, ...rest } = apiEndpoints.tasks();

      const response = await fetch(url, {
        ...rest,
        headers: {
          Authorization: `Bearer ${token}`,
          ...rest.headers,
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.tasks ?? [];
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return [];
    }
  }, [token]);

  // Load tasks (API -> SecureStore fallback)
  const loadTasks = useCallback(async () => {
    const serverTasks = await fetchTasks();

    if (serverTasks.length > 0) {
      setTasksCache(serverTasks);

      await save(
        STORAGE_KEYS.TASKS_CACHE,
        JSON.stringify(serverTasks),
      );
      return;
    }

    // Offline fallback
    const cached = await getValueFor(STORAGE_KEYS.TASKS_CACHE);

    if (cached) {
      setTasksCache(JSON.parse(cached));
    }
  }, [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Derived tasks (filter + sort)
  const tasks = useMemo(() => {
    let data = [...tasksCache];

    if (filterOption !== 'none') {
      data = data.filter((t) => t.priority === filterOption);
    }

    if (sortOption === 'dueDate') {
      data.sort((a, b) => {
        const aTime = new Date(a.dueAt).getTime();
        const bTime = new Date(b.dueAt).getTime();
        return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
      });
    }

    if (sortOption === 'priority') {
      data.sort((a, b) => {
        const aPriority = priorityValue(a.priority);
        const bPriority = priorityValue(b.priority);
        return sortOrder === 'asc'
          ? aPriority - bPriority
          : bPriority - aPriority;
      });
    }

    return data;
  }, [tasksCache, filterOption, sortOption, sortOrder]);

  // Pagination
  const pagination = useMemo(
    () => ({
      currPage: 0,
      totalPage: Math.ceil(tasks.length / maxPerPage),
    }),
    [tasks.length, maxPerPage],
  );

  const refreshTasks = async () => {
    await loadTasks();
  };

  const value = {
    tasks,
    selectedTask,
    setSelectedTask,

    priorities,
    statuses,

    filterOption,
    setFilterOption,

    sortOption,
    setSortOption,

    sortOrder,
    setSortOrder,

    isSearchBoxOpen,
    setIsSearchBoxOpen,
    toggleSearchBox,

    pagination,
    maxPerPage,
    maxPagesLength,

    refreshTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;