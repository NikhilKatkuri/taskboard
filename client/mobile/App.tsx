import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { AppStack, AuthStack } from "./src/navigation/root-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider, { useAuth } from "./src/provider/auth";
import { createStaticNavigation } from "@react-navigation/native";
import appStyles from "./src/components/styles";

// Keep the splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

function AppRouter() {
  const { token } = useAuth();
  const Navigation = createStaticNavigation(token ? AppStack : AuthStack);
  return <Navigation />;
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Italic": require("./assets/fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf"),
    GoogleSans: require("./assets/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={[appStyles.background]} onLayout={onLayoutRootView}>
        <AppRouter />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
