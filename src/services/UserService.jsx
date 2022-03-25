import api from '../http/index';

export default class UserService {
  static async ActionGetAppointments() {
    return api.get(`/allAppoints?user_id=${localStorage.getItem('user_id')}`);
  }
}
