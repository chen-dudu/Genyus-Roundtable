import React from 'react';
import ReactDOM from 'react-dom';


import Footer from './Footer.js';
import Body from './Body.js';

import { withRouter } from 'react-router-dom'
import Header from './Header.js'

class ResearcherCreate extends React.Component {
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
export default withRouter(ResearcherCreate);