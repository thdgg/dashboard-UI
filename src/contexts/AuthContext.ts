import { createContext } from "react";

interface AuthContextProps {
  auth: {
    token: string;
    userId: string;
    userName: string;
  } | null;
  setAuth: (auth: Partial<{ token: string; userId: string; userName: string }>) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
