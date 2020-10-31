import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css';
import React from 'react';
import logo from '../../../img/logo.png';
import {HeaderWrapper,ImageWrapper,Seperator} from './PodLandingPage.style';

/**
 *@Description: a react component that renders the header of the PodLandingPage
 */
class Header extends React.Component {
    /**
     * render the JSX elements
     * @returns {JSX.Element} including a logo
     */
    render(){
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <img src={logo}/>
                </ImageWrapper>
                <Seperator/>
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)