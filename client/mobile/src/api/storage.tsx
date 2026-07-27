import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from ".";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

async function deleteValueFor(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

async function isSignedIn(): Promise<boolean> {
  const token = await getValueFor(STORAGE_KEYS.TOKEN);
  return token !== null;
}

export { save, getValueFor, isSignedIn, deleteValueFor };
