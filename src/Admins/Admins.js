import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from '../img/logo.png';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from 'react-router-dom';


const Admins = props => {
  const [image, setImage] = useState();
    return(
      <div>
      <container>
        <Header image={image}></Header>
        <Body setImage={setImage}></Body>  
        <Footer></Footer>
      </container>
      </div>
    )
}

// ========================================
export default Admins;