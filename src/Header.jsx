import React from 'react';
import logoHeader from './logo/logoHeader.svg';
import './Header.scss';

const Header = ({children}) => {
  return (
    <header>
      <div className='header'>
      <img src={logoHeader} alt='Упс'></img>
        {children}
      </div>
    </header>
  );
}

export default Header;
