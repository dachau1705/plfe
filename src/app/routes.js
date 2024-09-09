import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));
const VerifyEmail = Loadable(lazy(() => import("app/views/sessions/VerifyEmail")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const Product = Loadable(lazy(() => import("app/views/product/Product")));
const ProductList = Loadable(lazy(() => import("app/views/product/ProductList")));
const CustomerList = Loadable(lazy(() => import("app/views/customers/CustomerList")));
const ViewUser = Loadable(lazy(() => import("app/views/customers/ViewUser")))
const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      //sample route
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      { path: "/product/default", element: <Product />, auth: authRoles.admin },
      { path: "/product/product-list", element: <ProductList />, auth: authRoles.admin },
      { path: "/customer/customer-list", element: <CustomerList />, auth: authRoles.admin },
      { path: "/customer/view-customer", element: <ViewUser />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/signin", element: <JwtLogin /> },
  { path: "/signup", element: <JwtRegister /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/users/verify-email", element: <VerifyEmail /> },
  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
