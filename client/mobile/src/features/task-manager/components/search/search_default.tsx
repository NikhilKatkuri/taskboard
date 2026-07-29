import { View, Text } from "react-native";
import appStyles from "../../../../components/styles";
import SVGComponent from "./search_hero";

const SearchDefault = () => {
  return (
    <View
      style={[
        appStyles.StackCol,
        appStyles.center,
        { flex: 1, gap: 24, maxHeight: 600 },
      ]}
    >
      <SVGComponent />
      <Text style={[appStyles.header, appStyles.center, { fontSize: 24 }]}>
        Start Searching your tasks
      </Text>
    </View>
  );
};

export default SearchDefault;
