import React from 'react';
import {Body2Wrapper, BodyWrapper} from './ViewAcceptedSession.style';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {Card, Steps} from 'antd';

const { Step } = Steps;

class Body1 extends React.Component {
	state = {
		loading: false,
	};

	onChange = checked => {
		this.setState({ loading: !checked });
	};

	render() {
		return (
			<BodyWrapper>
				<h1>Roundtable Confirmation</h1>
				<h2 style={{fontStyle:"italic"}}>Meaningful Vocation: Stroke Recovery Stories</h2>

				<Steps
					type="navigation"
					current={3}
					onChange={this.onChange}
					className="site-navigation-steps"
				>
					<Step status="finish" title="Learn About Roundtable" />
					<Step status="finish" title="Login or Sign Up" />
					<Step status="finish" title="Complete Questionnaire" />
					<Step status="process" title="Registration Complete" />
				</Steps>
				<br></br>
				<br></br>
				<h1 style={{fontSize:"30px", marginLeft:"15%", fontWeight:"normal"}}>Your Confirmation</h1>
				<br></br>
			</BodyWrapper>
		)
	}
}

class Body2 extends React.Component {
	render() {
		return (
			<Body2Wrapper style={{marginLeft:"auto", marginRight:"auto"}}>
				<br />
				<h1>Confirmation Details:</h1>
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
				<Body1></Body1>
				<Body2></Body2>
			</div>


		)
	}
}

export default Body;