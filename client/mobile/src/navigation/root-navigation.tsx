import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../features/loaders/screens/Splash";
import Login from "../features/auth/screens/login";
import Registration from "../features/auth/screens/registration";

const isSignedIn = false;

const RootStack = createNativeStackNavigator({
  initialRouteName: "Splash",
  screenOptions: {
    headerShown: false,
    backBehavior: "history",
  },
  screens: {
    Splash: {
      screen: Splash,
    },
    Login: {
      if: () => !isSignedIn,
      screen: Login,
    },
    Register: {
      if: () => !isSignedIn,
      screen: Registration,
    },
  },
});

const RootNavigation = createStaticNavigation(RootStack);
export default RootNavigation;
