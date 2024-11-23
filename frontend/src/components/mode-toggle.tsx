import { IoSunny, IoMoon } from "react-icons/io5";

import { useTheme } from "../context/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
      {theme === "dark" ? (
        <IoSunny
          className="w-6 h-5 text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white "
          onClick={() => setTheme("light")}
        />
      ) : (
        <IoMoon
          className="w-6 h-5 text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white "
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
}
