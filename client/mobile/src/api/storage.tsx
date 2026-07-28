import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from ".";

export const save = (key: string, value: string) =>
  SecureStore.setItemAsync(key, value);

export const getValueFor = (key: string) => SecureStore.getItemAsync(key);

export const deleteValueFor = (key: string) => SecureStore.deleteItemAsync(key);

export const isSignedIn = async () => {
  const token = await getValueFor(STORAGE_KEYS.TOKEN);
  return !!token;
};
