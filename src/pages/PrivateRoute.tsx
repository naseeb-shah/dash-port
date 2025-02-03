import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  // Check if the user is authenticated (e.g., check for a token in localStorage)
  const isAuthenticated = !!localStorage.getItem("token");

  // If authenticated, render the child routes (Outlet)
  // If not authenticated, redirect to the Auth page
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;