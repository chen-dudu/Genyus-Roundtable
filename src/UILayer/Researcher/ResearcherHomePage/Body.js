import React,{ useState } from 'react';
import {Body2Wrapper} from './ResearcherHomePage.style';
import Body1 from './Body1.js';
import {withRouter} from 'react-router-dom';



class Body2 extends React.Component {
	render() {
		return (
			<Body2Wrapper>
				<br />
				<h1>Genyus Roundtable Is...</h1>
				<p>·...An online peer-led focus group</p>
				<p>·...Led by fellow survivors</p>
				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
				<br />
				<br />
			</Body2Wrapper>


		)
	}
}


class Body extends React.Component {
	render() {
		return (
			<div>
				<Body1 setImage={this.props.setImage}></Body1>
				<Body2></Body2>
			</div>


		)
	}
}

export default withRouter(Body);