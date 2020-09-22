import React from 'react';
import {BodyWrapper} from './ViewAcceptedSession.style';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {Card, Steps} from 'antd';

const { Step } = Steps;

class Body extends React.Component {
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

				<h1 style={{fontSize:"30px", marginLeft:"30px", fontWeight:"normal"}}>Your Confirmation</h1>

			</BodyWrapper>


		)
	}
}

export default Body;