/**
 * The ProfileSetting Component contains:
 * Header: logo and avatar
 * Body: upload button, input fields, submitting button
 * Footer: LeftWrapper, MidWrapper, RightWrapper
 */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from 'react-router-dom';

/** 
 * setImage is used to unify 
 * the image upload in the Body component
 * and the avatar in the Header component
*/
const ProfileSetting = props => {
  const [image, setImage] = useState();
  console.log("ProfileSetting***",image);
    return(
      <container>
        <Header image={image}></Header>
        <Body setImage={setImage} image={image}></Body>  
        <Footer></Footer>
      </container>
    )
}

// ========================================
export default withRouter(ProfileSetting);