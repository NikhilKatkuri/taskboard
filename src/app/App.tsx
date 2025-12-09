import { Route, Routes } from "react-router-dom";
import Home from "./pages/Task/Home";
import Landing from "./pages/Landing";
import NewTask from "./pages/Task/NewTask";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

function Routers({ isLogin }: { isLogin: boolean }) {
  return (
    <>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewTask />} />
            <Route
              path="/tasks/:id"
              Component={() => (
                <>
                  <div>id</div>
                </>
              )}
            />
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
  const isLogin: boolean = false;
  return <Routers isLogin={isLogin} />;
}
export default App;
