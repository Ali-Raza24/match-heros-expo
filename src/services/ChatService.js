import ApiService from "./ApiService";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class ChatService extends ApiService {
  async sendMessage(data) {
    const token = await AsyncStorage.getItem("userToken");
    return axios.post(this.baseUrl + `messages`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getMessage(receiver_id) {
    const token = await AsyncStorage.getItem("userToken");
    return axios.get(this.baseUrl + `messages?receiver_id=${receiver_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
