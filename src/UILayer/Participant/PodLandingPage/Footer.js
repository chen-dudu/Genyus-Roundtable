import React from 'react';
import {LeftWrapper,MidWrapper,RightWrapper,FooterWrapper} from './PodLandingPage.style'
import leftImg from "../../../img/footleft.png"
import middleImg from "../../../img/footmid.png"
import rightImg from "../../../img/footright.png"

class Footer extends React.Component {
	render(){
		return(
          <FooterWrapper>
          	<LeftWrapper>
	          	<div>
	          	<img src={leftImg} alt=""></img>
	          	</div>
          	</LeftWrapper>
          	<MidWrapper>
                <div>
                <img src={middleImg} alt=""></img>
                </div>
            </MidWrapper>
            <RightWrapper>
                <div>
                <img src={rightImg} alt=""></img>
                </div>
            </RightWrapper>
          </FooterWrapper>
		)
	}
}

export default Footer;