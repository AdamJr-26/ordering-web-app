import useProfile from "../custom/useProfile";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosAPI from "../../services/api.axios";

const UserContext = createContext("userToken");
export const UserProvider = ({ children }) => {
  //   get token params
  const [token, setToken] = useState(null);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (id) {
      localStorage.setItem("userToken", `Bearer ${id}`);
      setToken(id);
    }
  }, []);

  //   get profile
  const profile = useProfile();
  console.log("profile", profile);
  async function signIn() {
    await axiosAPI().get("/auth/google");
  }
  function logout() {
    localStorage.removeItem("userToken");
    profile.mutate();
    window.location.reload();
  }
  //   value
  const value = {
    signIn,
    profile,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useAuth = () => {
  return useContext(UserContext);
};
