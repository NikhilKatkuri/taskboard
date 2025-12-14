export const API_BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  TASKS: {
    BASE: `${API_BASE_URL}/tasks`,
    CREATE: `${API_BASE_URL}/tasks/create`,
    UPDATE: (id: string) => `${API_BASE_URL}/tasks/update/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/tasks/delete/${id}`,
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  TASKS_CACHE: "taskboard_tasks_cache",
} as const;

export const PAGINATION = {
  MAX_PER_PAGE: 10,
  MAX_PAGES_LENGTH: 5,
} as const;
