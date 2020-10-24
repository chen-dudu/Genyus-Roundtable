import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator} from './AdminPodList.style';

import Footer from './Footer.js';
import Body from './Body.js';

import { withRouter } from 'react-router-dom'
import Header from './Header.js'

const AdminPodList = props => {
    const [image, setImage] = useState();

    return(
      <container>
          <Header setImage={setImage} image={image}></Header>
          <Body/>
          <Footer/>
      </container>
    )
  }


// ========================================
export default withRouter(AdminPodList);