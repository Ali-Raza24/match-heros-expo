import axios from "axios";

export const sendPushNotification = async (
  expoPushToken,
  title,
  body,
  data
) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data,
  };
  try {
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      [message],
      {
        headers: {
          "Accept-encoding": "gzip, deflate",
          Authorization: "Bearer Bh6NSXXQbpK7zc7eqK-LwVcPe0-awxZGSFyoCyqD",
        },
      }
    );
    console.log("DATA AFTER SENDING NOTIFICATION", response.data);
  } catch (error) {
    console.log("Notification Send Error", error?.response);
  }
};
