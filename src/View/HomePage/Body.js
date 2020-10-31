import React from 'react';
import {Body2Wrapper} from './HomePage.style';
import { withRouter } from 'react-router-dom';
import Body1 from './Body1.js';

/**
*@Description: a react component that renders the body of the homepage
*/

class Body extends React.Component {
	/**
	 * render the JSX elements
	 * @returns {JSX.Element} including some description of Genyus Roundtable
	 */
	render(){
		return(
			<div>
			<Body1/>
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