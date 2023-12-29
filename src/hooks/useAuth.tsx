import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth, setAuth } = context;

  // Load auth state from cookies when component mounts
  useEffect(() => {
    const storedAuth = Cookies.get("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Save auth state to cookies whenever it changes
  useEffect(() => {
    Cookies.set("auth", JSON.stringify(auth), { expires: 1 });
  }, [auth]);

  return { auth, setAuth };
};

export default useAuth;
