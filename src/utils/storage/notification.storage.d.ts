export const storeDeviceTokenInStorage: (deviceToken: string) => Promise<string>;
export const getDeviceTokenFromStorage: () => Promise<string | null>;
export const setIsFirstTimeNotificationPopup: (isFirstTime: boolean) => Promise<void>;
export const getIsFirstTimeNotificationPopup: () => Promise<boolean | null> 