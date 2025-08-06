import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes.jsx";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, selectIsAuthenticated } from "./redux/auth/authSlice.js";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element} />
          ))}
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
