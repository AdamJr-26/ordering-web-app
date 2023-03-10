import React from "react";
import WelcomeNavigator from "../components/WelcomeNavigator";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function Welcome() {
  const { profile, signIn } = useAuth();

  return profile?.data && !profile?.error ? (
    <Navigate to="/home" state={{ from: location }} exact />
  ) : (
    <div className="">
      <div>
        <WelcomeNavigator signIn={signIn} />
      </div>
    </div>
  );
}

export default Welcome;
