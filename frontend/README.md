# Taskboard Frontend

> A modern React application for task management with TypeScript, React Router, and MongoDB backend integration.

## 📋 Project Overview

Taskboard Frontend is a full-featured task management application built with React 19, TypeScript, and Vite. It provides complete authentication flows, task CRUD operations, filtering, searching, sorting, and pagination capabilities with a clean, responsive UI powered by Tailwind CSS 4.

### Key Features

- **User Authentication**: JWT-based registration and login with backend integration
- **Task Management**: Create, read, update, and delete tasks with full CRUD operations
- **Advanced Filtering**: Filter by status (Todo, In Progress, Review, Done) and priority (Low, Medium, High)
- **Search & Sort**: Search by title/description and sort by due date or priority
- **Pagination**: Efficient pagination with configurable items per page
- **Protected Routes**: Authentication-based route protection with automatic redirects
- **Responsive Design**: Mobile-friendly design built with Tailwind CSS 4
- **State Management**: React Context API for auth and task state
- **Custom Hooks**: Reusable hooks for debouncing, dropdowns, and task operations
- **Type Safety**: Full TypeScript coverage with comprehensive schemas

---

## 🛠️ Tech Stack

| Layer                  | Technology                               |
| ---------------------- | ---------------------------------------- |
| **Frontend Framework** | React 19 (Functional Components & Hooks) |
| **Language**           | TypeScript 5.9                           |
| **Build Tool**         | Vite 7.2                                 |
| **Routing**            | React Router DOM 7.10                    |
| **Styling**            | Tailwind CSS 4.1                         |
| **State Management**   | React Context API                        |
| **HTTP Client**        | Native Fetch API                         |
| **Code Quality**       | ESLint + Prettier                        |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9+) or yarn (v1.22+)
- Backend server running on port 5000

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/NikhilKatkuri/taskboard.git
   cd taskboard/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoint**

   The frontend is configured to connect to `http://localhost:5000/api` by default. You can modify this in:
   - `src/config/constants.ts`

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component with routing
│   │   ├── main.tsx                   # Entry point
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx          # Login page
│   │   │   │   └── Registration.tsx   # Registration page
│   │   │   └── Task/
│   │   │       ├── Home.tsx           # Task list page
│   │   │       ├── NewTask.tsx        # Create task page
│   │   │       └── Task.tsx           # Task detail/edit page
│   │   └── styles/
│   │       ├── font.css               # Font definitions
│   │       └── index.css              # Global styles
│   ├── components/
│   │   ├── Navbar.tsx                 # Main navigation
│   │   └── reusable/
│   │       ├── ConfirmDialog.tsx      # Confirmation dialog
│   │       ├── Input.tsx              # Form input component
│   │       ├── Navbar.task.tsx        # Task page navbar
│   │       ├── Panigation.tsx         # Pagination component
│   │       ├── SearchBox.tsx          # Search input
│   │       ├── Select.tsx             # Select dropdown
│   │       ├── SkeletonLoader.tsx     # Loading skeleton
│   │       ├── SortList.tsx           # Sort dropdown
│   │       ├── TaskBox.tsx            # Task detail box
│   │       └── TaskCard.tsx           # Task list card
│   ├── context/
│   │   ├── auth/
│   │   │   ├── auth.context.ts        # Auth context definition
│   │   │   ├── auth.provider.tsx      # Auth provider
│   │   │   └── useAuth.ts             # Auth hook
│   │   └── task/
│   │       ├── task.context.ts        # Task context definition
│   │       ├── task.provider.tsx      # Task provider
│   │       └── useTask.ts             # Task hook
│   ├── hooks/
│   │   ├── useDebounce.ts             # Debounce hook
│   │   ├── useDropDown.ts             # Dropdown hook
│   │   ├── usehandleTask.ts           # Task operations hook
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
│   │       └── Task.ts                # Task type
│   ├── config/
│   │   └── constants.ts               # API endpoints and constants
│   ├── utils/
│   │   └── index.ts                   # Utility functions
│   └── assets/
│       └── mockTask.ts                # Mock data
├── public/
│   ├── brand/                         # Brand assets
│   ├── fonts/                         # Custom fonts
│   └── imgs/                          # Images
├── index.html
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript config
├── eslint.config.js                   # ESLint config
└── package.json
```

---

## 🔐 Authentication & Security

### Registration Flow

1. User fills out form: Full Name, Email, Password
2. **Validation Rules**:
   - Full Name: Minimum 6 characters
   - Email: Must be valid email format
   - Password: Minimum 6 characters
3. Data sent to backend API: `POST /api/auth/register`
4. Password is hashed on the backend using bcryptjs
5. User record is saved to MongoDB
6. User is redirected to login page on success

### Login Flow

1. User enters email and password
2. Credentials sent to backend API: `POST /api/auth/login`
3. On success:
   - JWT token is received from backend
   - Token is stored in localStorage
   - User data is stored in auth context
   - User is redirected to home page
4. On failure: Error message displayed

### Protected Routes

Routes are protected using a `ProtectedRoute` component:

- Checks authentication status from context
- Redirects to `/login` if not authenticated
- Shows loading state during auth check

### Public Routes

Public routes (login, register) redirect to home if already authenticated using `PublicRoute` component.

---

## 📋 Routes & Components

### Public Routes

| Route       | Component    | Purpose                |
| ----------- | ------------ | ---------------------- |
| `/register` | Registration | User registration form |
| `/login`    | Login        | User login form        |

### Protected Routes (Authentication Required)

| Route            | Component | Purpose                       |
| ---------------- | --------- | ----------------------------- |
| `/`              | Home      | Task list with filters/search |
| `/new`           | NewTask   | Create a new task             |
| `/tasks/:taskId` | Task      | View or edit a specific task  |

---

## 🎯 Core Features & Implementation

### 1. Task Management

#### Create Task

- Route: `/new`
- Component: `NewTask.tsx`
- Form fields: Title, Description, Priority (Low/Medium/High), Status (Todo/In Progress/Review/Done), Due Date, Tags
- Validation: Title required (max 100 chars), description max 500 chars, due date required
- API: `POST /api/tasks/create`
- Behavior: Creates task and redirects to home page

#### Read Tasks

- Route: `/`
- Component: `Home.tsx`
- Shows all tasks for logged-in user from MongoDB
- Displays: Title, description, priority, due date, status, tags
- Pagination: Configurable items per page (default: 10)
- Skeleton loading during data fetch

#### Update Task

- Route: `/tasks/:taskId`
- Component: `Task.tsx`
- Prefills form with existing task data
- Validates before saving
- API: `PUT /api/tasks/update/:id`
- Updates in MongoDB and refreshes context state

#### Delete Task

- Component: `TaskCard.tsx` with confirmation dialog
- API: `DELETE /api/tasks/delete/:id`
- Shows confirmation dialog before deletion
- Removes task from MongoDB and updates UI

### 2. Search & Filter

**Filter by Status**: Todo, In Progress, Review, Done

- Component: `Select.tsx` for status selection
- Filters tasks client-side after fetching from API
- Context-based state management

**Filter by Priority**: Low, Medium, High

- Component: `Select.tsx` for priority selection
- Filters tasks client-side
- Visual priority indicators on task cards

**Search by Title/Description** (Debounced)

- Component: `SearchBox.tsx`
- Uses `useDebounce` hook (default 300ms delay)
- Searches across title and description fields
- Real-time filtering without API calls

### 3. Sorting

- **By Due Date**: Ascending/descending
- **By Priority**: High → Medium → Low or reverse
- Component: `SortList.tsx`
- Combines with filters for flexible task views

---

## 🎣 Custom Hooks

### useAuth()

Provides authentication state and methods from auth context.

```typescript
const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
```

**Properties**:

- `user`: Current user object or null
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state during auth checks

**Methods**:

- `login(email, password)`: Authenticates user, stores JWT token
- `register(fullName, email, password)`: Creates new user account
- `logout()`: Clears token and user state

### useTask()

Manages task state and operations from task context.

```typescript
const { tasks, isLoading, fetchTasks, createTask, updateTask, deleteTask } =
  useTask();
