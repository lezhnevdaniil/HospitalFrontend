import { makeAutoObservable } from 'mobx';
import AuthServise from '../services/AuthService';
import axios from 'axios';
import { API_URL } from '../http/index';

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  isReg = false;
  isErrors = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setErrors(error) {
    this.isErrors = error;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }
  setReg(bool) {
    this.isReg = bool;
  }
  async changeRegistration() {
    this.setReg(!this.isReg);
  }

  async login(login, password) {
    try {
      const response = await AuthServise.login(login, password);
      localStorage.setItem('token', response.data.accessToken);

      this.setAuth(true);
      this.setUser(response.data.user);
      this.setErrors(false);
    } catch (e) {
      this.setErrors('Такого пользователя не существует');
    }
  }

  async registration(login, password) {
    try {
      const response = await AuthServise.registration(login, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setErrors(false);
    } catch (e) {
      this.setErrors('Пользователь с таким логином уже существует');
    }
  }

  async logout() {
    try {
      const response = await AuthServise.logout();

      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
