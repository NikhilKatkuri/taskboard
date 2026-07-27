import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../features/auth/screens/login";
import Registration from "../features/auth/screens/registration";
import Home from "../features/task-manager/screens/Home";

export const ROUTES = {
  SPLASH: "Splash",
  LOGIN: "Login",
  REGISTER: "Register",
} as const;

const AuthStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    [ROUTES.LOGIN]: Login,
    [ROUTES.REGISTER]: Registration,
  },
});

const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home
  },
});

export {
  AppStack,
  AuthStack,
}