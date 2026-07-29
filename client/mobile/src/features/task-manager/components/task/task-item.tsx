import { View, Text, StyleSheet } from "react-native";
import appStyles from "../../../../components/styles";
import { task } from "../../../../schemas/task";
import { formatDate } from "../../../../utils/date";

const TaskItem = ({ ...props }: task) => {
  const dueDate = formatDate(props.dueAt);
  const priorityColor = getPriorityColor(props.priority);
  const statusColor = getStatusColor(props.status);
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
        <View style={[appStyles.pill, priorityColor.bg]}>
          <Text style={[appStyles.pillText, priorityColor.txt]}>
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
        <View style={[appStyles.pill, statusColor.bg]}>
          <Text style={[appStyles.pillText, statusColor.txt]}>{props.status}</Text>
        </View>

        <Text style={[styles.body, styles.font]}>
          Due {dueDate.date()} at {dueDate.time()}
        </Text>
      </View>
    </View>
  );
};

export default TaskItem;

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return { bg: styles.highPriority, txt: styles.highText };
    case "Medium":
      return { bg: styles.mediumPriority, txt: styles.mediumText };
    case "Low":
      return { bg: styles.lowPriority, txt: styles.lowText };
    default:
      return { bg: styles.defaultPriority, txt: styles.defaultText };
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return { bg: styles.todoStatus, txt: styles.todoText };
    case "in-progress":
      return { bg: styles.inProgressStatus, txt: styles.inProgressText };
    case "review":
      return { bg: styles.reviewStatus, txt: styles.reviewText };
    case "done":
      return { bg: styles.doneStatus, txt: styles.doneText };
    default:
      return { bg: styles.todoStatus, txt: styles.todoText };
  }
};

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

  highPriority: { backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" },
  mediumPriority: { backgroundColor: "#FEF3C7", borderColor: "#FCD34D" },
  lowPriority: { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" },
  defaultPriority: { backgroundColor: "#F3F4F6", borderColor: "#D1D5DB" },

  todoStatus: { backgroundColor: "#E5E7EB", borderColor: "#9CA3AF" },
  inProgressStatus: { backgroundColor: "#DBEAFE", borderColor: "#93C5FD" },
  reviewStatus: { backgroundColor: "#E9D5FF", borderColor: "#C4B5FD" },
  doneStatus: { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" },

  highText: { color: "#B91C1C" },
  mediumText: { color: "#A16207" },
  lowText: { color: "#15803D" },
  defaultText: { color: "#374151" },
  todoText: { color: "#374151" },
  inProgressText: { color: "#1D4ED8" },
  reviewText: { color: "#7E22CE" },
  doneText: { color: "#15803D" },
});
