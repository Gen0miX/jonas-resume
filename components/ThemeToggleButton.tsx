import React from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "./ThemeContext";

interface ThemeToggleButtonProps {
  iconSize?: number;
  className?: string;
}

export default function ThemeToggleButton({
  iconSize = 24,
  className,
}: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={`swap swap-rotate ${className}`}>
      <span className="hidden">Switch theme</span>
      <input
        type="checkbox"
        onClick={toggleTheme}
        checked={theme === "nord"}
        readOnly
      />
      <IoSunny className="swap-off" size={iconSize} />
      <IoMoon className="swap-on" size={iconSize} />
    </label>
  );
}
