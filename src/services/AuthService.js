import ApiService from "./ApiService";
import axios from "axios";
import { AsyncStorage } from "react-native";
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
    return !!(await this._getToken());
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
    console.log("data in AuthServices API call#@#@#", data);
    let formData = this.makeFormData(data);
    return axios
      .post(this.baseUrl + "profile", formData)
      .then((res) => res.data)
      .then((user) => {
        this.updateSingletonUser(user);
        // AuthService.discardUser();
        return user;
      });
  }

  makeFormData(data) {
    const formData = new FormData();
    // let myDate = data.dob.split("/");
    // let formatDate = myDate[2] + "-" + myDate[1] + "-" + myDate[0];
    console.log("12-12-2022");
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data?.avatarObject) {
      formData.append("avatar_image", {
        uri: data.avatarObject.uri,
        name: data.avatarObject.fileName,
        type: data.avatarObject.type,
      });
    }
    // if (data.coverObject) {
    //   formData.append("cover_image", { uri: data.coverObject.uri, name: data.coverObject.fileName, type: data.coverObject.type });
    // }
    formData.append("cover", data?.cover || null);
    formData.append("dob", "12-12-2022");
    formData.append("city_id", data?.city_id || "LHR");
    formData.append("_method", "PATCH");
    return formData;
  }

  updateSingletonUser(user) {
    AuthService.authData.user = user;
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
