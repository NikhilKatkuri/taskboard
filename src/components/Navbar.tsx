import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <>
      <header className="flex items-center max-sm:h-16 py-2 px-3 justify-between">
        <a href="/" className="">
          <img src="/brand/logo.svg" className="w-auto h-5" />
        </a>
        <div className="flex items-center gap-3 max-[460px]:hidden">
          <button
            onClick={() => {
              nav("/login");
            }}
            className="px-6 py-2 rounded-lg border-2 border-transparent transition-colors bg-transparent cursor-pointer hover:bg-black/5"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              nav("/register");
            }}
            className="px-6 py-2 rounded-xl border-2 border-gray-200 transition-colors bg-transparent cursor-pointer hover:bg-(--theme-color) hover:text-white"
          >
            Register
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
