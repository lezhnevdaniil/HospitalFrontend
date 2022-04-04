import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Context } from '../index';
import Header from '../Header/Header';
import logoBody from '../logo/logoBody.svg';
import './Authorization.scss';

const Authorization = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [allField, setAllField] = useState<string>();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleClose = () => {
    setErrorLogin(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/reception');
  }, []);

  const onClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password && login) {
      const re = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/;
      if (re.test(password) && login.length > 5) {
        store.login(login, password);
        if (store.isErrors === 'Такого пользователя не существует') {
          setAllField('Такого пользователя не существует');
          setErrorLogin(true);
        } else {
          setErrorLogin(false);
        }
      } else {
        setErrorLogin(true);
        setAllField('Не правильный логин или пароль');
      }
    } else {
      setAllField('Заполните все поля!');
      setErrorLogin(true);
    }
  };

  return (
    <>
      <Header>
        <h1>Войти в систему</h1>
        <Snackbar open={errorLogin} onClose={handleClose} message={allField} />
      </Header>
      <div className='authorization'>
        <div className='main'>
          <img src={logoBody} alt='Упс'></img>
          <div className='div-right'>
            <form onSubmit={onClick}>
              <h1>Войти в систему</h1>
              <label>Login</label>
              <input
                type='login'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder='Login'
              ></input>
              <label>Password:</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              ></input>
              <div className='button'>
                <button>Войти</button>
              </div>
              <Link to='/registration'>
                <p onClick={() => store.changeRegistration()}>
                  Зарегистрироваться
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorization;
