import React from "react";
import LoginPage from "./pages/auth/LoginPage";
import DashBoardLayout from "./pages/dashboard/DashBoardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

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
];

export default routes;
