import ApiService from "./ApiService";
import axios from "axios";


export default class VenueService extends ApiService {
  //index
  getVenues(params = null) {
    return axios.get(this.baseUrl + `venues`, {params})
      .then(response => response.data);
  }

  getNextVenues(link) {
    return axios.get(link)
      .then(response => response.data);
  }

  getCityVenues(cityId) {
    return axios.get(this.baseUrl + `cities/${cityId}/venues`);
  }

  getVenuePitches(venueId) {
    return axios.get(this.baseUrl + `venues/${venueId}/pitches`);
  }

  async getVenue(id) {
    return axios.get(this.baseUrl + "venues/" + id)
      .then(response => response.data);
  }
  async getSearchedVenueList(data){
    return axios.get(this.baseUrl + `venues?page=1&venue=${data?.venue}&address=${data?.address}&open_time=${data?.open_time}&close_time=${data?.close_time}`)
      .then(response => response.data);
  }
}