```

**Properties**:

- `tasks`: Array of user's tasks
- `isLoading`: Loading state during operations

**Methods**:

- `fetchTasks()`: Fetches all tasks for current user
- `createTask(taskData)`: Creates new task
- `updateTask(id, taskData)`: Updates existing task
- `deleteTask(id)`: Deletes task

### useDebounce(value, delay)

Debounces a value to optimize search and filtering.

```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

### useDropDown()

Manages dropdown open/close state with outside click detection.

```typescript
const { isOpen, toggleDropdown, dropdownRef } = useDropDown();
```

### usehandleTask()

Provides task operation handlers with loading states.

```typescript
const { handleCreateTask, handleUpdateTask, handleDeleteTask, isLoading } =
  usehandleTask();
```

### usePopMenu()

Manages popup menu state and positioning.

```typescript
const { isOpen, position, openPopMenu, closePopMenu } = usePopMenu();
```

### useShow()

Simple toggle hook for visibility states.

```typescript
const { show, toggle, setShow } = useShow(initialState);
```

---

## 🧩 Reusable Components

### UI Components

- **ConfirmDialog**: Modal confirmation dialog
- **Input**: Styled input with label and error handling
- **Select**: Dropdown select component
- **SearchBox**: Search input with icon
- **SortList**: Sorting dropdown menu
- **SkeletonLoader**: Loading placeholder
- **TaskCard**: Task list item card
- **TaskBox**: Detailed task view
- **Navbar**: Main navigation bar
- **Navbar.task**: Task page navigation

