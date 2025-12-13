import Navbar from "@components/Navbar";

const Landing = () => {
  return (
    <div className="p-2 lg:p-4 w-full h-screen flex flex-col bg-orange-50/40">
      <Navbar />
      <main className="w-full h-full   border-2 border-gray-200 rounded-3xl overflow-hidden ">
        <div className="relative w-full h-full bg-white/70 flex flex-col items-center justify-center">
          <div
            className="absolute inset-0 
      before:content-[''] before:absolute before:inset-0 
      before:bg-[repeating-radial-gradient(circle,#e5e5e5_0,#e5e5e5_2px,transparent_2px,transparent_22px)]
      before:bg-size-[22px_22px] before:opacity-70 "
          ></div>

          <div className="z-10 space-y-3 sm:space-y-5 md:space-y-7 lg:space-y-9 ">
            <h1 className="relative  text-xl min-[460px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center max-md:font-bold font-medium ">
              <p className="text-gray-800">Think, plan, and track all</p>
              <p className="xl:mt-3 text-gray-500  ">in one place</p>
            </h1>
            <p className="max-w-[90%] text-sm sm:text-md md:text-lg xl:text-lg text-gray-500 sm:font-medium sm:max-w-md mx-auto text-center">
              Efficiently manage your tasks and boost productivity.
            </p>
            <div className="flex justify-center z-10">
              <button className="px-6 py-2.5 scale-80 sm:scale-90 lg:scale-100 transform  bg-(--theme-color) text-white rounded-lg border-2 border-transparent transition-colors cursor-pointer hover:bg-gray-950">
                Countinue now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
