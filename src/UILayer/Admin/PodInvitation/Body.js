import React, { useState } from 'react';
import { BodyWrapper, Body1Wrapper, TitleWrapper } from './PodInvitation.style';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import firebase from 'firebase';
import PodManager from '../../../FoundationLayer/PodModel/PodManager';


class Body extends React.Component {
	constructor(props) {
		super(props)


		const query = this.props.history.location.search;
		const pid = query.substr(5);

		console.log(this.props);
		this.state = {
			pid: pid
		}
	}

	render() {
		return (
			<Body1Wrapper>
				<TitleWrapper>
					<h2>Invitation Link</h2>
				</TitleWrapper>
				<BodyWrapper>
					<br />
					<h2 style={{ textAlign: "center", fontSize: '35px', color: "red" }}>Pod Confirmed!</h2>
					<br /><br />
					<h2 style={{ textAlign: "center", fontSize: '25px', color: "red" }}>Use this link to invite participants:</h2>
					<h2 style={{ textAlign: "center", fontSize: '20px', color: "blue", textDecoration: "underline" }}>https://genyus-roundtables.web.app/PodLandingPage?pid={this.state.pid}</h2>
				</BodyWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body);