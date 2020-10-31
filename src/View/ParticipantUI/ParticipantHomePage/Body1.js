import React, { useState } from 'react';
import { Body1Wrapper, ProfileWrapper } from './ParticipantHomePage.style';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';
import { withRouter } from 'react-router-dom';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Body1 extends React.Component {

	handleClick = () => {
		this.props.history.push('/ProfileSetting');
	}

	render() {

		return (

			<Body1Wrapper>
				<h1>Welcome to Genyus Roundtable!</h1>

				<Button  type="primary"
						 style={{ margin: '8% 58% 0', width: '12%', height: '10%', position: 'absolute' }}
						 onClick={() => this.props.history.push('/Notification')} >
					My Notification
				</Button>

				<Button  type="primary" style={{ margin: '13% 58% 0', width: '12%', height: '10%', position: 'absolute' }} onClick={() => this.props.history.push('/Participant/ParticipantPodList')}>My Pod Schedule</Button>
				<ProfileWrapper>
				<h2 style={{color:'red'}}>Hey there, {this.props.displayName}</h2>
					<br /><br/>
					<Avatar size={150} icon={<UserOutlined />} src = {this.props.photo} />
					<br /><br /><br /><br />
					<Button danger style={{ margin: '0', width: '55%', height: '12%', fontSize: '120%' }} onClick={this.handleClick}>Profile Settings</Button>

				</ProfileWrapper>

			</Body1Wrapper>
		)
	}
}

export default withRouter(Body1);