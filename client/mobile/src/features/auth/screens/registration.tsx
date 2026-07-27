import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import appStyles from "../../../components/styles";
import Input from "../../../components/ui/Input";
import { Link, useNavigation } from "@react-navigation/native";
import colors from "../../../../constants/colors";
import Button from "../../../components/ui/button";
import { useState } from "react";
import useRegister from "../../../hooks/auth/useRegister";
import { validateEmail, validatePassword } from "../../../utils/validate";
import log from "../../../utils/logs";
import { useAuth } from "../../../provider/auth";
import { save } from "../../../api/storage";
import { STORAGE_KEYS } from "../../../api";

const Registration = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const { loading, handle } = useRegister();
  const { dispatch } = useAuth();

  const handleRegister = async () => {
    try {
      const isValidEmail = validateEmail(data.email);
      if (!isValidEmail) {
        log.error("[user-typed]: Invalid email format", {
          ...data,
        });
        return;
      }

      if (data.fullName.length < 3) {
        log.error(
          "[user-typed]: Full Name must be at least 5 characters long",
          {
            ...data,
          },
        );
        return;
      }

      const isValidPassword = validatePassword(data.password);
      if (!isValidPassword) {
        log.error("[user-typed]: Invalid password format", {
          ...data,
        });
        return;
      }

      if (data.password !== data.confirmPassword) {
        log.error("[user-typed]: Password and Confirm Password do not match", {
          ...data,
        });
        return;
      }

      const { data: registerData } = await handle({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      const { token, user } = registerData;
      dispatch({ type: "SIGN_IN", token, user });
      await Promise.all([
        save(STORAGE_KEYS.TOKEN, token),
        save(STORAGE_KEYS.USER, JSON.stringify(user)),
      ]);
    } catch (e) {
      log.debug("Registration failed", {
        error: e,
        ...data,
      });
      alert("Registration failed. Please check your details and try again.");
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
          <Text style={appStyles.header}>Welcome to TaskBoard</Text>
          <Text style={appStyles.body}>
            Please register to create a new account.
          </Text>
        </View>
        <Input
          value={data.email}
          onChangeText={(email) => setData({ ...data, email })}
          placeholder="email"
        />
        <Input
          value={data.fullName}
          onChangeText={(fullName) => setData({ ...data, fullName })}
          placeholder="Full Name"
        />
        <Input
          value={data.password}
          onChangeText={(password) => setData({ ...data, password })}
          placeholder="password"
          secureTextEntry
        />
        <Input
          value={data.confirmPassword}
          onChangeText={(confirmPassword) =>
            setData({ ...data, confirmPassword })
          }
          placeholder="Confirm Password"
          secureTextEntry
        />
        <Button loading={loading} onPress={handleRegister} title="register" />
        <View style={[appStyles.StackRow]}>
          <Text style={appStyles.body}>Already have an account?</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text
              style={{
                ...appStyles.body,
                color: colors.blue[500],
              }}
            >
              Login here
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;
