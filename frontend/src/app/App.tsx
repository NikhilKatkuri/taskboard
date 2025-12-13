import { Route, Routes } from "react-router-dom";
import Home from "./pages/Task/Home";
import Landing from "./pages/Landing";
import NewTask from "./pages/Task/NewTask";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import { AuthProvider } from "../context/auth/auth.provider";
import Task from "./pages/Task/Task";

function Routers({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewTask />} />
            <Route path="/tasks/:taskId" element={<Task />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </>
        )}
      </Routes>
    </>
  );
}
function App() {
  const isLogin: boolean = true;
  return (
    <AuthProvider>
      <Routers isLogin={isLogin} />
    </AuthProvider>
  );
}
export default App;
