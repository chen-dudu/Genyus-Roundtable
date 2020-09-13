import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper} from './HomePage.style';
import Img from '../img/person.gif';

class Body1 extends React.Component {
	render(){
		return(
			
			<Body1Wrapper>
				<h1>Welcome to Genyus Roundtable!</h1>
				<h2>An online peer-driven focus group</h2>
                <div>
                	<img src={Img} alt=""></img>
                	<p>Play Video!</p>
                	<iframe id="u35_input" scrolling="auto" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="https://www.youtube.com/embed/Xm_F_UBjrq8"></iframe>
                    <p id="SignUp">Sign up to get involved!</p>   
                </div>
                <br />
                <SubmitButton>Sign Up!</SubmitButton>
                <SubmitButton>Log in!</SubmitButton>
                <br />

			</Body1Wrapper>


		)
	}
}

class Body2 extends React.Component {
	render(){
		return(
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


		)
	}
}


class Body extends React.Component {
	render(){
		return(
			<div>
			<Body1></Body1>
			<Body2></Body2>
			</div>


		)
	}
}

export default Body;