import { StyleSheet, View, Text } from "react-native";
import { greetUser } from "../../../../utils/greetings";

const Topbar = () => {
  return (
    <View
      style={[
        styles.StackRow,
        styles.paddingTop,
        styles.centered,
        { justifyContent: "flex-start", gap: 12 },
      ]}
    >
      <View style={[styles.circle]}></View>
      <View style={[styles.StackCol]}>
        <Text style={[styles.font, styles.header]}>TaskBoard</Text>
        <Text
          lineBreakMode="tail"
          numberOfLines={2}
          style={[styles.font, styles.body]}
        >
          {greetUser("Nikhil")}
        </Text>
      </View>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  StackRow: {
    flexDirection: "row",
    gap: 6,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  StackCol: {
    flexDirection: "column",
    gap: 2,
  },
  paddingTop: {
    paddingTop: 12,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e0e0e05c",
  },
  font: {
    fontFamily: "GoogleSans",
  },
  header: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: "#21202091",
  },
});
