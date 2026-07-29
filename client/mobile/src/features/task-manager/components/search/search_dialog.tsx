import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import appStyles from "../../../../components/styles";
import {
  SearchBy,
  SearchMapBy,
  useSearchControl,
} from "../../../../provider/ui/searchControl";

const SearchDialog = () => {
  const { setIsOpen, searchBy, SetSearchBy, clearSearchHistory } = useSearchControl();
  return (
    <View style={styles.body} onTouchStart={() => setIsOpen(false)}>
      <View
        onTouchStart={(e) => e.stopPropagation()}
        style={[styles.container, appStyles.StackCol]}
      >
        <View style={[appStyles.StackCol, { gap: 12 }]}>
          <Text>Search by</Text>
          <View style={[appStyles.StackRow]}>
            {SearchMapBy.map((item, index) => (
              <Pressable key={index} onPress={() => SetSearchBy(item)}>
                <Text
                  style={[
                    appStyles.pill,
                    appStyles.pillText,
                    searchBy === item
                      ? appStyles.activePill
                      : appStyles.inactivePill,
                    {
                      paddingHorizontal: 16,
                      maxHeight: 36,
                      paddingVertical: 10,
                    },
                  ]}
                >
                  Task {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={{ height: 1, backgroundColor: "#ccc", marginVertical: 16 }}
        />
        <Pressable
          style={({ pressed }) => [
            { alignSelf: "flex-end" },
            appStyles.pill,
            pressed ? appStyles.activePill : appStyles.inactivePill,
            {maxHeight: 36, paddingVertical: 10, paddingHorizontal: 16}
          ]}
          onPress={async () => clearSearchHistory()}
        >
          <Text style={[appStyles.pillText]}>Clear History</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SearchDialog;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 999,
  },
  container: {
    width: "80%",
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
});
