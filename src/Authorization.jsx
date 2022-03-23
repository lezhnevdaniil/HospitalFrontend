import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import jwt from "jsonwebtoken";
import Header from './Header';
import logoBody from './logo/logoBody.svg'
import './Authorization.scss';

const key = 'secret'

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const inputClick = async (req, res) => {
  //   await axios
  //     .post("http://localhost:8000/login", {
  //       login,
  //       password,
  //     })
  //     .then((result) => {
  //       const token = jwt.sign({ user_id: result.data._id }, key, {
  //         expiresIn: "8h",
  //       });
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("user_id", result.data._id);
  //     })
  //     .then((result) => navigate("/reception"))
  //     .catch((e) => {
  //       if (e.response.status === 401) {
  //         console.log('введены некорректные данные');
  //       }
  //       if (e.response.status === 402) {
  //         alert('неверный пароль');
  //       }
  //       if (e.response.status === 404) {
  //         alert('такого пользователя не существует');
  //       }
  //     });
  // };
  return (
    <>
      <Header>
        <h1>Войти в систему</h1>
      </Header>
      <div className='authorization'>
        <div className='main'>
          <img src={logoBody} alt='Упс'></img>
          <div className='div-right'>
            <form>      
              <h1>Войти в систему</h1>
              <label>Login</label>
              <input type="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder='Login'>
              </input>
              <label>Password:</label>
              <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'>
              </input>
              <div className='button'>              
              <button>Войти</button>
              </div>
              <Link to='/registration'><p>Зарегистрироваться</p></Link>
            </form>   
          </div>
        </div>
      </div>
    </>
  );
}

export default Authorization;
