import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Body1Wrapper, NotificationButton, Body2Wrapper, ScheduleButton, ProfileWrapper, SettingButton, StatusButton } from './Notification.style';
import Img from '../img/person.gif';
import firebase from 'firebase';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
	state = {
		loading: false,
	};

	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			console.log(info.file.originFileObj);
			getBase64(info.file.originFileObj, imageUrl => {
				this.setState({
					imageUrl,
					loading: false,
				});
				this.props.setImage(imageUrl);
			},
			);
		}
	};

	render() {
		const { loading, imageUrl } = this.state;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ fontSize: '16px', color: '#08c' }}>Upload</div>
			</div>
		);
		//   console.log(this.state);
		return (
			<ImgCrop rotate>
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={beforeUpload}
					onChange={this.handleChange}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%' }} /> : uploadButton}
				</Upload>
			</ImgCrop>
		);
	}
}

class Body1 extends React.Component {
	render() {

		return (

			<Body1Wrapper>
				<h1>Notifications</h1>
				<NotificationButton>My Notification</NotificationButton>
				<ScheduleButton>My Roundtable Schedule</ScheduleButton>
				<ProfileWrapper>
					<h1 color={"red"}>Hey there, </h1>
					<br /><br />
					<Avatar setImage={this.props.setImage} size="large" />
					<br /><br /><br /><br /><br /><br />
					<SettingButton>Profile Settings</SettingButton>
					<StatusButton>Status and Rewards</StatusButton>
				</ProfileWrapper>

				{/* <div className='notificationButton'>My Notification</div>
			<div className='scheduleButton'>My Roundtable Schedule</div> */}

			</Body1Wrapper>


		)
	}
}

class Body2 extends React.Component {
	render() {
		return (
			<Body2Wrapper>
				<br />
				<h1>Genyus Roundtable Is...</h1>
				<p>·...An online peer-led focus group</p>
				<p>·...Led by fellow survivors</p>
				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
				<br />
				<br />
			</Body2Wrapper>
		)
	}
}

class


class Body extends React.Component {
	render() {
		return (
			<div>
				<Body1 setImage={this.props.setImage}></Body1>
				<Body2></Body2>
			</div>


		)
	}
}

export default Body;