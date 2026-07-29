import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const appStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  appBackground: {
    flex: 1,
    backgroundColor: colors.appBackground,
    position: "relative",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  StackRow: {
    flexDirection: "row",
    gap: 6,
  },
  StackCol: {
    flexDirection: "column",
    gap: 12,
  },
  withPadding: {
    padding: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "GoogleSans",
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "GoogleSans",
    color: colors.gray[700],
  },
  heroIcon: {
    width: 64,
    height: 64,
  },
  round_container: {
    borderRadius: 24,
    backgroundColor: colors.gray[200],
    padding: 8,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
    borderWidth: 0.5,
  },
  pillText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
    fontFamily: "GoogleSans",
  },
  activePill: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
    color: "#fff",
  },
  inactivePill: {
    backgroundColor: colors.gray[200],
    borderColor: colors.gray[200],
    color: colors.gray[700],
  }
});

export default appStyles;
