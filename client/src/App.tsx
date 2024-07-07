import { BookStoreThemeProvider } from "@/context/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";

const App = () => {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
};

export default App;
