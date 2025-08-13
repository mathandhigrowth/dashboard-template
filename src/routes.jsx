import React from "react";
import LoginPage from "./pages/auth/LoginPage";
import DashBoardLayout from "./pages/dashboard/DashBoardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LaunchControl from './pages/settings/SettingsPage';

const routes = [
  { path: "/", element: <LoginPage />, protected: false },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    protected: true,
  },
  {
    path: "/launch",
    element: (
      <ProtectedRoute>
        <LaunchControl />
      </ProtectedRoute>
    ),
    protected: true,
  },
];

export default routes;
