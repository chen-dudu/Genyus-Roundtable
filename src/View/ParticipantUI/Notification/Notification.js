import React, {useState} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from "react-router-dom";

/**
 * @file this file contains a constant which represents the whole notification page
 */
const Notification = props => {
    const [image, setImage] = useState();
    return(
        <div>
            <container>
                <Header setImage={setImage} image={image}></Header>
                <Body></Body>
                <Footer></Footer>
            </container>
        </div>
    )
}

export default withRouter(Notification);