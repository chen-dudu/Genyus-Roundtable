import React, {useState} from 'react';
import Footer from './Footer.js';
import Body from './Body.js';
import { withRouter } from 'react-router-dom'
import Header from './Header.js'

/**
 *@Description: a react component that renders the AdminPodList
 */
const AdminPodList = props => {
    const [image, setImage] = useState();
    /**
     * render the JSX elements
     * @returns {JSX.Element} including the header, the body and the footer
     */
    return(
      <container>
          <Header setImage={setImage} image={image}/>
          <Body/>
          <Footer/>
      </container>
    )
  }

export default withRouter(AdminPodList);