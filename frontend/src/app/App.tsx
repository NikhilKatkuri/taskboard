import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Task/Home";
import NewTask from "./pages/Task/NewTask";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Task from "./pages/Task/Task";
import TaskProvider from "@context/task/task.provider";
import { useAuth } from "@context/auth/useAuth";

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

function Routers() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <NewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:taskId"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}
function App() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <TaskProvider>
      <Routers />
    </TaskProvider>
  );
}

export default App;
