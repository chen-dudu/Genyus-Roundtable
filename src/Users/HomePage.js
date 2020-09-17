import React from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator,LogoutWrapper,LogoutButton} from './HomePage.style';
import logo from '../img/logo.png';
// import pic1 from '../img/1.jpg';
import Footer from './Footer.js';
import Body from './Body.js';

class Header extends React.Component {
  render(){
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <div>
          <img src={logo}></img>
          </div>
        </ImageWrapper>
        <LogoutWrapper>
          <div>
          {/* <img src={pic1}></img> */}
          <br/><br/>
          <LogoutButton>Logout</LogoutButton>
          </div>
        </LogoutWrapper>
        <br></br> <br></br> <br></br>
        <br></br> <br></br> <br></br>
        <br></br> 
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