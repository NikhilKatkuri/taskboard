import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  Pressable,
  Text,
} from "react-native";
import colors from "../../../constants/colors";
import { forwardRef, useState } from "react";

interface InputProps extends TextInputProps {}

const Input = forwardRef<TextInput, InputProps>(({ ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        ref={ref}
        style={[styles.input, props.style]}
        secureTextEntry={!isPasswordVisible && props.secureTextEntry}
      />
      {props.secureTextEntry && (
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </Pressable>
      )}
    </View>
  );
});

Input.displayName = "Input";

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray[400],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    color: colors.gray[900] || "#000",
    paddingVertical: 0,
  },
  toggleButton: {
    paddingLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  toggleText: {
    color: colors.blue[500],
    fontSize: 14,
    fontWeight: "600",
  },
});