import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import Authorization from './Authorization';
import Reception from './Reception';
import './App.scss';
import './Font.scss';

const App = () => {

  const token = localStorage.getItem("token");
  return ( 
    <Routes>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/authorization' element={<Authorization/>}/>
      <Route path='/reception' element={<Reception/>}/>
      <Route
        path="*"
        element={<Registration to="/" />}
      />
    </Routes>
  );
}

export default App;
