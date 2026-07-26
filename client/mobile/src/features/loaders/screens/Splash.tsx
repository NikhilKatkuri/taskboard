import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import appStyles from "../../../components/styles";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    function navigateToLogin() {
      setTimeout(() => {
        navigation.navigate("Login" as never);
      }, 100);
    }
    navigateToLogin();
  }, []);

  return (
    <View style={[appStyles.background, appStyles.center]}>
      <Image
        source={require("../../../../assets/imgs/logo.png")}
        style={styles.image}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160,
    resizeMode: "contain",
  },
});
