import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Index from "@/pages/Index";
import Impresoras from "@/pages/Impresoras";
import Filamentos from "@/pages/Filamentos";
import Repuestos from "@/pages/Repuestos";
import Accesorios from "@/pages/Accesorios";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Cart from "@/pages/Cart";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import Reviews from "@/pages/Reviews";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "impresoras",
        element: <Impresoras />,
      },
      {
        path: "filamentos",
        element: <Filamentos />,
      },
      {
        path: "repuestos",
        element: <Repuestos />,
      },
      {
        path: "accesorios",
        element: <Accesorios />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout-success",
        element: <CheckoutSuccess />,
      },

      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      },
      
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
