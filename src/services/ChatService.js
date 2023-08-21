import ApiService from "./ApiService";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class ChatService extends ApiService {
  async sendMessage(data) {
    const token = await AsyncStorage.getItem("userToken");
    return axios.post(this.baseUrl + `send-messages`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getMessage(receiver_id) {
    console.log("receiver_id is in chatServices", receiver_id);
    const token = await AsyncStorage.getItem("userToken");
    return axios.get(this.baseUrl + `get-messages?receiver_id=${receiver_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
