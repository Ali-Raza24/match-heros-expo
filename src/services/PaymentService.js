import ApiService from "./ApiService";
import axios from "axios";

export default class PaymentService extends ApiService {
  async executePayment(token, amount) {
    return axios.post(`${this.baseUrl}charge`, { token, amount });
  }

  async charge(data) {
    return axios.post(`${this.baseUrl}pay`, { data });
  }

  async getTokenPrice() {
    return axios.get(`${this.baseUrl}token-price`);
  }
}
