import { View, Text, Image } from "react-native";
import appStyles from "../../../components/styles";
import Input from "../../../components/ui/Input";
import { Link } from "@react-navigation/native";
import colors from "../../../../constants/colors";

const Login = () => {
  return (
    <View
      style={[
        appStyles.background,
        appStyles.center,
        appStyles.withPadding,
        appStyles.StackCol,
        { gap: 16 },
      ]}
    >
      <View style={[appStyles.StackCol, appStyles.center, { gap: 4 }]}>
        <Image
          source={require("../../../../assets/imgs/logo.png")}
          style={appStyles.heroIcon}
        />
        <Text style={appStyles.header}>Welcome Back</Text>
        <Text style={appStyles.body}>
          Please login to your account to continue.
        </Text>
      </View>
      <Input placeholder="Enter your email" />
      <Input placeholder="Enter your password" secureTextEntry />
      <View style={[appStyles.StackRow]}>
        <Text style={appStyles.body}>Don't have an account?</Text>
        <Link
          screen="Register"
          params={{}}
          style={{
            ...appStyles.body,
            color: colors.blue[500],
          }}
        >
          Register here
        </Link>
      </View>
    </View>
  );
};

export default Login;
