# Taskboard Frontend

A modern React-based frontend application for task management.

## Architecture Overview

### Hooks

Custom React hooks are used to encapsulate reusable logic:

- **useAuth**: Manages authentication state and user sessions
- **useTasks**: Handles task CRUD operations and state management
- **useForm**: Provides form state management and validation
- **useDebounce**: Optimizes performance by debouncing user inputs

### Context

React Context API provides global state management:

- **AuthContext**: Stores user authentication state and methods
- **TaskContext**: Manages task data across components

### Process Flow

1. User authentication via login/register
2. Fetch and display tasks from backend API
3. Real-time task updates (create, edit, delete)
4. Error handling and user feedback

### State Management

- **Local State**: Component-specific state using `useState`
- **Global State**: Shared state via Context API
- **Server State**: API data cached and synchronized
- **Form State**: Controlled inputs with validation

### UI Rendering

- Component-based architecture with React
- Conditional rendering based on state
- Optimized re-renders using `useCallback`
- Responsive design with Tailwind CSS

### Routing

React Router handles navigation:

- `/` - Task list
- `/login` - Authentication page
- `/Register` - Authentication page
- `/new` - Create new task
- `/tasks/:id` - Individual task details

## Technologies

- **React** - UI library
- **React Router** - Client-side routing
- **Fetch** - HTTP client for API calls
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
