import ApiService from "./ApiService";
import axios from "axios";

export default class ChatService extends ApiService {
  async sendMessage(lobbyId, message) {
    return axios.post(this.baseUrl + `send-message/${lobbyId}`, { message });
  }
}