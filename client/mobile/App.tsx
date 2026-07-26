import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import RootNavigation from "./src/navigation/root-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Italic": require("./assets/fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf"),
    "GoogleSans": require("./assets/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf"),
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
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <RootNavigation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
