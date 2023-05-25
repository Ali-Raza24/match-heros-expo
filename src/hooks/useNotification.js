import { useEffect, useState } from "react"
import { registerForPushNotificationAsync } from "../utils/notifications/register.notification";
import { getDeviceTokenFromStorage, getIsFirstTimeNotificationPopup, setIsFirstTimeNotificationPopup, storeDeviceTokenInStorage } from "../utils/storage/notification.storage";

export const useNotification = () => {
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        getDeviceToken()
    }, [])

    async function getDeviceToken() {
        try {
            const token = await getDeviceTokenFromStorage();
            const isFirst = await getIsFirstTimeNotificationPopup()
            if (!token || isFirst) {
                setShowPopup(true);
                setIsFirstTime(true);
                return;
            }
        } catch (error) {
            setIsFirstTime(true);
            setShowPopup(true);
            console.log(`${getDeviceToken.name} Error`, err);
        }
    }

    const handleShowPopup = async () => {
        setShowPopup(false);
        setIsFirstTime(false);
        await setIsFirstTimeNotificationPopup(false);
    }

    return {
        isFirstTime,
        showPopup,
        handleShowPopup
    }
}