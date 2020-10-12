import React from 'react';
// import PropTypes from 'prop-types';
// uppercase below
import {LeftWrapper,MidWrapper,RightWrapper,FooterWrapper,Title,Text} from './Login.style'
import middleImg from "../../img/footmid.png"
import rightImg from "../../img/footright.png"


const Footer = props => {
    return (
        <FooterWrapper>
            <LeftWrapper>
                <Title>BLOGS</Title>
                <Text>Candid with Cal</Text>
                <Text>Topic Talk</Text>
                <Title>ABOUT</Title>
                <Text>Cal's Story</Text>
                <Text>The genesis of genyus</Text>
            </LeftWrapper>
            <MidWrapper>
                <div>
                <img src={middleImg}></img>
                </div>
            </MidWrapper>
            <RightWrapper>
                <div>
                <img src={rightImg}></img>
                </div>
            </RightWrapper>
        </FooterWrapper>
    );
};

Footer.propTypes = {
    
};

export default Footer;