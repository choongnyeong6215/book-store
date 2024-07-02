import { createGlobalStyle } from "styled-components";
import { TThemeName } from "./theme";

export const GlobalStyle = createGlobalStyle<{ themeName: TThemeName }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${({ themeName }) => (themeName === "light" ? "black" : "white")};
    background-color: ${({ themeName }) =>
      themeName === "light" ? "white" : "black"};
  }

  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;
