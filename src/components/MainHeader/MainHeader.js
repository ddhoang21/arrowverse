import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/images/JW-logo.png';

const MainHeader = () => {
  return (
    <div>
      <Navbar sticky='top' variant='dark' expand='lg' id='navigationBar'>
        <Navbar.Brand>
          <img
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
          Jeremy Wilson & Associates
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default MainHeader;
