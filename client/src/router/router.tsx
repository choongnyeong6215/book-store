import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Error from "@/components/common/Error";
import Layout from "@/layout/Layout";
import Login from "@/pages/Login";
import Join from "@/pages/Join";
import ResetPassword from "@/pages/ResetPassword";
import Books from "@/pages/Books";
import BookDetail from "@/pages/BookDetail";
import Cart from "@/pages/Cart";
import Order from "@/pages/Order";
import OrderList from "@/pages/OrderList";

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
        <Books />
      </Layout>
    ),
  },
  {
    path: "/books/:bookId",
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: "/carts",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <Order />
      </Layout>
    ),
  },
  {
    path: "/orderList",
    element: (
      <Layout>
        <OrderList />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/join",
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
  },
  {
    path: "/reset",
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
]);
