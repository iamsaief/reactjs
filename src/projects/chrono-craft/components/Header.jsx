import { memo, useContext } from "react";
import { AgeContext } from "../context/AgeProvider";

const SunIconComponent = () => (
  <svg
    className="w-6 h-6"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M124,40V16a4,4,0,0,1,8,0V40a4,4,0,0,1-8,0Zm64,88a60,60,0,1,1-60-60A60.07,60.07,0,0,1,188,128Zm-8,0a52,52,0,1,0-52,52A52.06,52.06,0,0,0,180,128ZM61.17,66.83a4,4,0,0,0,5.66-5.66l-16-16a4,4,0,0,0-5.66,5.66Zm0,122.34-16,16a4,4,0,0,0,5.66,5.66l16-16a4,4,0,0,0-5.66-5.66ZM192,68a4,4,0,0,0,2.83-1.17l16-16a4,4,0,1,0-5.66-5.66l-16,16A4,4,0,0,0,192,68Zm2.83,121.17a4,4,0,0,0-5.66,5.66l16,16a4,4,0,0,0,5.66-5.66ZM40,124H16a4,4,0,0,0,0,8H40a4,4,0,0,0,0-8Zm88,88a4,4,0,0,0-4,4v24a4,4,0,0,0,8,0V216A4,4,0,0,0,128,212Zm112-88H216a4,4,0,0,0,0,8h24a4,4,0,0,0,0-8Z"></path>
  </svg>
);

const MoonIconComponent = () => (
  <svg
    className="w-6 h-6"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M238,96a6,6,0,0,1-6,6H214v18a6,6,0,0,1-12,0V102H184a6,6,0,0,1,0-12h18V72a6,6,0,0,1,12,0V90h18A6,6,0,0,1,238,96ZM144,54h10V64a6,6,0,0,0,12,0V54h10a6,6,0,0,0,0-12H166V32a6,6,0,0,0-12,0V42H144a6,6,0,0,0,0,12Zm71.25,100.28a6,6,0,0,1,1.07,6A94,94,0,1,1,95.76,39.68a6,6,0,0,1,7.94,6.79A90.11,90.11,0,0,0,192,154a90.9,90.9,0,0,0,17.53-1.7A6,6,0,0,1,215.25,154.28Zm-14.37,11.34q-4.42.38-8.88.38A102.12,102.12,0,0,1,90,64q0-4.45.38-8.88a82,82,0,1,0,110.5,110.5Z"></path>
  </svg>
);

const Header = () => {
  const context = useContext(AgeContext);

  if (!context) {
    return null;
  }

  const { state, dispatch } = context;
  const isDark = state.theme === "dark";

  const toggleTheme = () => {
    dispatch({ type: "SET_THEME", payload: isDark ? "light" : "dark" });
  };

  return (
    <header className="container mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[rgb(79_70_229)] to-pink-500">
          ChronoCraft
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary dark:focus-visible:ring-offset-slate-900"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <SunIconComponent /> : <MoonIconComponent />}
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
