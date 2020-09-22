import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { Body1Wrapper, ProfileWrapper } from './ProfileSetting.style';
import { Upload, message, Button, Input, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
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

class UploadTrigger extends React.Component {
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
			UserManager.updateAvatar(info.file.originFileObj)
				.then(response => {
					console.log('update successful');
				})
				.catch(error => {
					console.log(error);
				});

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

	getImage = () => {
		UserManager.getCurrentUser()
			.then(response => {
				console.log('getCurrentUser successful');
				console.log('photourl:' + response.photoURL);

				if (response.photoURL) {
					UserManager.getAvatar(response.photoURL)
						.then(photo => {
							console.log('getAvatar successful');
							console.log('setImage successful');
							this.setState({imageUrl: photo});
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	constructor(props) {
		super(props);
		this.getImage();
	}

	render() {

		const { loading, imageUrl } = this.state;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined style={{ background: 'red' }}/> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}></div>
			</div>
		);
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
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%', borderRadius:'100%' }} /> : uploadButton}
			</Upload>
			</ImgCrop>
		);
	}
}

class Body1 extends React.Component {
	getImage = () => {
		UserManager.getCurrentUser()
			.then(response => {
				console.log('getCurrentUser successful');
				console.log('photourl:' + response.photoURL);

				if (response.photoURL) {
					UserManager.getAvatar(response.photoURL)
						.then(photo => {
							console.log('getAvatar successful');
							console.log('setImage successful');
							// this.setState({imageUrl: photo});
							this.props.setImage(photo);
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	constructor(props) {
		super(props);
		this.getImage();
	}

	render() {
		// UserManager.getCurrentUser()
		// 	.then(response => {
		// 		// eslint-disable-next-line no-const-assign
		// 		console.log('The display name is: ' + response);
		// 		console.log('getName successful');
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});


		// const currentUser = UserManager.getCurrentUser();

		// console.log('********'+ currentUser.displayName);

		return (
			<Body1Wrapper>
				<h2 style={{ margin: '0 10% 3%', width: '20%', height: '5%' }}>Profile Setting</h2>
				<h5 style={{ margin: '3% 60% 0', width: '20%', position: 'absolute' }}>Full Name</h5>
				{/* <Input type={'text'} id={'full_name'} name={'full_name'} value={this.state.full_name} style={{width: '50%', height: 30}} onChange={this.onFullnameEnter}/> */}
				<Input type={'text'} id={'full_name'} name={'full_name'} style={{ margin: '5% 60% 0', width: '20%', height: '5%', position: 'absolute' }} placeholder="Enter your new Full Name" />
				<h5 style={{ margin: '8% 60% 0', width: '20%', position: 'absolute' }}>Nickname</h5>
				{/* <input type={'text'} id={'nick_name'} name={'nick_name'} value={this.state.nick_name} style={{width: '50%', height: 30}} onChange={this.onNicknameEnter}/> */}
				<Input type={'text'} id={'nick_name'} name={'nick_name'} style={{ margin: '10% 60% 0', width: '20%', height: '5%', position: 'absolute' }} placeholder="Enter your new Nickname" />
				<Button type="primary" style={{ margin: '15% 60% 0', width: '10%', height: '8%', position: 'absolute' }}>Save Changes</Button>
				<Button type="primary" style={{ margin: '19% 60% 0', width: '10%', height: '8%', position: 'absolute' }} onClick={() => this.props.history.push('/users')}>Go Back</Button>

				<ProfileWrapper>
					<h3>Current Profile Pic: </h3>
					<h5 style={{ color: '#4682B4' }}>Click on the photo to make changes</h5>
					<br /><br /><br /><br />
					<UploadTrigger setImage={this.props.setImage}  size="large" />
				</ProfileWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body1);