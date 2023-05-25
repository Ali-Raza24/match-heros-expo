import ApiService from "./ApiService";
import axios from "axios";


export default class BookingService extends ApiService {

  getHoursForTheDay(pitchId, date) {
    return axios.post(this.baseUrl + `booking/${pitchId}`, {date});
  }

  async bookPitch(pitchId, bookings) {
    return axios.post(this.baseUrl + `pitches/${pitchId}/bookings`, {bookings});
  }

  getUserBookings(userId) {
    return axios.get(this.baseUrl + `users/${userId}/bookings`);
  }

  async getUserBlockBookings() {
    return axios.get(this.baseUrl + 'block-booking/my-bookings');
  }

  async getNextPageUserBookings(link) {
    return axios.get(link);
  }

  async syncBookingWithGame(bookingId, gameId) {
    return axios.post(this.baseUrl + `bookings/${bookingId}/games/${gameId}/sync`);
  }

  async createBlockBooking(data) {
    return axios.post(this.baseUrl + 'block-booking', data)
  }


  async editBlockBooking(data, bookingId) {
    return axios.patch(`${this.baseUrl}block-booking/${bookingId}`);
  }

  async cancelBlockBooking(bookingId) {
    return axios.delete(`${this.baseUrl}block-booking/${bookingId}`);
  }

  async getSingleBlockBooking(bookingId) {
    return axios.get(this.baseUrl + `block-booking/${bookingId}`)
  }


}