---

## 📡 API Integration

### Configuration

API endpoints are defined in `src/config/constants.ts`:

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
};
```

### Authentication Headers

JWT token is automatically included in task API requests via auth context.

---

## 🎨 Styling

### Tailwind CSS 4

- Utility-first CSS framework
- Custom theme configuration
- Responsive design utilities
- Dark mode support ready

### Custom Fonts

Located in `public/fonts/` and imported via `font.css`

---

## 📦 Available Scripts

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

---

## 🗂️ Type Definitions

### Task Schema

```typescript
interface ITask {
  _id: string;
  title: string; // Max 100 characters
  description?: string; // Max 500 characters
  priority: "Low" | "Medium" | "High";
  status: "todo" | "in-progress" | "review" | "done";
  dueAt: Date;
  tags: string[];
  owner: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}
```

### User Schema

```typescript
interface IUser {
  _id: string;
  fullName: string; // Min 6 characters
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Auth Context

```typescript
interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}
```

### Task Context

```typescript
interface TaskContextType {
  tasks: ITask[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<ITask>) => Promise<void>;
  updateTask: (id: string, task: Partial<ITask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
```

---

## 🚀 Data Persistence

### Backend Persistence (MongoDB)

All data is persisted in MongoDB via the backend API:

- **Users**: Stored in `users` collection with hashed passwords
- **Tasks**: Stored in `tasks` collection with owner reference
- **Authentication**: JWT tokens stored in localStorage on the client

### LocalStorage Usage

```typescript
// JWT Token storage
localStorage.setItem("token", jwtToken);
const token = localStorage.getItem("token");

// User data cache
localStorage.setItem("user", JSON.stringify(user));
```

### Data Flow

1. User actions trigger API calls
2. Backend validates and processes requests
3. MongoDB stores/retrieves data
4. Response updates React context state
5. UI re-renders with updated data

---

## ✅ Validation Rules

### Registration Validation (Backend)

- **Full Name**: Required, minimum 6 characters
- **Email**: Must be valid email format, unique
- **Password**: Minimum 6 characters, hashed with bcryptjs

### Login Validation (Backend)

- **Email**: Must be valid email format
- **Password**: Required, compared with hashed password

### Task Validation (Backend)

- **Title**: Required, max 100 characters
- **Description**: Optional, max 500 characters
- **Priority**: Must be 'Low', 'Medium', or 'High'
- **Status**: Must be 'todo', 'in-progress', 'review', or 'done'
- **Due Date**: Required, must be a valid date
- **Tags**: Optional array of strings

---

## 📱 Responsive Design

### Tailwind CSS Breakpoints

Built with mobile-first approach using Tailwind CSS:

```typescript
// Mobile: default
// Tablet: sm: (640px+)
// Desktop: md: (768px+), lg: (1024px+)
```

### Responsive Features

- Collapsible navigation on mobile
- Stacked task cards on mobile, grid on desktop
- Touch-friendly buttons and controls
- Optimized font sizes for different screens

---

## 🔄 State Management Architecture

### AuthContext (Global Auth State)

```typescript
interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}
```

**Provider**: `AuthProvider` in `main.tsx`
**Consumer**: Via `useAuth()` hook

### TaskContext (Global Task State)

```typescript
interface TaskContextType {
  tasks: ITask[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<ITask>) => Promise<void>;
  updateTask: (id: string, task: Partial<ITask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
```

**Provider**: `TaskProvider` in `App.tsx`
**Consumer**: Via `useTask()` hook

### Component State

Local state managed with `useState` for:

- Form inputs
- UI toggles (dropdowns, modals)
- Pagination state
- Search/filter state

---

## 🌐 Environment Configuration

### Development Setup

API base URL is configured in `src/config/constants.ts`:

```typescript
export const API_BASE_URL = "http://localhost:5000/api";
```

For production, update this to your deployed backend URL.

### Building for Production

```bash
npm run build
```

Output directory: `dist/`

Deploy the `dist/` folder to any static hosting service (Netlify, Vercel, etc.)

---

```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## 📚 Development Best Practices

### Component Guidelines

1. **Functional Components Only**: Use React 19 Hooks, no class components
2. **TypeScript**: Full type safety with interfaces and types
3. **Single Responsibility**: One component, one purpose
4. **Reusable Components**: Extract common UI patterns into reusable components

### Code Organization

- Keep components focused and small (< 300 lines)
- Extract business logic into custom hooks
- Use utility functions for repeated logic
- Organize by feature (auth, task, etc.)

### Naming Conventions

```typescript
// Components (PascalCase)
TaskCard.tsx;
TaskList.tsx;
Login.tsx;

// Custom Hooks (camelCase with 'use' prefix)
useAuth.ts;
useTask.ts;
useDebounce.ts;

// Utils (camelCase)
index.ts;
constants.ts;

// Styles (kebab-case)
index.css;
font.css;
```

### TypeScript Best Practices

- Define interfaces for all props and data structures
- Use type inference where possible
- Avoid `any` type
- Use const assertions for constants
- Export types from schema files

---

## 🚧 Future Enhancements

- [ ] Task comments and attachments
- [ ] Recurring tasks
- [ ] Team collaboration features
- [ ] Dark mode theme toggle
- [ ] Export tasks to CSV/PDF
- [ ] Calendar view for tasks
- [ ] Task dependencies and subtasks
- [ ] Email notifications
- [ ] Mobile app using React Native
- [ ] Real-time sync with WebSockets
- [ ] Drag and drop task reordering
- [ ] Advanced analytics dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with proper TypeScript types
4. Run linting: `npm run lint`
5. Format code: `npm run format`
6. Commit changes: `git commit -m 'Add feature'`
7. Push to branch: `git push origin feature/your-feature`
8. Open a pull request

---

## 📄 License

This project is licensed under the ISC License. See LICENSE file for details.

---

## 📞 Support & Questions

For issues, questions, or suggestions:

- Open an issue on [GitHub](https://github.com/NikhilKatkuri/taskboard/issues)
- Check existing issues for solutions

---

## 🙏 Acknowledgments

- React 19 team for the latest features
- Vite for lightning-fast development
- Tailwind CSS for utility-first styling
- TypeScript for type safety

---

**Last Updated**: December 16, 2025

Made with ❤️ by [Nikhil Katkuri](https://github.com/NikhilKatkuri)
