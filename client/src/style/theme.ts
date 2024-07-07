export type TThemeName = "light" | "dark";
export type TColorKey =
  | "primary"
  | "background"
  | "secondary"
  | "third"
  | "border"
  | "text";
export type THeadingSize = "large" | "medium" | "small";
export type TButtonSize = "large" | "medium" | "small";
export type TButtonSchema = "primary" | "normal" | "like";
export type TLayoutWidth = "large" | "medium" | "small";

export interface ITheme {
  name: TThemeName;
  color: Record<TColorKey, string>;
  heading: {
    [key in THeadingSize]: {
      fontSize: string;
    };
  };
  buttonSize: {
    [key in TButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonSchema: {
    [key in TButtonSchema]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in TLayoutWidth]: string;
    };
  };
}

export const lightTheme: ITheme = {
  name: "light",
  color: {
    primary: "#F08A5D",
    background: "lightgray",
    secondary: "#5F5F5F",
    third: "green",
    border: "lightgray",
    text: "black",
  },
  heading: {
    large: {
      fontSize: "2rem",
    },
    medium: {
      fontSize: "1.5rem",
    },
    small: {
      fontSize: "1rem",
    },
  },
  buttonSize: {
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonSchema: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
    like: {
      color: "white",
      backgroundColor: "coral",
    },
  },
  borderRadius: {
    default: "4px",
  },
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};

export const darkTheme: ITheme = {
  ...lightTheme,
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "darkblue",
    third: "darkgreen",
    border: "lightgray",
    text: "gray",
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
