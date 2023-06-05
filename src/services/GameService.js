import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiService from "./ApiService";
import axios from "axios";

export default class GameService extends ApiService {
  async getGames(params = null) {
    return axios
      .get(this.baseUrl + "games", { params })
      .then((response) => response.data);
  }

  async getNextGames(link) {
    return axios.get(link).then((response) => response.data);
  }

  getNearbyGames() {
    return axios.get(this.baseUrl + "games/nearby");
  }

  async deleteGame(gameId) {
    return axios.delete(this.baseUrl + `games/${gameId}`);
  }

  async removePlayerFromGame(gameId, playerId) {
    return axios.post(`${this.baseUrl}games/${gameId}/remove-player`, {
      id: playerId,
    });
  }

  async create(data) {
    return axios.post(this.baseUrl + "games", data);
  }

  async edit(data) {
    return axios.patch(this.baseUrl + `games/${data.id}`, data);
  }

  getUserGames(user_id) {
    console.log("user id is:#@#@", user_id);
    return axios.get(this.baseUrl + `users/${user_id}/latest-games`);
  }

  async getGame(gameId) {
    return axios
      .get(this.baseUrl + `games/${gameId}`)
      .then((response) => response.data);
  }
  async gameReport(data) {
    const token = await AsyncStorage.getItem("userToken");
    return axios
      .post(`https://match-heros.isoft-tech.com/api/report-game`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("response report game api is:#@#@#", res?.data);
        return res?.data;
      });
  }
  async getGameInvitedPlayers(gameId) {
    const response = await axios.get(
      this.baseUrl + `games/${gameId}/invited-players`
    );
    return response.data;
  }

  getStats(gameId) {
    return axios.get(this.baseUrl + `games/${gameId}/stats`);
  }

  setStats(gameId, data) {
    return axios.post(this.baseUrl + `games/${gameId}/stats`, data);
  }

  makeData(data) {
    let dataForCreate = {};
    if (data.gameType == 2) {
      dataForCreate.home_id = data.home;
      dataForCreate.away_id = data.away;
    }
    dataForCreate.pitch_id = data.pitch_id;
    dataForCreate.type_id = data.gameType;
    dataForCreate.creator_id = data.user_id;
    dataForCreate.starts_at = data.chosenDate;
    dataForCreate.duration = data.gameDuration;
    return dataForCreate;
  }

  async playerJoinToGame(gameId) {
    return axios.post(this.baseUrl + `games/${gameId}/join`, null);
  }

  async gameJoinRequests(gameId) {
    return axios
      .get(this.baseUrl + `games/${gameId}/requests`)
      .then((response) => {
        return response.data.join_requests;
      })
      .then((joinRequests) =>
        joinRequests.filter((j) => j.status == "pending")
      );
  }

  async gameInvitations(gameId) {
    return axios
      .get(this.baseUrl + `games/${gameId}/requests`)
      .then((response) => response.data.invitations);
  }

  async acceptJoinRequest(gameId, joinRequestId, playerId) {
    return axios.post(
      this.baseUrl + `games/${gameId}/invitations/${joinRequestId}/accept`,
      { id: playerId }
    );
  }

  async declineJoinRequest(gameId, joinRequestId) {
    return axios.post(
      this.baseUrl + `games/${gameId}/invitations/${joinRequestId}/decline`,
      null,
      {
        headers: this._getAuthHeader(),
      }
    );
  }

  async invitePlayersToGame(gameId, data) {
    return axios.post(this.baseUrl + `games/${gameId}/invitations`, data);
  }

  async confirmedInvitedPlayers(gameId) {
    return axios.get(
      this.baseUrl + `games/${gameId}/confirmed-invited-players`
    );
  }
  async searchGame(data) {
    console.log("data for search players", data);
    return axios.post(this.baseUrl + `game-search`, data);
  }
  async gameOn(gameId) {
    return axios.post(this.baseUrl + `games/confirmGame/${gameId}`);
  }

  async switchGamePlayerTeam(gameId, playerId) {
    return axios.post(this.baseUrl + `games/${gameId}/change-player-team`, {
      id: playerId,
    });
  }

  async getGameJoinInvitationRequests(gameId) {
    return axios.get(`${this.baseUrl}games/${gameId}/request-invited-players`);
  }
}
