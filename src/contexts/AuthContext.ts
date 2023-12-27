import { createContext } from "react";

interface AuthContextProps {
  auth: string;
  setAuth: (auth: string) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
