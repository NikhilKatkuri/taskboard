const Login = () => {
  return (
    <>
      <div className="flex h-screen w-screen items-center flex-row lg:p-4 p-2">
        <main className="flex-1 w-full h-full flex flex-col justify-betweenr gap-4">
          <div className="flex mt-3">
            <img src="/logo-1.svg" />
          </div>
          <div className="mx-auto max-w-80  w-full h-64">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 ">Welcome Back</h1>
              <p className="text-gray-600 mb-6">
                Please login to your account to continue.
              </p>
            </div>
            <div className="mt-4">
              <form className="space-y-4">
                <div className="">
                  <input
                    type="text"
                    placeholder="username or email address"
                    className="w-full h-12 rounded-xl border outline-0 px-3 border-gray-400 focus:border-gray-700 transition focus:shadow-sm "
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full h-12 rounded-xl border outline-0 px-3 border-gray-400 focus:border-gray-700 transition focus:shadow-sm "
                  />
                </div>
                <button className="h-12 w-full bg-[var(--theme-color)] rounded-xl text-white font-medium ">
                  login
                </button>
              </form>
            </div>
          </div>
          <div className=""></div>
        </main>
        <aside className="lg:block w-96 bg-black h-full hidden rounded-md"></aside>
      </div>
    </>
  );
};

export default Login;
