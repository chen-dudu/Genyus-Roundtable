import React from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator} from './HomePage.style';
import logo from '../img/logo.png';
import Footer from './Footer.js';
import Body from './Body.js';

class Header extends React.Component {
  render(){
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo}></img>
        </ImageWrapper>
        <Seperator></Seperator>       
      </HeaderWrapper>
      
    );
  }
}

class HomePage extends React.Component {
  render(){
    return(
      <container>
        <Header></Header>
        <Body></Body>  
        <Footer></Footer>
      </container>
    )
  }
}

// ========================================
export default HomePage;