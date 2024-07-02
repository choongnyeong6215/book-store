import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../components/common/Error";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <div>도서 리스트</div>
      </Layout>
    ),
  },
]);
