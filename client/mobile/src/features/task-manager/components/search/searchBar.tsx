import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import appStyles from "../../../../components/styles";
import Input from "../../../../components/ui/Input";
import { Icon } from "../../../../components/ui/icon";
import colors from "../../../../../constants/colors";
import { useSearchControl } from "../../../../provider/ui/searchControl";

const SearchBar = () => {
  const { setIsOpen, searchQuery, setSearchQuery, addToSearchHistory } = useSearchControl();
  return (
    <View
      style={[
        styles.StackRow,
        styles.paddingTop,
        styles.centered,
        { justifyContent: "flex-start", gap: 12 },
      ]}
    >
      <Input
        prefixIcon={<Icon name="search" color={colors.gray[700]} />}
        containerStyle={[styles.input]}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={async () => await addToSearchHistory(searchQuery.trim())}
      />
      <Pressable
        onPress={() => setIsOpen(true)}
        style={[appStyles.round_container, appStyles.center]}
      >
        <Icon name="apps" color={colors.gray[700]} />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  StackRow: {
    flexDirection: "row",
    gap: 6,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  paddingTop: {
    paddingTop: 12,
  },
  input: {
    backgroundColor: "#ffffff06",
    borderRadius: 24,
    width: Dimensions.get("window").width - 2 * (12 + 24 + 6),
  },
});
