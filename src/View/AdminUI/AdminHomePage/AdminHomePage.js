/** The AdminHomePage is composed by A Header, A Body, A Footer
 * The Body Component is composed by Body1 and Body2
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
const AdminHomePage = props => {
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
export default AdminHomePage;