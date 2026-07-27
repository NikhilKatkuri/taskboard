import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../../constants/colors";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonVatiantStyles = "button" | "text";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}
const Button = ({
  title,
  variant = "primary",
  loading = false,
  ...props
}: ButtonProps) => {
  const variantStyles: Record<
    ButtonVariant,
    Record<ButtonVatiantStyles, any>
  > = {
    primary: {
      button: styles.primaryBtn,
      text: styles.primaryText,
    },
    secondary: { button: {}, text: {} },
    outline: { button: {}, text: {} },
  };
  return (
    <Pressable {...props} style={[variantStyles[variant].button]}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={variantStyles[variant].text}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primaryBtn: {
    width: "100%",
    padding: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.brand,
  },
  primaryText: {
    color: "#fff",
    fontFamily: "GoogleSans",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
});
