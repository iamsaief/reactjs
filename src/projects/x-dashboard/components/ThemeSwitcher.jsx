import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../../../utils/cn";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="relative">
      <div className="flex bg-slate-100 dark:bg-slate-700 rounded-full p-[2px]">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all",
              theme === value
                ? "bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
};
