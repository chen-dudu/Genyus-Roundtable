/**
 * The Footer component is composed by
 * LeftWapper
 * MidWrapper
 * RightWrapper
 * Different Wrapper holds different information
 * Author: Yujun Yan
 */
import React from 'react';
import {LeftWrapper,MidWrapper,RightWrapper,FooterWrapper,Title,Text} from './Signup.style'
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
                <img src={middleImg} alt={"social media"}/>
                </div>
            </MidWrapper>
            <RightWrapper>
                <div>
                <img src={rightImg} alt={"logo-bottom"}/>
                </div>
            </RightWrapper>
        </FooterWrapper>
    );
};

Footer.propTypes = {
    
};

export default Footer;