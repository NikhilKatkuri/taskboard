import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getValueFor } from "../../api/storage";
import { STORAGE_KEYS } from "../../api";
import Splash from "../../features/loaders/screens/Splash";

interface AuthContextTypes {
  token: string | null;
  dispatch: React.Dispatch<AuthAction>;
}

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  user: any;
}

type AuthAction =
  | { type: "RESTORE_TOKEN"; token: string | null; user: any | null }
  | { type: "SIGN_IN"; token: string; user: any }
  | { type: "SIGN_OUT" };

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: AuthAction) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    },
  );

  async function boot() {
    let token;
    let user;
    try {
      [user, token] = await Promise.all([
        getValueFor(STORAGE_KEYS.TOKEN),
        getValueFor(STORAGE_KEYS.USER),
      ]);

      dispatch({
        type: "RESTORE_TOKEN",
        token,
        user,
      });
    } catch (e) {
      dispatch({ type: "RESTORE_TOKEN", token: null, user: null });
    }
  }

  useEffect(() => {
    boot();
  }, []);

  if (state.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.userToken,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth Must be used inside the AuthProvider");
  return context;
};

export default AuthProvider;
