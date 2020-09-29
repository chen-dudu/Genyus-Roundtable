import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator} from './ResearcherHomePage.style';

import Footer from './Footer.js';
import Body from './Body.js';

import { withRouter } from 'react-router-dom'
import Header from './Header.js'

const ResearcherHomePage = props => {
    const [image, setImage] = useState();

    return(
      <container>
          <Header image={image}></Header>
          <Body setImage={setImage}></Body>
          <Footer/>
      </container>
    )
  }


// ========================================
export default withRouter(ResearcherHomePage);