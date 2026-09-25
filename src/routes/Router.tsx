import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import RequireAuth from "../components/auth/RequireAuth";
import Loading from "../components/ui/Loading";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Donate = lazy(() => import("../pages/Donate"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Announcements = lazy(() => import("../pages/Anouncement"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ReceiptStatus = lazy(() => import("../pages/ReceiptStatus"));
const Members = lazy(() => import("../pages/Members"));

const page = (Page: LazyExoticComponent<ComponentType>) => <Suspense fallback={<Loading label="Loading page…" />}><Page /></Suspense>;

const Router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: page(NotFound),
    children: [
      { path: "/", element: page(Home) },
      { path: "/register", element: page(Register) },
      { path: "/dashboard", element: <RequireAuth>{page(Dashboard)}</RequireAuth> },
      { path: "/login", element: page(Login) },
      { path: "/donate", element: <RequireAuth>{page(Donate)}</RequireAuth> },
      { path: "/announcements", element: <Announcements/> },
      {path: "payment/receipt-status", element: <ReceiptStatus/>},
      // { path: "/anouncement", element: <Navigate to="/announcements" replace /> },
      // { path: "/payment/receipt-status", element: page(ReceiptStatus) },
      { path: "/commite/members", element: page(Members) },
      { path: "*", element: page(NotFound) },
    ],
  },
]);

export default Router;
