import { useState } from "react";
import apiEndpoints from "../../api";
import log from "../../utils/logs";

interface Handle {
  email: string;
  password: string;
}

export default function useLogin() {

  const [loading, setLoading] = useState(false);
  
  const handle = async ({ email, password }: Handle) => {
    setLoading(true);
    try {
      log.info("useLogin called with email:", email);
      const { url, ...rest } = apiEndpoints.login();
      log.info("performing login", {
        email,
        password,
        url,
        ...rest,
      });
      const res = await fetch(url, {
        ...rest,
        body: JSON.stringify({
          email,
          password,
        }),
      });
      log.info("login response status", res.status);
      if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
      }
      const data = await res.json();
      log.info("login response", data);
      return { success: true, data };
    } catch (error) {
      log.error("login error", error);
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  return { handle, loading };
}
