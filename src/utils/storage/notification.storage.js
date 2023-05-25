import AsyncStorage from "@react-native-async-storage/async-storage";

const DEVICE_KEY = "Device_key";
const IS_FIRST_TIME_NOTIFICATION_POPUP = "IS_FIRST_TIME_NOTIFICATION_POPUP";

export const storeDeviceTokenInStorage = async (deviceToken) => {
  try {
    const token = await AsyncStorage.setItem(DEVICE_KEY, deviceToken);
    return token;
  } catch (error) {
    console.log("SET Device Async Storage Error", error);
  }
};

export const getDeviceTokenFromStorage = async () => {
  try {
    const deviceToken = await AsyncStorage.getItem(DEVICE_KEY);
    if (deviceToken) {
      return deviceToken;
    }
    return null;
  } catch (error) {
    console.log("GET Device Async Storage Error", error);
  }
};

export const setIsFirstTimeNotificationPopup = async (isFirstTime) => {
  try {
    await AsyncStorage.setItem(
      IS_FIRST_TIME_NOTIFICATION_POPUP,
      JSON.stringify(isFirstTime)
    );
  } catch (error) {
    console.log("SET Has Notification Accepted Async Storage Error", error);
  }
};

export const getIsFirstTimeNotificationPopup = async () => {
  try {
    const isFirstTime = await AsyncStorage.getItem(
      IS_FIRST_TIME_NOTIFICATION_POPUP
    );
    if (isFirstTime) {
      return Boolean(JSON.parse(isFirstTime));
    }
    return null;
  } catch (error) {
    console.log("GET Has Notification Accepted Async Storage Error", error);
  }
};
