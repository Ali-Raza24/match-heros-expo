import ApiService from "./ApiService";
import axios from "axios";

export default class TeamService extends ApiService {
  create(data) {
    let formData = this.makeFormData(data);
    return axios.post(this.baseUrl + "teams", formData);
  }

  async update(data) {
    let formData = this.makeFormData(data);
    formData.append("_method", "PATCH");
    return axios.post(this.baseUrl + `teams/${data.teamId}`, formData);
  }

  async delete(teamId) {
    return axios.delete(this.baseUrl + `teams/${teamId}`);
  }

  getTeams(params = null) {
    return axios
      .get(this.baseUrl + "teams", { params })
      .then((response) => response.data.data);
  }

  getTeamsNoPagination() {
    return axios.get(this.baseUrl + "all-teams");
  }

  getAllTeams(params = null) {
    return axios.get(this.baseUrl + "teams", { params });
  }

  getNextTeams(link) {
    return axios.get(link).then((response) => response.data);
  }

  async getTeam(id) {
    return axios
      .get(this.baseUrl + "teams/" + id)
      .then((response) => response.data);
  }

  async getUserTeams(user) {
    return axios
      .get(this.baseUrl + `users/${user}/teams`)
      .then((response) => response.data);
  }

  makeFormData(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("cover", data.cover);
    data.logo_image
      ? formData.append("logo_image", {
          uri: data.logo_image.uri,
          name: data.logo_image.fileName,
          type: data.logo_image.type,
        })
      : null;
    formData.append("city_id", data.city_id);
    formData.append("user_id", data.user_id);
    formData.append("phone", data.phone);
    return formData;
  }

  async setCaptain(teamId, playerId) {
    return axios
      .post(this.baseUrl + `teams/${teamId}/users/${playerId}/captain`, null)
      .then((res) => res.data);
  }

  async sendInvitations(teamId, invitations) {
    return axios.post(this.baseUrl + `teams/${teamId}/invite`, {
      player_ids: invitations,
    });
  }

  async getTeamGames(teamId) {
    return axios
      .get(this.baseUrl + `teams/${teamId}/games`)
      .then((game) => game.data);
  }

  async getStatistic(teamId) {
    return axios.get(this.baseUrl + `teams/${teamId}/stats`);
  }

  async playerJoinToTeam(teamId) {
    return axios.post(this.baseUrl + `teams/${teamId}/join`, null);
  }

  async TeamJoinRequests(teamId) {
    return axios
      .get(this.baseUrl + `teams/${teamId}/requests`)
      .then((res) => res.data);
  }

  async removePlayerFromTeam(teamId, playerId) {
    return axios.post(this.baseUrl + `teams/${teamId}/remove-player`, {
      id: playerId,
    });
  }

  async getPendingInvites(teamId) {
    return axios.get(this.baseUrl + `teams/${teamId}/invitations`);
  }

  async acceptPlayerJoinRequest(teamId, joinRequestId, userId) {
    return axios
      .post(
        this.baseUrl + `teams/${teamId}/invitations/${joinRequestId}/accept`,
        { id: userId }
      )
      .then((res) => res.data);
  }

  async declinePlayerJoinRequest(teamId, joinRequestId) {
    return axios.post(
      this.baseUrl + `teams/${teamId}/invitations/${joinRequestId}/decline`,
      null
    );
  }

  async updateTeamPlayers(teamId, players) {
    return axios.post(this.baseUrl + `teams/${teamId}/update-players`, players);
  }

  async acceptTeamInvitation(inviteId) {
    return axios.post(
      this.baseUrl + `teams/team-game-invitations/${inviteId}/accept`
    );
  }

  async declineTeamInvitation(inviteId) {
    const headers = await this._getAuthHeader();
    return axios.post(
      this.baseUrl + `teams/team-game-invitations/${inviteId}/decline`
    );
  }
}
