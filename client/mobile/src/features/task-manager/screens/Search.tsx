import { View, Text } from "react-native"; 
import appStyles from "../../../components/styles";

const Search = () => {
  return (
    <View
      style={[appStyles.appBackground, appStyles.withPadding, appStyles.StackCol]}
    > 
      <Text>Search</Text>
    </View>
  );
};

export default Search;
