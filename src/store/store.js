import { makeAutoObservable } from 'mobx';
import AuthServise from '../services/AuthService';
import axios from 'axios';
import { API_URL } from '../http/index';

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  isReg = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
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
      console.log('1488', response.data)
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('login', login);
      
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(login, password) {
    try {
      
      const response = await AuthServise.registration(login, password);
      console.log('1111', response.data)
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('login', login);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert(`Пользователь с таким логином уже существует ${login}`);
    }
  }

  async logout() {
    try {
      const response = await AuthServise.logout();

      localStorage.removeItem('token');
      localStorage.removeItem('login');
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
      console.log(' sddsdsdsd', this.isAuth);
    } catch (e) {
      console.log(e);
      console.log(' sddsdsdsd', this.isAuth);
    } finally {
      this.setLoading(false);
    }
  }
}
