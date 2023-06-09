import ApiService from "./ApiService";
import axios from "axios";

export default class PlayerService extends ApiService {
  async getPlayers(params = null) {
    return axios.get(this.baseUrl + "players/", { params });
  }

  getAllPlayers(params = null) {
    return axios.get(this.baseUrl + "players/", { params });
  }
  async searchPlayers(data) {
    console.log("data for search players", data);
    return axios.post(this.baseUrl + `hero-search`, data);
  }
  async getNearbyPlayers() {
    return axios.get(this.baseUrl + `players/nearby`);
  }

  async getNextPlayers(link) {
    return axios.get(link).then((response) => response.data);
  }

  async getPlayer(id) {
    return axios
      .get(this.baseUrl + "profile/" + id)
      .then((response) => response.data);
  }

  async getPlayerDeviceToken(id) {
    return axios.get(this.baseUrl + "player-token/" + id);
  }

  async getPlayerInvitations() {
    //team invitations
    return axios.get(this.baseUrl + `invitations`);
  }

  async acceptTeamInvitation(inviteId) {
    return axios.post(this.baseUrl + `invitations/${inviteId}/accept`, null);
  }

  async declineTeamInvitation(inviteId) {
    return axios.post(this.baseUrl + `invitations/${inviteId}/decline`, null);
  }

  async acceptGameInvitation(inviteId, gameId) {
    return axios.post(this.baseUrl + `invitations/${inviteId}/accept`, null);
  }

  async declineGameInvitation(inviteId, gameId) {
    return axios.post(this.baseUrl + `invitations/${inviteId}/decline`, null);
  }

  async savePlayerAvailability(availabilities) {
    return axios.post(this.baseUrl + `store/player/availability`, {
      availibility: availabilities,
    });
  }
  async getPlayerAvailabilities() {
    return axios.get(this.baseUrl + `player/availability`);
  }

  async addPlayerAsTeammate(playerId) {
    return axios.post(this.baseUrl + `add/team-player`, {
      player_id: playerId,
    });
  }

  sentPlayerRequestStatus = async (playerId) => {
    return axios.get(this.baseUrl + `check/invited-player-status/${playerId}`);
  };
  async rejectRequestAddTeammmate(inviteId) {
    return axios.post(
      this.baseUrl + `reject/team-player-invitation/${inviteId}`
    );
  }

  async acceptRequestAddTeammmate(inviteId) {
    return axios.post(
      this.baseUrl + `accept/team-player-invitation/${inviteId}`
    );
  }
  async getAllTeammates() {
    return axios.get(this.baseUrl + `all/team-player`);
  }
}
