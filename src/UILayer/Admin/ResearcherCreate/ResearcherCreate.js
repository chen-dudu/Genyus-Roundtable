import React, {useState} from 'react';
import ReactDOM from 'react-dom';


import Footer from './Footer.js';
import Body from './Body.js';

import { withRouter } from 'react-router-dom'
import Header from './Header.js'

const ResearcherCreate = props => {
    const [image, setImage] = useState();

    return(
        <container>
            <Header setImage={setImage} image={image}/>
            <Body></Body>
            <Footer/>
        </container>
    )
}

// ========================================
export default withRouter(ResearcherCreate);