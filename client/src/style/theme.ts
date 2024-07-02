export type TThemeName = "light" | "dark";
type TColorKey = "primary" | "background" | "secondary" | "third";

export interface ITheme {
  name: TThemeName;
  color: Record<TColorKey, string>;
}

export const lightTheme: ITheme = {
  name: "light",
  color: {
    primary: "brown",
    background: "lightgray",
    secondary: "blue",
    third: "green",
  },
};

export const darkTheme: ITheme = {
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "darkblue",
    third: "darkgreen",
  },
};

export const getTheme = (themeName: TThemeName): ITheme => {
  switch (themeName) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
  }
};
