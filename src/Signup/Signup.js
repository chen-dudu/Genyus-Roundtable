import React from 'react';
import PropTypes from 'prop-types';
import {
  BodyWrapper,
  HeaderWrapper,
  FooterWrapper,
  ImageWrapper,Seperator,BodyBG
} from './Signup.style';
import logo from '../img/logo.png';
import Body from './Body';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';

const Signup = props => {
  return (
    <div>
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo}></img>
          <Seperator></Seperator>
          <p>Sign Up</p>
        </ImageWrapper>
      </HeaderWrapper>
      <BodyBG>
        <Body></Body>
        </BodyBG>
      <Footer>footer</Footer>
    </div>
  );
};

Signup.propTypes = {};

export default withRouter(Signup);
