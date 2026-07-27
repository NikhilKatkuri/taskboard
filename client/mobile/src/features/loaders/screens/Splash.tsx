import { Image, StyleSheet, Text, View } from "react-native";
import appStyles from "../../../components/styles";

const Splash = () => {
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
