import { Text, View } from "react-native";
import appStyles from "../../../components/styles";
import Button from "../../../components/ui/button";
import { deleteValueFor } from "../../../api/storage";
import { STORAGE_KEYS } from "../../../api";
import { useAuth } from "../../../provider/auth";

const Home = () => {
  const { dispatch } = useAuth();
  async function handleLogout() {
    await Promise.all([
      deleteValueFor(STORAGE_KEYS.TOKEN),
      deleteValueFor(STORAGE_KEYS.USER),
    ]);
    dispatch({ type: "SIGN_OUT" });
  }
  return (
    <View
      style={[appStyles.background, appStyles.withPadding, appStyles.StackCol]}
    >
      <Text>Home</Text>
      <Button onPress={handleLogout} title="Log out" />
    </View>
  );
};

export default Home;
