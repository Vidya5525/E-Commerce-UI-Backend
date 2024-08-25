import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to='/login' />;
  }

  return <Component />;
};

export default ProtectedRoute;
