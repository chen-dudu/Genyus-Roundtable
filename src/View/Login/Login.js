/**
 * The Login component is composed by 
 * HeaderWrapper: Header
 * Body: the login submission form
 * Footer
 * Author: Yujun Yan
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  HeaderWrapper,
  ImageWrapper,Seperator,BodyBG
} from './Login.style';
import logo from '../../img/logo.png';
import Body from './Body'
import Footer from './Footer'

class Login extends React.Component {
  render(){
  return (
    <div>
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo} alt={"logo"}/>
          <Seperator/>
          <p>Log in</p>
        </ImageWrapper>
      </HeaderWrapper>
      <BodyBG>
        <Body/>
        </BodyBG>
      <Footer>footer</Footer>
    </div>
  );
  }
}

Login.propTypes = {};

export default withRouter(Login);
