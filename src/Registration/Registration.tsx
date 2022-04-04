import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Header from '../Header/Header';
import logoBody from '../logo/logoBody.svg';
import './Registration.scss';

const Registration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDubl, setPasswordDubl] = useState('');
  const [loginChecked, setValidChecked] = useState(true);
  const [passwordChecked, setPasswordChecked] = useState(true);
  const [errorRegistration, setErrorRegistration] = useState<boolean>(false);
  const loginValid = /^[0-9A-Za-z]{6,}$/;
  const passwordValid = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleClose = () => {
    setErrorRegistration(false);
  };

  const changeRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (store.isErrors === 'Пользователь с таким логином уже существует') {
      setErrorRegistration(true);
    } else {
      setErrorRegistration(false);
    }
    loginValid.test(login) ? setValidChecked(true) : setValidChecked(false);
    passwordValid.test(password)
      ? setPasswordChecked(true)
      : setPasswordChecked(false);
    if (loginChecked && passwordChecked) {
      store.registration(login, password);
      navigate('/reception');
    }
  };

  return (
    <>
      <Header>
        <h1>Зарегистрироваться в системе</h1>
        <Snackbar
          open={errorRegistration}
          onClose={handleClose}
          message={'Такой пользователь уже зарегистрирован'}
        />
      </Header>
      <div className='registration'>
        <div className='main'>
          <img src={logoBody} alt='Упс'></img>
          <div className='div-right'>
            <form onSubmit={changeRegistration}>
              <h1>Регистрация</h1>
              <label>Login</label>
              <input
                placeholder='Login'
                onChange={(e) => setLogin(e.target.value)}
              ></input>
              {loginChecked ? (
                ''
              ) : (
                <p className='error'>Введите корректный логин</p>
              )}
              <label>Password:</label>
              <input
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {passwordChecked ? (
                ''
              ) : (
                <p className='error'>Введите корректный пароль</p>
              )}
              <label>Repeat password:</label>
              <input
                placeholder='Repeat password'
                onChange={(e) => setPasswordDubl(e.target.value)}
              ></input>
              {password && passwordDubl && password !== passwordDubl ? (
                <p className='error'>Пароли не совпадают</p>
              ) : (
                ''
              )}
              <div className='button'>
                <button>Зарегистрироваться</button>
              </div>
              <Link to='/authorization'>
                <p onClick={() => store.changeRegistration()}>
                  Авторизироваться
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Registration);
