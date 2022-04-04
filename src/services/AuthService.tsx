import api from '../http/index';

export default class AuthServise {
  static async login(login: string, password: string) {
    return api.post('/login', { login, password });
  }

  static async registration(login: string, password: string) {
    return api.post('/registration', { login, password });
  }

  static async logout() {
    return api.post('/logout', {});
  }
}
