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
    fontWeight: "bold",
    fontFamily: "GoogleSans",
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "GoogleSans",
    color: colors.gray[700]
  },
  heroIcon:{
    width: 64,
    height: 64,
  }
});

export default appStyles;
