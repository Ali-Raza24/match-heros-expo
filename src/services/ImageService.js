import config from "../../config";
import axios from "axios";

export default class ImageService {
  constructor() {
    this.teamImagesUrl = config.TEAM_IMAGES_URL;
    this.coverImagesUrl = config.COVER_IMAGES_URL;
    this.profileImagesUrl = config.PROFILE_IMAGES_URL;
    this.venueImageUrl = config.VENUE_IMAGES_URL;
    this.baseUrl = config.ROOT_URL;
  }

  getPlayerAvatarUri(imageUrl, playerid) {
    const avatar = require("../../assets/image/default_avatar.jpg");
    console.log(
      "image url is:#@#@#",
      `${this.profileImagesUrl}${playerid}/${imageUrl}`
    );
    return imageUrl
      ? { uri: `${this.profileImagesUrl}${playerid}/${imageUrl}` }
      : avatar;
  }

  getCoverImages() {
    return axios.get(this.baseUrl + "cover-images");
  }

  getCoverUri(imageName) {
    return { uri: `${this.coverImagesUrl}${imageName}` };
  }

  getPlayerCoverUri(imageUrl, playerid) {
    const cover = require("../../assets/image/events-background.jpg");
    return imageUrl
      ? { uri: `${this.profileImagesUrl}${playerid}/${imageUrl}` }
      : cover;
  }

  getTeamUriImage(teamId, logoImageName) {
    const logo = require("../../assets/image/betaLogo.png");
    return logoImageName
      ? { uri: `${this.teamImagesUrl}${teamId}/${logoImageName}` }
      : logo;
  }

  getVenueUri(venueId, imageUrl) {
    const defaultImage = require("../../assets/image/defaultVenue.jpg");
    return imageUrl
      ? { uri: `${this.venueImageUrl}${venueId}/${imageUrl}` }
      : defaultImage;
  }
}
