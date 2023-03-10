import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { useAuth } from "./auth";
import useProfile from "./custom/useProfile";

// its being imported in Route.js
function RouteProtection() {
  const { profile } = useAuth();
  const location = useLocation();
  return profile?.data ? (
    <Home />
  ) : !profile?.data && !profile.error ? (
    <h1>Loading.............</h1>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}

export default RouteProtection;
