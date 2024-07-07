import { useContext } from "react";
import { IThemeContext, themeContext } from "@/context/ThemeContext";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext<IThemeContext>(themeContext);

  return <button onClick={toggleTheme}>{themeName}</button>;
};

export default ThemeSwitcher;
