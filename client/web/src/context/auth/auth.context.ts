import { createContext } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  logout: () => void;
  getToken: () => string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
