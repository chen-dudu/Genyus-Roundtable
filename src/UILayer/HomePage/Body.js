import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper} from './HomePage.style';
import Img from '../../img/person.gif';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Body1 from './Body1.js';




class Body extends React.Component {

	constructor(props) {
		super(props);
		const query = this.props.location.search;
		const code = query.substr(6) // '1'

		console.log(code);
		this.state = {
			code : code,
		}
	}

	componentDidMount() {
		fetch("https://auth.calendly.com/oauth/token", {
			"method": "POST",
			"headers": {},
			"body": {
				"grant_type": "authorization_code",
				"client_id": "qJWDGzV1-0Jzw5QHusOPv8yGdPZ24RiBJJs_-qwWe_U",
				"client_secret": "-0nkGp3XFXEnvsDS8xVNKMXJdTO4xaIu16OlZh24LEw",
				"code": this.state.code,
				"redirect_uri": "https://genyus-roundtables.web.app/"
			}
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(data =>{
				return fetch("https://api.calendly.com/users/me?access_token-="+data.access_token, {
					"method": "GET",
					"headers": {}
				})
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then(data => {
						console.log(data);
					})
					.catch(err => {
						console.error(err);
					});
			})
			.catch(err => {
				console.error(err);
			})
			.catch(err => {
				console.error(err);
			});
	}


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