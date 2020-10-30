import React from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator} from './PodLandingPage.style';
import logo from '../../../img/logo.png';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from "react-router-dom";
import Header from "./Header";



class PodLandingPage extends React.Component {
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
export default withRouter(PodLandingPage);