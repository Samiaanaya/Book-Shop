import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import SingleProduct from "../pages/SingleProduct";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import ManageProduct from "../pages/Dashboard/ManageProduct";
import AddProduct from "../pages/Dashboard/AddProduct";
import AllOrder from "../pages/Dashboard/AllOrder";
import AllUser from "../pages/Dashboard/AllUser";
import Statistics from "../pages/Dashboard/Statistics";
import ChangePassword from "../pages/Dashboard/ChangePassword";
import UpdateProduct from "../pages/Dashboard/UpdateProduct";
import MyOrder from "../pages/Dashboard/MyOrder";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Cart from "../pages/Cart";
import PlaceOrder from "../pages/PlaceOrder";
import VerifyOrder from "../pages/VerifyOrder";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/place-order",
        element: (
          <PrivateRoute>
            <PlaceOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-verify",
        element: (
          <PrivateRoute>
            <VerifyOrder />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-products",
        element: (
          <AdminRoutes>
            <ManageProduct />
          </AdminRoutes>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <AdminRoutes>
            <UpdateProduct />
          </AdminRoutes>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminRoutes>
            <AddProduct />
          </AdminRoutes>
        ),
      },
      {
        path: "all-order",
        element: (
          <AdminRoutes>
            <AllOrder />
          </AdminRoutes>
        ),
      },
      {
        path: "all-user",
        element: (
          <AdminRoutes>
            <AllUser />
          </AdminRoutes>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "my-order",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
