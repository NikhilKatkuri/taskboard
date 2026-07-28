import { View, Text, StyleSheet } from "react-native";
import appStyles from "../../../components/styles";
import { task } from "../../../schemas/task";
import { formatDate } from "../../../utils/date";

const TaskItem = ({ ...props }: task) => {
  const dueDate = formatDate(props.dueAt);
  return (
    <View style={styles.container}>
      <View
        style={[
          appStyles.StackRow,
          { justifyContent: "space-between", width: "100%" },
        ]}
      >
        <View style={[styles.col, { maxWidth: "70%" }]}>
          <Text numberOfLines={1} style={[styles.header, styles.font]}>
            {props.title}
          </Text>
          <Text numberOfLines={2} style={[styles.body, styles.font]}>
            {props.description}
          </Text>
        </View>
        <View
          style={[
            styles.pill,
            styles[`${props.priority.toLowerCase()}Bg` as StyleKeys],
          ]}
        >
          <Text
            style={[
              styles.pillText,
              styles[`${props.priority.toLowerCase()}Fg` as StyleKeys],
            ]}
          >
            {props.priority}
          </Text>
        </View>
      </View>
      <View
        style={[
          appStyles.StackRow,
          {
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          },
        ]}
      >
        <View style={[styles.pill, { backgroundColor: "#e0e0e0" }]}>
          <Text style={[styles.pillText]}>{props.status}</Text>
        </View>

        <Text style={[styles.body, styles.font]}>
          Due {dueDate.date()} at {dueDate.time()}
        </Text>
      </View>
    </View>
  );
};

export default TaskItem;

type StyleKeys =
  | "container"
  | "header"
  | "col"
  | "font"
  | "body"
  | "pill"
  | "pillText"
  | "mediumBg"
  | "mediumFg"
  | "redBg"
  | "redFg"
  | "lowBg"
  | "lowFg";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dddddd4e",
    gap: 32,
    height: "auto",
  },
  header: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 30,
  },
  col: {
    flexDirection: "column",
  },
  font: {
    fontFamily: "GoogleSans",
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 400,
    color: "#6d6969",
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
  },
  pillText: {
    fontSize: 12,
    lineHeight: 16,
  },
  mediumBg: {
    backgroundColor: "#fbfb9165",
  },
  mediumFg: {
    color: "#d8d817",
  },
  redBg: {
    backgroundColor: "#f97171",
  },
  redFg: {
    color: "#f97171",
  },
  lowBg: {
    backgroundColor: "#16f20a12",
  },
  lowFg: {
    color: "#078015",
  },
});
