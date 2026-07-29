import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import appStyles from "../../../../components/styles";
import { Icon } from "../../../../components/ui/icon";
import colors from "../../../../../constants/colors";
import { firstOrLastChild } from "../../utils";

interface SearchHistoryItemProps {
  text: string;
  containerStyle?: ViewProps["style"];
}

const SearchHistoryItem = ({
  text,
  containerStyle,
}: SearchHistoryItemProps) => {
  return (
    <View
      style={[
        appStyles.StackRow,
        appStyles.center,
        {
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: 8,
          elevation: 0.2,
        },
        containerStyle,
      ]}
    >
      <View
        style={[
          appStyles.round_container,
          appStyles.center,
          {
            backgroundColor: "transparent",
          },
        ]}
      >
        <Icon name={"history"} />
      </View>
      <Text
        style={[
          appStyles.body,
          { fontSize: 14, lineHeight: 20, flex: 1, color: colors.gray[700] },
        ]}
      >
        {text}
      </Text>
      {false ? (
        <Pressable
          style={({ pressed }) => [
            appStyles.round_container,
            appStyles.center,
            {
              backgroundColor: pressed
                ? appStyles.round_container.backgroundColor
                : "transparent",
            },
          ]}
        >
          <Icon name={"cross"} />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

interface SearchHistoryProps {
  history?: string[];
}

const SearchHistory = ({ history }: SearchHistoryProps) => {
  return (
    <View style={[appStyles.StackCol, { flex: 1, gap: 2 }]}>
      <View
        style={[
          appStyles.StackRow,
          { justifyContent: "space-between", padding: 8 },
        ]}
      >
        <Text style={[appStyles.body, { fontSize: 14, lineHeight: 20 }]}>
          History
        </Text>
      </View>

      {history?.map((item, index) => {
        const style = firstOrLastChild(index, history.length);
        return (
          <SearchHistoryItem key={index} text={item} containerStyle={style} />
        );
      })}
    </View>
  );
};

export default SearchHistory;

const styles = StyleSheet.create({});
