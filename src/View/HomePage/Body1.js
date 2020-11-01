import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper} from './HomePage.style';
import Img from '../../img/person.gif';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

/**
 *@Description: a react component that renders another part of body of the homepage
 */

class Body1 extends React.Component {
	/**
	 * render the JSX elements
	 * @returns {JSX.Element} including the title, a image, a video, the login and signup button
	 */
	render(){
		return(
			<Body1Wrapper>
				<h1>Welcome to Genyus Roundtable!</h1>
				<h2>An online peer-driven focus group</h2>
                <div>
                	<img src={Img} alt=""/>
                	<p>Play Video!</p>
                	<iframe id="u35_input" scrolling="auto" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="https://www.youtube.com/embed/Xm_F_UBjrq8"/>
                    <p id="SignUp">Sign up to get involved!</p>   
                </div>
                <br />
				<Button  type="primary"
						 size = {"large"}
						 style={{ fontSize:"large", display:"block", margin: "2% auto 2%",width:"15%" }}
						 onClick={() => this.props.history.push('/Signup')}
				>Sign up!</Button>
				<Button  type="primary"
						size = {"large"}
						style={{ fontSize:"large", display:"block", margin: "0% auto 5%", width:"15%" }}
                        onClick={() => this.props.history.push('/Login')}
				>Log in!</Button>
                <br />
			</Body1Wrapper>


		)
	}
}

export default withRouter(Body1);
