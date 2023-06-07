import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class ApiService {
  constructor() {
    // this.baseUrl = "https://fiveaside.eu/api/"
    // For GennyMotion
    this.baseUrl = "http://63.33.237.96/api/";
    // this.baseUrl = "http://63.33.237.96/api/"
    // For EXPO Go
    // this.baseUrl = "https://b7bb-182-180-119-249.ap.ngrok.io/api/"
    // For Android Emulator
    // this.baseUrl = "http://10.0.2.2:8000/api/"
    // this.baseUrl = "10.0.2.2/fiveaside-api-master/public/api/"

    // Set default axios headers so we dont need to pass {headers} to each API request
    this._getToken().then((token) => {
      this.setDefaultHeaders();
    });
    this.setDefaultHeaders();
  }

  async setDefaultHeaders(authToken) {
    let token = null;
    if (!authToken) {
      token = await this._getToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }

  async _getAuthHeader() {
    const token = await this._getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async _getToken() {
    return await AsyncStorage.getItem("userToken");
  }

  async checkGDPR(userId) {
    let gdprString = await AsyncStorage.getItem("GDPR");
    let gdpr = JSON.parse(gdprString);
    return gdpr && gdpr[userId] === true;
  }

  async removeGDPR() {
    return await AsyncStorage.removeItem("GDPR");
  }

  async setGDPR(userId) {
    let gdprString = await AsyncStorage.getItem("GDPR");
    let gdpr = JSON.parse(gdprString) || {};
    gdpr[userId] = true;
    await AsyncStorage.setItem("GDPR", JSON.stringify(gdpr));
  }
}
