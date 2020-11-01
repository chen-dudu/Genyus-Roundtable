/** The PodCreatePage is composed by A Header, A Body, A Footer
 * The Body Component is composed by Body1 and Body2
 * Author: Yujun Yan
 */
import React, { useState } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';


const PodCreate = props => {
  /** 
  * setImage is used to unify 
  * the image upload in the Body component
  * and the avatar in the Header component
  */
  const [image, setImage] = useState();
  return (
    <div>
      <container>
        <Header setImage={setImage} image={image}></Header>
        <Body></Body>
        <Footer></Footer>
      </container>
    </div>
  )
}

// ========================================
export default PodCreate;