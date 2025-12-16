# TaskBoard - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Component Structure](#component-structure)
4. [Hook Implementation Guide](#hook-implementation-guide)
5. [State Management](#state-management)
6. [Authentication Flow](#authentication-flow)
7. [API Integration](#api-integration)
8. [Routing & Navigation](#routing--navigation)
9. [Type System](#type-system)
10. [Performance Optimization](#performance-optimization)
11. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Full-Stack Architecture

TaskBoard follows a modern React + TypeScript architecture with backend API integration:

```
┌─────────────────────────────────────────────────────────────┐
│                    React Components (TSX)                   │
│          Home │ Task │ NewTask │ Login │ Registration       │
├─────────────────────────────────────────────────────────────┤
│                  Custom Hooks (TypeScript)                  │
│        useAuth │ useTask │ usehandleTask │ useDebounce     │
├─────────────────────────────────────────────────────────────┤
│                   Context Providers                         │
│              AuthProvider │ TaskProvider                    │
├─────────────────────────────────────────────────────────────┤
│                    React Router v6                          │
│         Protected Routes │ Public Routes │ Navigation       │
├─────────────────────────────────────────────────────────────┤
│                   Fetch API (HTTP Client)                   │
│          API_ENDPOINTS from @config/constants               │
├─────────────────────────────────────────────────────────────┤
│                    Backend REST API                         │
│         Express + MongoDB (http://localhost:5000/api)       │
├─────────────────────────────────────────────────────────────┤
│          localStorage (Token & Cache Persistence)           │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component Event Handler
    ↓
Custom Hook (usehandleTask)
    ↓
Fetch API Request to Backend
    ↓
Backend Processes (MongoDB + Express)
    ↓
Response Returned
    ↓
Context State Updated
    ↓
localStorage Cache Updated
    ↓
Component Re-renders with New State
```

---

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Context API + useState
- **HTTP Client**: Native Fetch API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Type Safety**: TypeScript 5.9
- **Backend**: Express.js + MongoDB (separate)

---

## Component Structure

### Authentication Components

#### Registration.tsx

**Location**: [frontend/src/app/pages/auth/Registration.tsx](frontend/src/app/pages/auth/Registration.tsx)

```typescript
// Purpose: User registration form with backend API integration
// File: src/app/pages/auth/Registration.tsx
// State Management:
interface RegistrationFormData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

// Key Features:
//   - Full name, email, password, and confirm password fields
//   - Password visibility toggle (show/hide)
//   - Password match validation
//   - API POST request to backend
//   - Success navigation to home page (auto-login)
//   - Loading state (button disabled during submission)

// Implementation:
const Registration = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // Validates passwords match
    // Calls register(fullName, email, password)
    // Navigates to "/" on success
  };
};
```

#### Login.tsx

**Location**: [frontend/src/app/pages/auth/Login.tsx](frontend/src/app/pages/auth/Login.tsx)

```typescript
// Purpose: User login form with JWT authentication
// File: src/app/pages/auth/Login.tsx
// State Management:
interface LoginFormData {
  email: string;
  password: string;
}

// Key Features:
//   - Email and password fields
//   - Password visibility toggle
//   - API POST request to /api/auth/login
//   - JWT token storage in localStorage
//   - Success navigation to home page
//   - Loading state during authentication

// Implementation:
const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
};
```

#### ProtectedRoute Component

**Location**: [frontend/src/app/App.tsx](frontend/src/app/App.tsx#L9-L19)

```typescript
// Purpose: Route wrapper that protects authenticated routes
// Implementation in App.tsx:
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

#### PublicRoute Component

**Location**: [frontend/src/app/App.tsx](frontend/src/app/App.tsx#L21-L31)

```typescript
// Purpose: Route wrapper that redirects authenticated users from public pages
// Implementation in App.tsx:
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
```

### Task Components

#### Home.tsx (Task List)

**Location**: [frontend/src/app/pages/Task/Home.tsx](frontend/src/app/pages/Task/Home.tsx)

```typescript
// Purpose: Main dashboard displaying all user tasks with filtering, sorting, and pagination
// File: src/app/pages/Task/Home.tsx

// State from useTask() Context:
const {
  viewData, // Function to slice tasks for current page
  Tasks: data, // Filtered and sorted tasks array
  list, // Available options for sort/filter
  setFilterOption, // Set filter by priority
  setSortOption, // Set sort by field
  setSortOrder, // Set sort order (asc/desc)
  refreshTasks, // Refresh tasks from backend
} = useTask();

// Key Features:
//   - TaskCard grid display
//   - Filter by priority (None, Low, Medium, High)
//   - Sort by dueDate or priority (asc/desc order)
//   - Pagination (10 tasks per page)
//   - Empty state with illustration
//   - Create Task button
//   - Navbar with sort/filter menus
//   - Real-time task deletion with refresh

// Empty State:
// Shows illustration and "Create Task" button when no tasks exist

// Navigation:
// - Click TaskCard to navigate to /tasks/:taskId
// - Click Create Task to navigate to /new
```

#### NewTask.tsx (Task Creation Form)

**Location**: [frontend/src/app/pages/Task/NewTask.tsx](frontend/src/app/pages/Task/NewTask.tsx)

```typescript
// Purpose: Create new tasks with full form validation
// File: src/app/pages/Task/NewTask.tsx

// State Management:
interface taskData {
  title: string;
  description: string;
  dueAt: string; // ISO date string
  priority: Priority; // "Low" | "Medium" | "High"
  status: Status; // "todo" | "in-progress" | "review" | "done"
  tags: string[];
}

// Key Features:
//   - Title input field (required)
//   - Description textarea
//   - Priority dropdown (Low, Medium, High)
//   - Status dropdown (todo, in-progress, review, done)
//   - Due date picker (default: 7 days from now)
//   - Tags array (optional)
//   - Clear form button
//   - Submit button with loading state
//   - Split-screen layout (form + illustration)

// Default Values:
// - Priority: Medium (priorities[1])
// - Status: todo (statuses[0])
// - Due Date: 7 days from current date

// API Integration:
// Calls taskHandler.createTask(taskData)
// Navigates to "/" on success
```

#### Task.tsx (Task Detail & Edit)

**Location**: [frontend/src/app/pages/Task/Task.tsx](frontend/src/app/pages/Task/Task.tsx)

```typescript
// Purpose: View and edit individual task details
// Route: /tasks/:taskId
// File: src/app/pages/Task/Task.tsx

// URL Parameters:
const params = useParams(); // { taskId: string }

// State Management:
const {
  Task: data, // Current task object
  setTask: setData, // Update current task
  priorities, // ["Low", "Medium", "High"]
  statuses, // ["todo", "in-progress", "review", "done"]
  caches, // All cached tasks
} = useTask();

// Key Features:
//   - View full task details
//   - Edit mode toggle
//   - Navigation between tasks (prev/next)
//   - Priority and status dropdowns
//   - Due date modification
//   - Save changes to backend
//   - Delete task with confirmation
//   - Auto-navigate to home if task not found
//   - Loading state with SkeletonLoader

// Navigation Functions:
// - canGoBack(): Check if previous task exists
// - canGoNext(): Check if next task exists
// - goPrev(): Navigate to previous task
// - goNext(): Navigate to next task
```

#### TaskCard.tsx (Reusable Component)

**Location**: [frontend/src/app/components/reusable/TaskCard.tsx](frontend/src/app/components/reusable/TaskCard.tsx)

```typescript
// Purpose: Display individual task as a card
// Props:
interface TaskCardProps {
  task: task;
  onDelete?: (taskId: string) => void;
}

// Key Features:
//   - Priority badge with color coding
//   - Status badge with color coding
//   - Due date display (formatted)
//   - Task title and description preview
//   - Click to navigate to task detail
//   - Delete button with confirmation dialog
//   - Responsive design

// Priority Colors:
// - High: red-100/red-700/red-300
// - Medium: yellow-100/yellow-700/yellow-300
// - Low: green-100/green-700/green-300

// Status Colors:
// - todo: gray-200/gray-700
// - in-progress: blue-200/blue-700
// - review: purple-200/purple-700
// - done: green-200/green-700
```

### Common Components

#### Navbar.task.tsx

**Location**: [frontend/src/app/components/reusable/Navbar.task.tsx](frontend/src/app/components/reusable/Navbar.task.tsx)

```typescript
// Purpose: Navigation bar for authenticated task pages
// Features:
//   - Logo/brand image
//   - Sort menu toggle
//   - Filter menu toggle
//   - Create Task button
//   - Logout button
//   - User profile display
```

#### Navbar.tsx

**Location**: [frontend/src/app/components/Navbar.tsx](frontend/src/app/components/Navbar.tsx)

```typescript
// Purpose: Public navigation for auth pages
// Features:
//   - Logo/brand image
//   - Sign in button → navigates to /login
//   - Register button → navigates to /register
```

#### SkeletonLoader.tsx

**Location**: [frontend/src/app/components/reusable/SkeletonLoader.tsx](frontend/src/app/components/reusable/SkeletonLoader.tsx)

```typescript
// Purpose: Loading placeholder for task detail page
// Usage: Displayed while task data is being fetched
```

#### ConfirmDialog.tsx

**Location**: [frontend/src/app/components/reusable/ConfirmDialog.tsx](frontend/src/app/components/reusable/ConfirmDialog.tsx)

```typescript
// Purpose: Modal dialog for confirming destructive actions
// Usage: Task deletion confirmation
```

---

## Hook Implementation Guide

### useAuth() - Authentication Hook

**Location**: `frontend/src/context/auth/useAuth.ts`

```typescript
// File: src/context/auth/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Returns AuthContextType:
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getToken: () => string | null;
  clearError: () => void;
}

// Usage:
const { user, isAuthenticated, login, logout, token } = useAuth();
```

### useTask() - Task Management Hook

**Location**: `frontend/src/context/task/useTask.ts`

```typescript
// File: src/context/task/useTask.ts
import { useContext } from "react";
import TaskContext from "./task.context";

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within TaskProvider");
  return context;
};

// Returns TaskContextType with:
interface TaskContextType {
  Tasks: task[]; // Filtered and sorted tasks
  setTasks: (tasks: task[]) => void;
  panigation: Panigation; // { currPage: number, totalPage: number }
  viewData: (data: task[]) => task[]; // Returns tasks for current page
  maxPerPage: number; // 10 tasks per page
  Task: task | undefined; // Currently selected task
  setTask: (task: task | undefined) => void;
  priorities: Priority[]; // ["Low", "Medium", "High"]
  statuses: Status[]; // ["todo", "in-progress", "review", "done"]
  list: List; // Available sort/filter options
  filterOption: FilterOption;
  setFilterOption: (opt: FilterOption) => void;
  sortOption: SortOption;
  setSortOption: (opt: SortOption) => void;
  sortOrder: order; // "asc" | "desc"
  setSortOrder: (order: order) => void;
  caches: task[]; // All tasks from backend
  refreshTasks: () => Promise<void>; // Refetch from backend
}

// Usage:
const { Tasks, priorities, setFilterOption, refreshTasks } = useTask();
```

### usehandleTask() - API Operations Hook

**Location**: `frontend/src/hooks/usehandleTask.ts`

```typescript
// File: src/hooks/usehandleTask.ts
// Purpose: Handles all task CRUD operations with backend API

export const usehandleTask = (token: string) => {
  const createTask = async (data: taskData): Promise<TaskHandlerResponse> => {
    const res = await fetch(API_ENDPOINTS.TASKS.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  const updateTask = async (
    data: taskData,
    id: string
  ): Promise<TaskHandlerResponse | undefined> => {
    if (!id) return undefined;
    const res = await fetch(API_ENDPOINTS.TASKS.UPDATE(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  const deleteTask = async (
    id: string
  ): Promise<TaskHandlerResponse | undefined> => {
    if (!id) return undefined;
    const res = await fetch(API_ENDPOINTS.TASKS.DELETE(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await res.json();
    return { ok: res.ok, status: res.status };
  };

  return { createTask, updateTask, deleteTask };
};

// Usage:
const { token } = useAuth();
const taskHandler = token ? usehandleTask(token) : null;
await taskHandler?.createTask(taskData);
```

### useDebounce() - Debounced Values

**Location**: `frontend/src/hooks/useDebounce.ts`

```typescript
// File: src/hooks/useDebounce.ts
import { useEffect, useState } from \"react\";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// Usage:
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

// Use debouncedSearch for API calls or filtering
useEffect(() => {
  if (debouncedSearch) {
    // Perform filtered search
  }
}, [debouncedSearch]);
```

### useDropDown() - Dropdown State Management

**Location**: `frontend/src/hooks/useDropDown.ts`

```typescript
// File: src/hooks/useDropDown.ts
// Purpose: Manages dropdown state for Priority and Status selectors

// Returns tuple: [state, actions]
// state: { label: T, value: T }
// actions: { setLabel, setValue, isOpen, toggle, etc. }

// Usage in NewTask.tsx:
const [priority, priorityActions] = useDropDown<Priority>(priorities[1]);
const [status, statusActions] = useDropDown<Status>(statuses[0]);

// Access current values:
priority.label; // Current priority display value
priority.value; // Current priority actual value
priorityActions.setLabel(newPriority); // Update priority display
priorityActions.setValue(newPriority); // Update priority value
```

### useShow() - Toggle State Hook

**Location**: `frontend/src/hooks/useShow.ts`

```typescript
// File: src/hooks/useShow.ts
// Purpose: Simple boolean toggle state management

// Returns: { show: boolean, toggle: () => void, setShow: (value: boolean) => void, hide: () => void }

// Usage:
const sortView = useShow();
sortView.toggle(); // Toggle visibility
sortView.show; // Current state (boolean)
sortView.hide(); // Set to false
```

---

## State Management

### AuthContext & AuthProvider

**Location**: `frontend/src/context/auth/auth.provider.tsx`

```typescript
// File: src/context/auth/auth.provider.tsx
// Purpose: Manages authentication state with backend API integration

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (savedToken && savedUser) {
        // Verify token with backend
        const response = await fetch(API_ENDPOINTS.AUTH.ME, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setAuthState({
            user: data.user,
            token: savedToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          // Token expired/invalid
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          setAuthState({ ...initialState, isLoading: false });
        }
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: \"POST\",
        headers: { \"Content-Type\": \"application/json\" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || \"Login failed\";
        setAuthState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
        return { success: false, error: errorMessage };
      }

      // Store token and user
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

      setAuthState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || \"Network error\";
      setAuthState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Register function
  const register = useCallback(async (fullName: string, email: string, password: string) => {
    // Similar to login, makes POST request to API_ENDPOINTS.AUTH.REGISTER
    // Auto-logins after successful registration
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TASKS_CACHE);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, getToken, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### TaskContext & TaskProvider

**Location**: `frontend/src/context/task/task.provider.tsx`

```typescript
// File: src/context/task/task.provider.tsx
// Purpose: Manages task state with filtering, sorting, and pagination

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const priorities: Priority[] = ["Low", "Medium", "High"];
  const statuses: Status[] = ["todo", "in-progress", "review", "done"];
  const { token } = useAuth();

  // State
  const [Tasks, setTasks] = useState<task[]>([]);
  const [caches, setCaches] = useState<task[]>([]);
  const [Task, setTask] = useState<task | undefined>(undefined);
  const [filterOption, setFilterOption] = useState<FilterOption>("none");
  const [sortOption, setSortOption] = useState<SortOption>("none");
  const [sortOrder, setSortOrder] = useState<order>("asc");
  const [panigation, setPanigation] = useState<Panigation>({
    currPage: 0,
    totalPage: 0,
  });

  // Fetch tasks from backend
  const getTasks = useCallback(async () => {
    if (!token) return;
    const response = await fetch(API_ENDPOINTS.TASKS.BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      return data.tasks as task[];
    }
  }, [token]);

  // Initial fetch on mount
  useEffect(() => {
    async function fetchAndSetTasks() {
      const tasksFromServer = await getTasks();
      const tasks = tasksFromServer || [];
      setCaches([...tasks].map((taskItem, index) => ({ ...taskItem, index })));
      localStorage.setItem(STORAGE_KEYS.TASKS_CACHE, JSON.stringify(tasks));
      setTasks(tasks);
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(tasks.length / maxPerPage),
      });
    }
    fetchAndSetTasks();
  }, [getTasks, maxPerPage]);

  // Combined filter and sort effect
  useEffect(() => {
    function processData() {
      let processedTasks: task[] = [...caches];

      // Apply filter
      if (filterOption !== \"none\") {
        processedTasks = processedTasks.filter((task) => task.priority === filterOption);
      }

      // Apply sort
      if (sortOption !== \"none\") {
        processedTasks.sort((a, b) => {
          if (sortOption === \"dueDate\") {
            const aD = new Date(a.dueAt).getTime();
            const bD = new Date(b.dueAt).getTime();
            return sortOrder === \"asc\" ? aD - bD : bD - aD;
          } else if (sortOption === \"priority\") {
            const aP = getPriorityValue(a.priority);
            const bP = getPriorityValue(b.priority);
            return sortOrder === \"asc\" ? aP - bP : bP - aP;
          }
          return 0;
        });
      }

      setTasks(processedTasks);
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(processedTasks.length / maxPerPage),
      });
    }
    if (caches.length > 0) {
      processData();
    }
  }, [caches, filterOption, sortOption, sortOrder, maxPerPage]);

  const refreshTasks = async () => {
    const tasksFromServer = await getTasks();
    const tasks = tasksFromServer || [];
    setCaches([...tasks].map((taskItem, index) => ({ ...taskItem, index })));
    localStorage.setItem(STORAGE_KEYS.TASKS_CACHE, JSON.stringify(tasks));
    setTasks(tasks);
    setPanigation({
      currPage: 0,
      totalPage: Math.ceil(tasks.length / maxPerPage),
    });
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
```

---

## Authentication Flow

### Registration Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. User visits /register                                │
│    PublicRoute redirects if already authenticated       │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Registration.tsx component renders form              │
│    - Full Name field                                    │
│    - Email field                                        │
│    - Password field (with show/hide toggle)             │
│    - Confirm Password field                             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. User fills form and clicks "Register"                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Client-side validation                               │
│    - All fields required                                │
│    - Passwords must match                               │
└─────────────────────────────────────────────────────────┘
                           ↓
                      Validation OK?
                    ↙              ↘
                YES                 NO
                ↓                   ↓
    ┌──────────────────────────────┐  ┌──────────────────┐
    │ 5. POST /api/auth/register   │  │ Show error alert │
    │    Body: {                   │  └──────────────────┘
    │      fullName,               │
    │      email,                  │
    │      password                │
    │    }                         │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 6. Backend processes request │
    │    - Validates input         │
    │    - Hashes password         │
    │    - Creates user in MongoDB │
    │    - Generates JWT token     │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 7. Response received         │
    │    {                         │
    │      token: "jwt...",        │
    │      user: { id, email, ... }│
    │    }                         │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 8. Store token and user      │
    │    localStorage.setItem(     │
    │      STORAGE_KEYS.TOKEN      │
    │      STORAGE_KEYS.USER       │
    │    )                         │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 9. Update AuthContext state  │
    │    - isAuthenticated: true   │
    │    - user: { id, email, ... }│
    │    - token: "jwt..."         │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 10. Navigate to "/" (Home)   │
    │     Auto-logged in           │
    └──────────────────────────────┘
```

### Login Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. User visits /login                                   │
│    PublicRoute redirects if already authenticated       │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Login.tsx component renders form                     │
│    - Email field                                        │
│    - Password field (with show/hide toggle)             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. User enters credentials and submits                  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 4. POST /api/auth/login                                 │
│    Body: { email, password }                            │
│    Headers: { "Content-Type": "application/json" }      │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Backend validates credentials                        │
│    - Finds user in MongoDB by email                     │
│    - Compares password with bcrypt                      │
│    - Generates JWT token if valid                       │
└─────────────────────────────────────────────────────────┘
                           ↓
                    Valid credentials?
                    ↙              ↘
                  YES               NO
                  ↓                 ↓
    ┌────────────────────┐  ┌──────────────────────┐
    │ 6. Response 200 OK │  │ Response 401/400     │
    │    {               │  │ { message: "error" } │
    │      token: "...", │  └──────────────────────┘
    │      user: {...}   │            ↓
    │    }               │    ┌──────────────────┐
    └────────────────────┘    │ Show error alert │
              ↓               └──────────────────┘
    ┌──────────────────────────────┐
    │ 7. Store in localStorage     │
    │    Key: "token"              │
    │    Key: "user"               │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 8. Update AuthContext state  │
    │    setAuthState({            │
    │      user,                   │
    │      token,                  │
    │      isAuthenticated: true,  │
    │      isLoading: false        │
    │    })                        │
    └──────────────────────────────┘
              ↓
    ┌──────────────────────────────┐
    │ 9. Navigate to "/" (Home)    │
    └──────────────────────────────┘
```

### Token Verification Flow (On App Mount)

```
┌─────────────────────────────────────────────────┐
│ App.tsx renders → AuthProvider initializes      │
└─────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────┐
│ Check localStorage for saved token & user       │
└─────────────────────────────────────────────────┘
                           ↓
                    Token exists?
                    ↙          ↘
                  YES           NO
                  ↓             ↓
    ┌─────────────────────┐  ┌──────────────────┐
    │ GET /api/auth/me    │  │ isLoading: false │
    │ Headers: {          │  │ unauthenticated  │
    │   Authorization:    │  └──────────────────┘
    │   "Bearer <token>"  │
    │ }                   │
    └─────────────────────┘
              ↓
        Token valid?
        ↙          ↘
      YES           NO
      ↓             ↓
┌────────────┐  ┌──────────────────────┐
│ Set user & │  │ Clear localStorage   │
│ auth state │  │ Set unauthenticated  │
└────────────┘  └──────────────────────┘
```

---

## API Integration

### API Endpoints Configuration

**Location**: `frontend/src/config/constants.ts`

```typescript
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
```

### HTTP Request Pattern

All API requests follow this pattern:

```typescript
// Authentication Header
const response = await fetch(API_ENDPOINTS.TASKS.BASE, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // for POST/PUT
  },
});

// Handle Response
const data = await response.json();
if (!response.ok) {
  // Handle error
  const errorMessage = data.message || "Request failed";
  // Show error to user
}
// Use data
```

---

## Routing & Navigation

### Route Configuration

**Location**: `frontend/src/app/App.tsx`

```typescript
function Routers() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/new" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
      <Route path="/tasks/:taskId" element={<ProtectedRoute><Task /></ProtectedRoute>} />

      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Registration /></PublicRoute>} />
    </Routes>
  );
}
```

### Navigation Patterns

```typescript
// Programmatic navigation
const navigate = useNavigate();
navigate("/");              // Go to home
navigate("/login");         // Go to login
navigate("/tasks/123");     // Go to specific task

// URL parameters
const { taskId } = useParams<{ taskId: string }>();

// Navigation from components
<button onClick={() => nav("/new")}>Create Task</button>
```

---

## Type System

### Core Type Definitions

**Priority Types** (`frontend/src/schemas/task/priority.ts`):

```typescript
export type Priority = "Low" | "Medium" | "High";
```

**Status Types** (`frontend/src/schemas/task/status.ts`):

```typescript
export type Status = "todo" | "in-progress" | "review" | "done";
```

**Task Types** (`frontend/src/schemas/task/Task.ts`):

```typescript
export interface taskData {
  title: string;
  description: string;
  dueAt: string; // ISO date string
  priority: Priority;
  status: Status;
  tags: string[];
}

export interface task extends taskData {
  _id: string; // MongoDB ObjectId
  assignee: string; // User ID
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  index?: number; // For UI ordering
}

export type SortOption = "none" | "dueDate" | "priority";
export type FilterOption = "none" | Priority;
export type order = "asc" | "desc";
```

**User Types** (`frontend/src/context/auth/auth.context.ts`):

```typescript
export interface User {
  id: string;
  fullName: string;
  email: string;
}
```

---

## Error Handling

### Client-Side Validation

**Login & Registration Forms**:

```typescript
// Basic validation in form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Check required fields
  if (!formData.email || !formData.password) return;

  // Check password match (Registration only)
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // HTML5 validation handles:
  // - Email format (type="email" with required)
  // - Non-empty fields (required attribute)
};
```

### API Error Handling

**Pattern used throughout the app**:

```typescript
// In AuthProvider
try {
  const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.message || "Login failed";
    setAuthState((prev) => ({
      ...prev,
      isLoading: false,
      error: errorMessage,
    }));
    return { success: false, error: errorMessage };
  }

  // Success path...
  return { success: true, data };
} catch (error: unknown) {
  const errorMessage = (error as Error).message || "Network error";
  setAuthState((prev) => ({
    ...prev,
    isLoading: false,
    error: errorMessage,
  }));
  return { success: false, error: errorMessage };
}
```

### Error Display Patterns

```typescript
// Alert-based (used in current implementation)
if (result.success) {
  navigate("/");
} else {
  // Error is stored in AuthContext but can also show alert
  alert(result.error);
}

// Context-based error state
const { error } = useAuth();
{error && <div className="error-message">{error}</div>}
```

---

## Performance Optimization

### Filter and Sort Processing

The TaskProvider uses React hooks to efficiently process task filtering and sorting:

```typescript
// Combined filter and sort effect in TaskProvider
useEffect(() => {
  function processData() {
    let processedTasks: task[] = [...caches];

    // Apply priority filter
    if (filterOption !== "none") {
      processedTasks = processedTasks.filter(
        (task) => task.priority === filterOption
      );
    }

    // Apply sorting
    if (sortOption !== "none") {
      processedTasks.sort((a, b) => {
        if (sortOption === "dueDate") {
          const aD = new Date(a.dueAt).getTime();
          const bD = new Date(b.dueAt).getTime();
          return sortOrder === "asc" ? aD - bD : bD - aD;
        } else if (sortOption === "priority") {
          const aP = getPriorityValue(a.priority);
          const bP = getPriorityValue(b.priority);
          return sortOrder === "asc" ? aP - bP : bP - aP;
        }
        return 0;
      });
    }

    setTasks(processedTasks);
    setPanigation({
      currPage: 0,
      totalPage: Math.ceil(processedTasks.length / maxPerPage),
    });
  }

  if (caches.length > 0) {
    processData();
  }
}, [caches, filterOption, sortOption, sortOrder, maxPerPage]);
```

### Pagination Implementation

```typescript
// Pagination configuration
const maxPerPage = 10;  // PAGINATION.MAX_PER_PAGE from constants
const MaxPagesLength = 5;  // PAGINATION.MAX_PAGES_LENGTH

// Slice tasks for current page
const viewData = (data: task[]): task[] => {
  return data.slice(
    panigation.currPage * maxPerPage,
    panigation.currPage * maxPerPage + maxPerPage
  );
};

// Usage in Home component
{viewData(data).map((taskItem) => (
  <TaskCard key={taskItem._id} task={taskItem} onDelete={handleTaskDelete} />
))}
```

### localStorage Caching

Tasks are cached in localStorage to provide offline access and reduce API calls:

```typescript
// Cache tasks after fetching from backend
localStorage.setItem(STORAGE_KEYS.TASKS_CACHE, JSON.stringify(tasks));

// Tasks are automatically refreshed:
// 1. On component mount (TaskProvider useEffect)
// 2. After task creation/update/deletion (refreshTasks())
// 3. When user navigates back to Home page
```

### Debounced Search

The useDebounce hook prevents excessive re-renders during search:

```typescript
// Implementation
const debouncedSearch = useDebounce(searchTerm, 500);

// Only triggers filtering after 500ms of no input changes
useEffect(() => {
  if (debouncedSearch) {
    // Perform search/filter
  }
}, [debouncedSearch]);
```

---

## Troubleshooting

### Common Issues & Solutions

| Issue                                  | Cause                          | Solution                                      |
| -------------------------------------- | ------------------------------ | --------------------------------------------- |
| Token expired errors                   | JWT token no longer valid      | Implement token refresh or re-login prompt    |
| Tasks not updating                     | Cache not refreshing           | Call `refreshTasks()` after operations        |
| Authentication loop                    | Token validation failing       | Check backend /api/auth/me endpoint           |
| Network errors                         | Backend not running            | Ensure backend server is running on port 5000 |
| CORS errors                            | Backend CORS not configured    | Configure CORS in backend server.ts           |
| Route not protected                    | Missing ProtectedRoute wrapper | Wrap route with `<ProtectedRoute>` component  |
| Public route accessible when logged in | Missing PublicRoute wrapper    | Wrap with `<PublicRoute>` component           |
| Tasks showing wrong filter             | Filter state not updating      | Check filterOption state in TaskProvider      |

### Debugging Tips

```typescript
// Check authentication state
const { user, token, isAuthenticated, isLoading } = useAuth();
console.log({ user, token, isAuthenticated, isLoading });

// Verify localStorage
console.log("Token:", localStorage.getItem(STORAGE_KEYS.TOKEN));
console.log("User:", localStorage.getItem(STORAGE_KEYS.USER));
console.log("Tasks Cache:", localStorage.getItem(STORAGE_KEYS.TASKS_CACHE));

// Monitor task context
const { Tasks, caches, filterOption, sortOption } = useTask();
console.log({ Tasks, caches, filterOption, sortOption });

// Check API responses
const response = await fetch(API_ENDPOINTS.TASKS.BASE, {
  headers: { Authorization: `Bearer ${token}` },
});
console.log("Response status:", response.status);
console.log("Response data:", await response.json());
```

### Development Setup

1. **Backend Server**: Must be running on `http://localhost:5000`
2. **Environment Variables**: Check API_BASE_URL in constants.ts
3. **MongoDB**: Backend requires MongoDB connection
4. **CORS**: Backend must allow requests from frontend origin

### API Integration Checklist

- [ ] Backend server running on correct port
- [ ] MongoDB connection established
- [ ] JWT_SECRET configured in backend
- [ ] CORS headers properly set
- [ ] Token included in Authorization header
- [ ] API endpoints match frontend constants

---

## Project Structure Overview

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component with routing
│   │   ├── main.tsx                   # App entry point
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx          # Login page
│   │   │   │   └── Registration.tsx   # Registration page
│   │   │   └── Task/
│   │   │       ├── Home.tsx           # Task list dashboard
│   │   │       ├── NewTask.tsx        # Create task form
│   │   │       └── Task.tsx           # Task detail/edit page
│   │   └── styles/
│   │       ├── font.css               # Custom fonts
│   │       └── index.css              # Global styles (Tailwind)
│   ├── components/
│   │   ├── Navbar.tsx                 # Public navigation bar
│   │   └── reusable/
│   │       ├── ConfirmDialog.tsx      # Confirmation modal
│   │       ├── Input.tsx              # Form input component
│   │       ├── Navbar.task.tsx        # Authenticated navigation
│   │       ├── Panigation.tsx         # Pagination component
│   │       ├── SearchBox.tsx          # Search input
│   │       ├── Select.tsx             # Dropdown select
│   │       ├── SkeletonLoader.tsx     # Loading placeholder
│   │       ├── SortList.tsx           # Sort/filter menu
│   │       ├── TaskBox.tsx            # Task container
│   │       └── TaskCard.tsx           # Task card display
│   ├── config/
│   │   └── constants.ts               # API endpoints and constants
│   ├── context/
│   │   ├── auth/
│   │   │   ├── auth.context.ts        # Auth context definition
│   │   │   ├── auth.provider.tsx      # Auth state provider
│   │   │   └── useAuth.ts             # Auth hook
│   │   └── task/
│   │       ├── task.context.ts        # Task context definition
│   │       ├── task.provider.tsx      # Task state provider
│   │       └── useTask.ts             # Task hook
│   ├── hooks/
│   │   ├── useDebounce.ts             # Debounced value hook
│   │   ├── useDropDown.ts             # Dropdown state hook
│   │   ├── usehandleTask.ts           # Task API operations
│   │   ├── usePopMenu.ts              # Popup menu hook
│   │   └── useShow.ts                 # Toggle visibility hook
│   ├── schemas/
│   │   ├── auth.context.ts            # Auth type definitions
│   │   ├── index.ts                   # Schema exports
│   │   └── task/
│   │       ├── context.ts             # Task context types
│   │       ├── index.ts               # Task exports
│   │       ├── priority.ts            # Priority type
│   │       ├── status.ts              # Status type
│   │       └── Task.ts                # Task interface
│   └── utils/
│       └── index.ts                   # Utility functions
├── public/
│   ├── brand/                         # Logo assets
│   ├── fonts/                         # Font files
│   └── imgs/                          # Images and illustrations
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite config
└── DOCUMENTATION.md                   # This file
```

---

## Key Features Summary

### Authentication

- ✅ JWT-based authentication with backend
- ✅ Token stored in localStorage
- ✅ Auto-login with token verification
- ✅ Protected and public routes
- ✅ Password visibility toggle
- ✅ Auto-login after registration

### Task Management

- ✅ Create, Read, Update, Delete tasks
- ✅ Priority levels (Low, Medium, High)
- ✅ Status tracking (todo, in-progress, review, done)
- ✅ Due date management
- ✅ Task tags support

### Filtering & Sorting

- ✅ Filter by priority
- ✅ Sort by due date or priority
- ✅ Ascending/descending order
- ✅ Real-time updates

### Pagination

- ✅ 10 tasks per page
- ✅ Page navigation
- ✅ Total page count

### UI/UX

- ✅ Responsive design (Tailwind CSS)
- ✅ Loading states
- ✅ Confirmation dialogs
- ✅ Empty states with illustrations
- ✅ Skeleton loaders
- ✅ Color-coded priorities and statuses

### Data Management

- ✅ Backend API integration
- ✅ localStorage caching
- ✅ Token-based auth headers
- ✅ Error handling and display

---

## Development Workflow

### Starting the App

```bash
# Terminal 1: Start backend
cd backend
npm install
npm run dev    # Runs on http://localhost:5000

# Terminal 2: Start frontend
cd frontend
npm install
npm run dev    # Runs on http://localhost:5173
```

### Building for Production

```bash
cd frontend
npm run build   # Creates dist/ folder
npm run preview # Preview production build
```

### Code Style

- TypeScript for type safety
- Functional components with hooks
- TSX for component files
- Path aliases (@config, @context, @components, etc.)
- Tailwind CSS for styling
- camelCase for variables and functions
- PascalCase for components and types

---

## Future Enhancements

### Recommended Improvements

1. **Form Validation**
   - Add comprehensive client-side validation
   - Show inline error messages
   - Implement Zod or Yup schema validation

2. **Error Handling**
   - Replace alerts with toast notifications
   - Add error boundary components
   - Implement retry logic for failed requests

3. **Performance**
   - Implement React.memo for TaskCard
   - Add virtual scrolling for large task lists
   - Lazy load routes with React.lazy

4. **Features**
   - Task search functionality
   - Task sharing/collaboration
   - Task attachments
   - Task comments
   - Subtasks
   - Task categories/projects

5. **UX Improvements**
   - Dark mode support
   - Keyboard shortcuts
   - Drag and drop for task reordering
   - Bulk actions (multi-select delete)
   - Task templates

6. **Testing**
   - Add unit tests (Vitest)
   - Component tests (React Testing Library)
   - E2E tests (Playwright/Cypress)

7. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

8. **Security**
   - Token refresh mechanism
   - CSRF protection
   - Rate limiting
   - Input sanitization

---

**Document Version**: 1.0  
**Last Updated**: December 16, 2025
