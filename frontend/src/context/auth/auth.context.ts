import { createContext } from "react";
import type { AuthContextType } from "@schemas/auth.context";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
