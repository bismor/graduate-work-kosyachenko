import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteAuth = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Component {...props} />
  );
};

export default ProtectedRouteAuth;
