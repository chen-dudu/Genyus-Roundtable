import React, {useState} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from "react-router-dom";

/**
 * @file this file contains a constant which represents the whole detail page
 */
const Detail = props => {
    const [image, setImage] = useState();
    return(
        <div>
            <container>
                <Header setImage={setImage} image={image}/>
                <Body/>
                <Footer/>
            </container>
        </div>
    )
}

export default withRouter(Detail);