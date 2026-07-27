import { useState } from "react";
import apiEndpoints from "../../api";
import log from "../../utils/logs";

interface Handle {
  email: string;
  password: string;
  fullName: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);

  const handle = async ({ email, password , fullName}: Handle) => {
    setLoading(true);
    try {
      log.info("useRegister called with email:", email);
      const { url, ...rest } = apiEndpoints.register();
      log.info("performing register", {
        email,
        password,
        fullName,
        url,
        ...rest,
      });

      const res = await fetch(url, {
        ...rest,
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });
      log.info("register response status", res.status);
      if (!res.ok) {
        throw new Error(`Register failed with status ${res.status}`);
      }
      const data = await res.json();
      log.info("register response", data);
      return { success: true, data };
    } catch (error) {
      log.error("register error", error);
      return { success: false, error: "Register failed" };
    } finally {
      setLoading(false);
    }
  };

  return { handle, loading };
}
