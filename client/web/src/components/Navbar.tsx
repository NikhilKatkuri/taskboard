import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <>
      <header className="flex items-center justify-between px-3 py-2 max-sm:h-16">
        <a href="/" className="">
          <img src="/brand/logo.svg" className="h-5 w-auto" />
        </a>
        <div className="flex items-center gap-3 max-[460px]:hidden">
          <button
            onClick={() => {
              nav("/login");
            }}
            className="cursor-pointer rounded-lg border-2 border-transparent bg-transparent px-6 py-2 transition-colors hover:bg-black/5"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              nav("/register");
            }}
            className="cursor-pointer rounded-xl border-2 border-gray-200 bg-transparent px-6 py-2 transition-colors hover:bg-(--theme-color) hover:text-white"
          >
            Register
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
