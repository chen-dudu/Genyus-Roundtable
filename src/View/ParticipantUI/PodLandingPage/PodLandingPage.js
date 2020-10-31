import React from 'react';

import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from "react-router-dom";
import Header from "./Header";

/**
 *@Description: a react component that renders the PodLandingPage
 */

class PodLandingPage extends React.Component {
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

export default withRouter(PodLandingPage);