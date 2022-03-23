import {React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import logoBody from './logo/logoBody.svg'
import './Registration.scss';

const Registration = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDubl, setPasswordDubl] = useState('');
  const [loginChecked, setValidChecked] = useState(true);
  const [passwordChecked, setPasswordChecked] = useState(true);
  const loginValid = /^[0-9A-Za-z]{6,}$/;
  const passwordValid = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
  const navigate = useNavigate();
  let num = 0;

  const changeRegistration = (e) => {
    e.preventDefault();
    if (login) {
      num++
    } 
    if (password) {
      num++
    }
    if (passwordDubl) {
      num++
    }
    if (num < 3) {
      alert('Заполните все поля');
    }
    num = 0;
    loginValid.test(login) ? setValidChecked(true) : setValidChecked(false);
    passwordValid.test(password) ? setPasswordChecked(true) : setPasswordChecked(false);
    if (loginChecked && passwordChecked) {
      registrClick()
    }
  }

  const registrClick = async (req, res) => {
    await axios
      .post("http://localhost:8000/registration", {
        login,
        password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_id", result.data.user_id);
        // setLogin("");
        // setPassword("");
        // setPasswordDubl("");
        navigate("/reception");
      })
      .catch((e) => {
        // if (e.response.status === 401) {
        //  alert('такой пользователь уже существует');
        // }
        // if (e.response.status === 400) {
        //   alert('введены некорректные данные');
        // }
      });
  };
  return (
    <>
      <Header>
        <h1>Зарегистрироваться в системе</h1>
      </Header>
      <div className='registration'>
      <div className='main'>
        <img src={logoBody} alt='Упс'></img>
          <div className='div-right'>
            <form onSubmit={changeRegistration}>
              <h1>Регистрация</h1>
              <label>Login</label>
              <input placeholder='Login' onChange={(e) => setLogin(e.target.value)}></input>
              {loginChecked ? '' : <p className='error'>Введите корректный логин</p>}
              <label>Password:</label>
              <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
              {passwordChecked ? '' : <p className='error'>Введите корректный  пароль</p>}
              <label>Repeat password:</label>
              <input placeholder='Repeat password' onChange={(e) => setPasswordDubl(e.target.value)}></input>
              {password && passwordDubl && password !== passwordDubl ? <p className='error'>Пароли не совпадают</p> : '' }
              <div className='button'>              
                <button>Зарегистрироваться</button>
              </div>
              <Link to='/authorization'><p>Авторизироваться</p></Link>
            </form> 
          </div>
        </div>  
      </div>
    </>
  );
}

export default Registration;