import ApiService from "./ApiService";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Subject } from "rxjs";
// import { LoginManager } from "react-native-fbsdk";
// import moment from "moment";

export default class AuthService extends ApiService {
  static authData = undefined;
  static user = undefined;
  static user$ = new Subject();
  static tokens = undefined;
  static tokens$ = new Subject();

  async get() {
    return axios.get(this.baseUrl + "auth/user");
  }

  register(data) {
    console.log("in auth services post register data is:#@#", data);
    return axios.post(this.baseUrl + "auth/register", data);
  }

  login(data) {
    return axios.post(this.baseUrl + "auth/login", data);
  }

  socialLogin(accessToken, provider, deviceToken, deviceType) {
    return axios.get(
      this.baseUrl + `auth/login/${provider}?access_token=${accessToken}`
    );
  }

  setDeviceToken(deviceType, deviceToken) {
    const data = {
      device_type: deviceType,
      device_token: deviceToken,
    };
    console.log("set device token", data);
    return axios.post(this.baseUrl + "auth/device_token", data);
  }

  async logOut() {
    return axios.get(this.baseUrl + "auth/logout");
  }

  async isLogged() {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token is is loggedIn function#@#@", token?.length > 5);
    return token?.length > 5;
  }

  async clearStorage() {
    await AsyncStorage.clear();
  }

  async getAuthData() {
    if (this.hasAuthData()) {
      return Promise.resolve(AuthService.authData);
    }
    return axios
      .get(this.baseUrl + "auth/user")
      .then((response) => response.data)
      .then((authData) => (AuthService.authData = authData));
  }

  getUser() {
    return this.getAuthData().then((authData) => authData.user);
  }

  getUserNotifications() {
    return this.getAuthData().then((authData) => authData.notifications);
  }

  getUserId() {
    return this.getUser().then((user) => user.id);
  }

  async _setToken(token) {
    await AsyncStorage.setItem("userToken", token);
  }

  async _removeToken() {
    return await AsyncStorage.removeItem("userToken");
  }

  hasUser() {
    return !!AuthService.user;
  }

  hasAuthData() {
    return !!AuthService.authData;
  }

  addNotification(notification) {
    AuthService.authData.notifications.push(notification);
  }

  setNotificationToRead(id) {
    return axios.patch(this.baseUrl + `notifications/${id}`, {});
  }

  changeAuthNotifications(notification) {
    var index = AuthService.authData.notifications.findIndex(
      (n) => n.id == notification.id
    );
    AuthService.authData.notifications[index] = notification;
  }

  userChanged() {
    return AuthService.user$;
  }

  async update(data) {
    let formData = this.makeFormData(data);

    const token = await AsyncStorage.getItem("userToken");
    return axios
      .post(`https://match-heroes.shehbazahmed.com/api/profile`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.updateSingletonUser(res?.data);
        return res?.data;
      });
    // .then((user) => {

    //   // AuthService.discardUser();
    //   console.log("user in response is:#@#@#@#", user);
    //   return user;
    // });
  }
  async postAvailability(data) {
    const token = await AsyncStorage.getItem("userToken");
    return axios
      .post(`https://match-heros.isoft-tech.com/api/avalibility`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response availability api is:#@#@#", res?.data);
        return res?.data;
      });
  }
  makeFormData(data) {
    const formData = new FormData();
    // let myDate = data.dob.split("/");
    // let formatDate = myDate[2] + "-" + myDate[1] + "-" + myDate[0];
    console.log("12-12-2022");
    formData.append("name", data.name);
    formData.append("email", data.email);
    // if (data?.avatarObject) {
    //   formData.append("avatar_image", {
    //     uri: data.avatarObject.assets[0].uri,
    //     name: data.avatarObject.fileName,
    //     type: "image/jpeg",
    //   });
    // }
    formData.append("city", data?.city_id);
    formData.append("county", data?.county_id);
    formData.append("minOponentAge", Number(data?.minimum_age));
    formData.append("maxOponentAge", Number(data?.maximum_age));
    formData.append("_method", "PATCH");
    return formData;
  }

  updateSingletonUser(user) {
    AuthService.user = user;
    AuthService.user$.next(user);
  }

  static addTeamToUser(team) {
    AuthService.authData.user.teams.push(team);
    AuthService.user$.next(AuthService.authData.user);
  }

  async getUserTokens(userId) {
    // console.log(axios.defaults.headers);
    return axios.get(this.baseUrl + `users/${userId}/tokens`);
  }

  async storeUserDeviceToken(userId, token) {
    console.log(
      "DATA",
      JSON.stringify({
        user_id: userId,
        token,
      })
    );
    const response = await axios.post(this.baseUrl + "store-token", {
      user_id: userId,
      token,
    });

    return response;
  }

  updateUserTokens(tokens) {
    AuthService.tokens = tokens;
    AuthService.tokens$.next(tokens);
  }

  tokensChanged() {
    return AuthService.tokens$;
  }

  async transferTokens(player, amount) {
    return axios.post(this.baseUrl + `transfer-tokens`, { player, amount });
  }

  resetPasswordEmail(data) {
    return axios.post(this.baseUrl + "reset-password/email", data);
  }

  // NOT WORKING !!!!
  async getUserTransactions() {
    return this.getUserId().then((userId) =>
      axios
        .get(`${this.baseUrl}users/${userId}/transactions`)
        .then((response) => {
          return response;
        })
    );
  }
}
