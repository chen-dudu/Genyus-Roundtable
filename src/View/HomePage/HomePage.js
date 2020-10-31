import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator} from './HomePage.style';
import logo from '../../img/logo.png';
import Footer from './Footer.js';
import Body from './Body.js';
import { withRouter } from 'react-router-dom';

/**
 *@Description: a react component that renders the header of the homepage
 */

class Header extends React.Component {
    /**
     * render the JSX elements
     * @returns {JSX.Element} including the left, middle and right part of the footer, which are three images
     */
  render(){
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo}/>
        </ImageWrapper>
        <Seperator/>
      </HeaderWrapper>
      
    );
  }
}

/**
 *@Description: a react component that renders the homepage
 */

class HomePage extends React.Component {
    /**
     * render the JSX elements
     * @returns {JSX.Element} including the header, the body and the footer
     */
  render(){
    return(
      <container>
        <Header/>
        <Body/>
        <Footer/>
      </container>
    )
  }
}

// ========================================
export default withRouter(HomePage);