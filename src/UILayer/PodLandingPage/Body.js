import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,BodyLeftWrapper,BodyRightWrapper,Body2Wrapper} from './PodLandingPage.style';
import Img from '../../img/person.gif';
import { Link } from "react-router-dom";
import { InlineWidget } from "react-calendly"
import {List, Avatar, Button, Spin, message, Upload} from 'antd';

class Body1 extends React.Component {
	render(){
		return(
			
			<Body1Wrapper>
				<BodyLeftWrapper>
					<h2>Researcher</h2>
					<Avatar size={120} src={"https://firebasestorage.googleapis.com/v0/b/genyus-roundtables.appspot.com/o/avatars%2F4I7MGo3ayseEBsxYRbEtq3uO2jX2%2FPerez.png?alt=media&token=649deac9-1dea-4415-a0ee-a04b330bd16d"}></Avatar>
					<p className="fullname">Joan Perez</p>
					<p className="description">Joan Perez is a stroke researcher working at Monash University. She's been in the field for over 15 years, and has been working with Genyus for the last 2 years!</p>

				</BodyLeftWrapper>
				<BodyRightWrapper>
					<h1>Pod detail</h1>
					<div className="Calendly">
						<InlineWidget url="https://calendly.com/kaixuang/stroke" />
					</div>

					<br/>
				</BodyRightWrapper>


			</Body1Wrapper>


		)
	}
}

// class Body2 extends React.Component {
// 	render(){
// 		return(
// 			<Body2Wrapper>
// 			    <br />
// 				<h1>Genyus Roundtable Is...</h1>
// 				<p>·...An online peer-led focus group</p>
// 				<p>·...Led by fellow survivors</p>
// 				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
// 				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
// 				<br/>
// 				<br/>
// 			</Body2Wrapper>
//
//
// 		)
// 	}
// }


class Body extends React.Component {
	render(){
		return(
			<div>
			<Body1></Body1>
			{/*<Body2></Body2>*/}
			</div>


		)
	}
}

export default Body;