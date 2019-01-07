import { AsyncStorage } from 'react-native';

export async function removeItemValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

export async function setItemValue(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (exception) {
    return false;
  }
}

export async function getItemValue(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      return value;
    }
    return null;
  } catch (exception) {
    return null;
  }
}
