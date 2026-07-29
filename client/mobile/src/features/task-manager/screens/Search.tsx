import { View } from "react-native";
import appStyles from "../../../components/styles";
import SearchBar from "../components/search/searchBar";
import SearchDefault from "../components/search/search_default";
import SearchHistory from "../components/search/search_history";
import { useSearchControl } from "../../../provider/ui/searchControl";
import SearchDialog from "../components/search/search_dialog";

const Search = () => {
  const { searchHistory, isOpen } = useSearchControl();

  return (
    <View
      style={[
        appStyles.appBackground,
        appStyles.withPadding,
        appStyles.StackCol,
        { gap: 8 },
      ]}
    >
      <SearchBar />
      {searchHistory.length > 0 ? (
        <SearchHistory history={searchHistory} />
      ) : (
        <SearchDefault />
      )}

      {isOpen && <SearchDialog />}
    </View>
  );
};

export default Search;
