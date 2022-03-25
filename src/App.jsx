import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import Registration from './Registration';
import Authorization from './Authorization';
import Reception from './Reception';
import './App.scss';
import './Font.scss';

const App = () => {

  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);
  
  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!store.isAuth) {
    if (!store.isReg) {
      return <Authorization />;
    } else {
      return <Registration />;
    }
  }
  return ( 
    <Routes>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/authorization' element={<Authorization/>}/>
      <Route path='/reception' element={<Reception/>}/>
      <Route
        path='*'
        element={<Registration to='/' />}
      />
    </Routes>
  );
}

export default observer(App);
