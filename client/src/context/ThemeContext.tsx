import { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { TThemeName, getTheme } from "../style/theme";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

export interface IThemeContext {
  themeName: TThemeName;
  toggleTheme: () => void;
}

// 테마 상태
export const themeState = {
  themeName: DEFAULT_THEME_NAME as TThemeName,
  toggleTheme: () => {},
};

export const themeContext = createContext<IThemeContext>(themeState);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<TThemeName>(DEFAULT_THEME_NAME);

  // 테마 변경 함수
  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");

    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      themeName == "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    const savedThemName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY
    ) as TThemeName;

    setThemeName(savedThemName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <themeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
};
