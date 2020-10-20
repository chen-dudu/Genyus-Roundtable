import React, {useState} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import {withRouter} from "react-router-dom";

const Detail = props => {
    const [image, setImage] = useState();
    return(
        <div>
            <container>
                <Header setImage={setImage} image={image}></Header>
                <Body setImage={setImage} image={image}></Body>
                <Footer></Footer>
            </container>
        </div>
    )
}

export default withRouter(Detail);