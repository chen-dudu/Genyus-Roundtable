import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Body1Wrapper, NotificationButton, ScheduleButton, ProfileWrapper } from './Users.style';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';
import { withRouter } from 'react-router-dom';
import UserManager from '../DataModel/UserModel/UserManager';


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
				// 用这个方法给imageUrl赋值
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
				<h1>Welcome to Genyus Roundtable!</h1>
				<NotificationButton>My Notification</NotificationButton>
				<ScheduleButton>My Roundtable Schedule</ScheduleButton>
				<ProfileWrapper>
					<h1 color={"red"}>Hey there, </h1>
					<br /><br />
					<Avatar setImage={this.props.setImage} size="large" />
					<br /><br /><br /><br />
					<Button danger style={{ margin: '0', width: '55%', height: '12%', fontSize: '120%' }} onClick={() => this.props.history.push('/ProfileSetting')}>Profile Settings</Button>

					<Button danger style={{ margin: '5% 5% 0', width: '55%', height: '12%', fontSize: '120%' }} onClick={() => this.props.history.push('/ProfileSetting')}>Status and Rewards</Button>

					{/* <StatusButton>Status and Rewards</StatusButton> */}
				</ProfileWrapper>

				{/* <div className='notificationButton'>My Notification</div>
			<div className='scheduleButton'>My Roundtable Schedule</div> */}

			</Body1Wrapper>
		)
	}
}

export default withRouter(Body1);