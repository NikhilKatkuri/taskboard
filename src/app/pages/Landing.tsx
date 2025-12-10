import { useNavigate } from "react-router-dom";

const Landing = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="h-screen w-screen relative bg-gray-50">
        <header className="h-16 w-screen bg-white/60 z-10 sticky top-0 flex  justify-between items-center px-2 shadow-xs">
          <div className="flex">
            <img src="/logo-1.svg" />
          </div>
          <div className=""></div>
          <div className="flex items-center gap-1 ">
            <button
              onClick={() =>
                setTimeout(() => {
                  nav("/login");
                }, 300)
              }
              className="h-8 rounded-md px-4 text-sm bg-[var(--theme-color)]/10 text-[var(--theme-color)] cursor-pointer transition-all ease-in-out duration-200 active:scale-90"
            >
              Login
            </button>
            <button
              onClick={() =>
                setTimeout(() => {
                  nav("/register");
                }, 300)
              }
              className="h-8 rounded-md px-4 text-sm bg-[var(--theme-color)] text-white cursor-pointer transition-all ease-in-out duration-200  active:scale-90"
            >
              Signup
            </button>
          </div>
        </header>
        <main className=""></main>
      </div>
    </>
  );
};

export default Landing;
