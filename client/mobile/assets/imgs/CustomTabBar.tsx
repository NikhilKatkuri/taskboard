import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { Icon, IconName } from "../../src/components/ui/icon";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type TabKey = "Home" | "Search";

const TABS: { key: TabKey; icon: IconName }[] = [
  { key: "Home", icon: "home_fill" },
  { key: "Search", icon: "search_fill" },
];
const { width } = Dimensions.get("screen");

const CustomTabBar = ({
  activeRoute,
  setActiveRoute,
}: {
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}) => {
  const navigation = useNavigation();

  const handlePress = (routeName: string) => {
    if (routeName !== activeRoute) {
      setActiveRoute(routeName);
      if (
        routeName === "Home" &&
        navigation.canGoBack() &&
        activeRoute === "Search"
      ) {
        navigation.goBack();
        return;
      }
      navigation.navigate(routeName as never);
    }
  };
  return (
    <View style={styles.bottomBar}>
      <View style={styles.flex}>
        <View style={styles.glassWrapper}>
          {/* base blur layer */}
          <BlurView
            intensity={Platform.OS === "ios" ? 50 : 10}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.tintOverlay} />
          <View style={styles.specularHighlight} />

          <View style={styles.container}>
            {TABS.map((tab) => {
              const isActive = activeRoute === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  activeOpacity={0.7}
                  onPress={() => handlePress(tab.key)}
                  style={[styles.round_box, isActive && styles.active]}
                >
                  <Icon
                    name={tab.icon}
                    color={isActive ? "white" : (colors.brand ?? "#333")}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={[
            styles.container,
            styles.round_box,
            styles.active,
            { height: 56, width: 56 },
          ]}
        >
          <BlurView
            intensity={Platform.OS === "ios" ? 50 : 20}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <Icon name="add" color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    zIndex: 50,
    bottom: 36,
    width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  glassWrapper: {
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 36,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  specularHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  container: {
    padding: 8,
    flexDirection: "row",
    gap: 2,
    overflow: "hidden",
  },
  round_box: {
    height: 48,
    width: 48,
    borderRadius: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.brand,
    // little glow around active pill to sell the glass/light effect
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  flex: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default CustomTabBar;
