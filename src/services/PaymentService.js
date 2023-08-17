import ApiService from "./ApiService";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  async postPayment(data) {
    return axios.post(`${this.baseUrl}deposit`, data);
  }
  async cashOutPayment(data) {
    // const modifyFormData = await this.makeFormData(data);
    const token = await AsyncStorage.getItem("userToken");
    return axios.post(`${this.baseUrl}withdraw-money`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  makeFormData(data) {
    const formData = new FormData();
    // for (const [key, value] of Object.entries(data)) {
    //   formData.append(`${key}: ${value}`);
    // }
    formData.append("full_name", data.full_name);
    formData.append("iban", data.iban);
    formData.append("phone_number", data?.phone_number);
    formData.append("withdraw_amount", data?.withdraw_amount);
    // formData.append("minOponentAge", Number(data?.minOponentAge));
    // formData.append("maxOponentAge", Number(data?.maxOponentAge));
    // formData.append("_method", "PATCH");
    return formData;
  }
  async paymentRequest(data) {
    return axios.post(`${this.baseUrl}send-payment-request`, data);
  }
  async getUserBalance() {
    const token = await AsyncStorage.getItem("userToken");
    return axios.get(`${this.baseUrl}available-amount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async tranferPaymentToPlayer(data) {
    const token = await AsyncStorage.getItem("userToken");
    return axios.post(`${this.baseUrl}transfer-money`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
