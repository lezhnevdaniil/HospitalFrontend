import api from '../http/index';

export default class UserService {
  static async ActionGetAppointments() {
    return api.get(`/allAppoints?token=${localStorage.getItem('token')}`);
  }
}
