import { useAuth } from "../../../context/auth/useAuth";

const Login = () => {
  const { handleForm, credentials, handleChange } = useAuth();

  return (
    <>
      <div className="flex h-screen w-screen items-center flex-row bg-orange-50/40 ">
        <main className="flex-1 w-full h-full flex flex-col justify-between gap-4 lg:p-4 p-2">
          <div className="flex mt-3">
            <img src="/brand/logo.svg" />
          </div>
          <div className="mx-auto max-w-80  w-full h-64">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 ">Welcome Back</h1>
              <p className="text-gray-600 mb-6">
                Please login to your account to continue.
              </p>
            </div>
            <div className="mt-4">
              <form action={handleForm} className="space-y-4">
                <div className="">
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={(e) => {
                      handleChange(e, 0);
                    }}
                    placeholder="email address"
                    className="w-full h-12 rounded-xl border outline-0 px-3 border-gray-400 focus:border-gray-700 transition focus:shadow-sm "
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="w-full ">
                  <label
                    htmlFor="psd"
                    className="w-full flex h-12 rounded-xl border outline-0 px-3 border-gray-400 focus-within:border-gray-700 transition focus-within:shadow-sm "
                  >
                    <input
                      id="psd"
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={(e) => {
                        handleChange(e, 0);
                      }}
                      placeholder="password"
                      className="w-full h-12 outline-0"
                      autoComplete="current-password"
                      required
                    />
                    <button type="button" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5  text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    </button>
                  </label>
                </div>
                <button className="h-12 w-full bg-(--theme-color) rounded-xl text-white font-medium ">
                  login
                </button>
              </form>
              <div className="my-4 text-center">
                <p className="text-sm ">
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-600 hover:underline">
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className=""></div>
        </main>
      </div>
    </>
  );
};

export default Login;
