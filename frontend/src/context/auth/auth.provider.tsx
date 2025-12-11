import { useState, type ReactNode } from "react";
import type { client, EmailPass } from "../../types/auth.context";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // login states
  const [credentials, setCredentials] = useState<EmailPass>({
    email: "",
    password: "",
  });

  // login handlers
  const handleForm = () => {};

  // handlers & helpers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number = 0
  ) => {
    // 0 for credentials , 1 for client credentials
    if (index == 0)
      setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    else if (index == 1)
      setClientCredentials((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
  };

  // register
  const [clientCredentials, setClientCredentials] = useState<client>({
    email: "",
    password: "",
    currentPassword: "",
    fullName: "",
  });

  return (
    <AuthContext.Provider
      value={{
        handleForm,
        handleChange,
        credentials,
        setCredentials,
        clientCredentials,
        setClientCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
