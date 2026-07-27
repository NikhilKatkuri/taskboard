import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import { Link } from "@react-navigation/native";

import appStyles from "../../../components/styles";
import Input from "../../../components/ui/Input";
import colors from "../../../../constants/colors";
import Button from "../../../components/ui/button";
import { useState } from "react";
import useLogin from "../../../hooks/auth/useLogin";
import { validateEmail, validatePassword } from "../../../utils/validate";
import log from "../../../utils/logs";
import { STORAGE_KEYS } from "../../../api";
import { save } from "../../../api/storage";
import { useAuth } from "../../../provider/auth";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const { loading, handle } = useLogin();
  const { dispatch } = useAuth();

  const handleLogin = async () => {
    try {
      const isValidEmail = validateEmail(data.email);
      if (!isValidEmail) {
        log.error("[user-typed]: Invalid email format", {
          email: data.email,
        });
        return;
      }

      const isValidPassword = validatePassword(data.password);
      if (!isValidPassword) {
        log.error("[user-typed]: Invalid password format", {
          email: data.email,
        });
        return;
      }

      const { data: loginData } = await handle(data);
      const { token, user } = loginData;
      dispatch({ type: "SIGN_IN", token, user });
      await Promise.all([
        save(STORAGE_KEYS.TOKEN, token),
        save(STORAGE_KEYS.USER, JSON.stringify(user)),
      ]);
    } catch (error) {
      log.debug("Login failed", {
        error,
        email: data.email,
      });
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
        <Input
          placeholder="Enter your email"
          value={data.email}
          onChangeText={(email) => setData({ ...data, email })}
        />
        <Input
          placeholder="Enter your password"
          secureTextEntry
          value={data.password}
          onChangeText={(password) => setData({ ...data, password })}
        />
        <Button onPress={handleLogin} title="Login" loading={loading} />
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
    </KeyboardAvoidingView>
  );
};

export default Login;
