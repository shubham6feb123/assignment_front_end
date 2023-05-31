import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import _404 from "./pages/_404";
import DashboardProtectedRoute from "./pages/DashboardProtectedRoute";
import AuthProtectedRoute from "./pages/AuthProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={<DashboardProtectedRoute Component={Dashboard} />}
        />
        <Route
          path="/login"
          element={<AuthProtectedRoute Component={Login}/>}
        />
         <Route
          path="/register"
          element={<AuthProtectedRoute Component={Register}/>}
        />
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
