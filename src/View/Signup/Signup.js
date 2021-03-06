/**
 * The Signup component is composed by 
 * HeaderWrapper: Header
 * Body: the signup submission form
 * Footer
 * Author: Yujun Yan
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  BodyWrapper,
  HeaderWrapper,
  FooterWrapper,
  ImageWrapper,Seperator,BodyBG
} from './Signup.style';
import logo from '../../img/logo.png';
import Body from './Body';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';

const Signup = props => {
  return (
    <div>
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo} alt={"logo"}/>
          <Seperator/>
          <p>Sign Up</p>
        </ImageWrapper>
      </HeaderWrapper>
      <BodyBG>
        <Body/>
        </BodyBG>
      <Footer>footer</Footer>
    </div>
  );
};

Signup.propTypes = {};

export default withRouter(Signup);
