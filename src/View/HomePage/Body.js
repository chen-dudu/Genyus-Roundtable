import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper} from './HomePage.style';
import Img from '../../img/person.gif';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Body1 from './Body1.js';




class Body extends React.Component {

	render(){
		return(
			<div>
			<Body1></Body1>
				<Body2Wrapper>
					<br />
					<h1>Genyus Roundtable Is...</h1>
					<p>·...An online peer-led focus group</p>
					<p>·...Led by fellow survivors</p>
					<p>·...About sharing what’s been most impactful and important to you in your experience</p>
					<p>·...Aiming to pay it forward, and help others along their journeys!</p>
					<br/>
					<br/>
				</Body2Wrapper>
			</div>


		)
	}
}

export default withRouter(Body);