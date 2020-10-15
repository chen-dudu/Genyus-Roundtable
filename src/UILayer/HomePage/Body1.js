import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper} from './HomePage.style';
import Img from '../../img/person.gif';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

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
                {/* <Link to="Signup"><SubmitButton>Sign Up!</SubmitButton></Link> */}
                <Button  type="primary"
						 style={{ display:"block", margin: "2% auto 2%",width:"15%" }}
                
						// style={{ margin: '8% 58% 0', width: '12%', height: '10%', position: 'absolute' }}
						 onClick={() => this.props.history.push('/Signup')}
				>Sign up!</Button>
                {/* <Link to="Login"><SubmitButton>Log in!</SubmitButton></Link> */}
				<Button  type="primary"
						//  style={{ margin: '8% 58% 0', width: '12%', height: '10%', position: 'absolute' }}
						style={{ display:"block", margin: "0% auto 5%", width:"15%" }}
                        onClick={() => this.props.history.push('/Login')}
				>Log in!</Button>
                <br />

			</Body1Wrapper>


		)
	}
}

export default withRouter(Body1);
