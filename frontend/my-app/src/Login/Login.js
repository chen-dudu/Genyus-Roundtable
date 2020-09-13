import React from 'react';
import PropTypes from 'prop-types';
import {
  BodyWrapper,
  HeaderWrapper,
  FooterWrapper,
  ImageWrapper,Seperator,BodyBG
} from './Login.style';
import logo from '../img/logo.png';
import {Body} from './Body'
import Footer from './Footer'

const Login = props => {
  return (
    <div>
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo}></img>
          <Seperator></Seperator>
          <p>Log in</p>
        </ImageWrapper>
      </HeaderWrapper>
      <BodyBG>
        <Body></Body>
        </BodyBG>
      <Footer>footer</Footer>
    </div>
  );
};

Login.propTypes = {};

export default Login;
