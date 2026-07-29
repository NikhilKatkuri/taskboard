import { ViewProps } from "react-native";

export function firstOrLastChild(
  index: number,
  length: number,
): ViewProps["style"] {
  if (index === 0) {
    return {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    };
  } else if (index === length - 1) {
    return {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    };
  }
  return {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  };
}
