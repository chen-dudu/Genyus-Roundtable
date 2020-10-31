import React, {useState} from 'react';
import Footer from './Footer.js';
import Body from './Body.js';
import { withRouter } from 'react-router-dom'
import Header from './Header.js'

/**
 *@Description: a react component that renders the ParticipantPodList
 */

const ParticipantPodList = props => {
    const [image, setImage] = useState();
    /**
     * render the JSX elements
     * @returns {JSX.Element} including the header, the body and the footer
     */
    return(
      <container>
          <Header image={image}/>
          <Body setImage={setImage}/>
          <Footer/>
      </container>
    )
  }

export default withRouter(ParticipantPodList);