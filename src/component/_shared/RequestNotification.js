import { useToast } from "react-native-toast-notifications";
import AuthService from "../../services/AuthService";
import { registerForPushNotificationAsync } from "../../utils/notifications/register.notification";
import { storeDeviceTokenInStorage } from "../../utils/storage/notification.storage";
import { useSelector } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';

const authService = new AuthService();
export const RequestNotificationPopup = ({ visible, onTouchOutside }) => {
    const toast = useToast();
    const user = useSelector(store => store.user);
    const saveDeviceToken = async () => {
        try {
            const token = await registerForPushNotificationAsync();
            console.log("TOKENNNN", token)
            await storeDeviceTokenInStorage(token);
            const response = await authService.storeUserDeviceToken(user.id, token);
            console.log(response.data);
            onTouchOutside();
            return;
        } catch (error) {
            toast.show('Something went wrong', {
                type: "danger",
                placement: "top"
            })
            console.log('Request Notification Component Error', error)
        }
    }

    return <AwesomeAlert
        show={visible}
        showProgress={false}
        title={"Notifications"}
        message={"Would you like to recieve Notifications?"}
        closeOnTouchOutside={false}
        loseOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
            onTouchOutside()
        }}
        onConfirmPressed={() => {
            saveDeviceToken()
        }}
    />
}