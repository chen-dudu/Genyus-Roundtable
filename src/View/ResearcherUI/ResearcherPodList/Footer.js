import React from 'react';
import {LeftWrapper,MidWrapper,RightWrapper,FooterWrapper} from './ResearcherPodList.style'
import leftImg from "../../../img/footleft.png"
import middleImg from "../../../img/footmid.png"
import rightImg from "../../../img/footright.png"

/**
 *@Description: a react component that renders the footer of the ResearcherPodList
 */

class Footer extends React.Component {
    /**
     * render the JSX elements
     * @returns {JSX.Element} including the left, middle and right part of the footer, which are three images
     */
	render(){
		return(
          <FooterWrapper>
          	<LeftWrapper>
	          	<div>
	          	<img src={leftImg} alt=""/>
	          	</div>
          	</LeftWrapper>
          	<MidWrapper>
                <div>
                <img src={middleImg} alt=""/>
                </div>
            </MidWrapper>
            <RightWrapper>
                <div>
                <img src={rightImg} alt=""/>
                </div>
            </RightWrapper>
          </FooterWrapper>
		)
	}
}

export default Footer;