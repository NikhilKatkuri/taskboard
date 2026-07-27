import { getValueFor } from "./storage";

function load(API_BASE_URL: string) {
  return {
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
  };
}

type ApiConfig = ReturnType<typeof load>;

class ApiEndpoints {
  private apiConfig: ApiConfig;
  private headers = { "Content-Type": "application/json" };
  constructor(API_BASE_URL: string) {
    this.apiConfig = load(API_BASE_URL);
  }

  login() {
    return {
      url: this.apiConfig.AUTH.LOGIN,
      method: "POST",
      headers: this.headers,
    };
  }

  register() {
    return {
      url: this.apiConfig.AUTH.REGISTER,
      method: "POST",
      headers: this.headers,
    };
  }

  me() {
    return {
      url: this.apiConfig.AUTH.ME,
      method: "GET",
      headers: this.headers,
    };
  }
}

const apiEndpoints = new ApiEndpoints(process.env.EXPO_PUBLIC_BASE_URL!);

export default apiEndpoints;

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  TASKS_CACHE: "taskboard_tasks_cache",
} as const;

export const PAGINATION = {
  MAX_PER_PAGE: 10,
  MAX_PAGES_LENGTH: 5,
} as const;
