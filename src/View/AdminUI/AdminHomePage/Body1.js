/**
 * Body1: The react component holds: buttons and upload photo field
 * Buttons: imported from antd
 * Upload field: imported from antd
 * Crop function: antd
*/
import React, { useState } from 'react';
import { Body1Wrapper, ProfileWrapper } from './AdminHomePage.style';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';
import { withRouter } from 'react-router-dom';
import UserManager from '../../../DataModel/UserModel/UserManager';

/** 
 * change uploaded photo format
 * @param img image uploaded
 * @param callback 
*/
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

/**
 * check photo format before uploading
 * @param {*} file 
 */
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

	/**
	 * update the uploaded photo file to the database
	 * @param {*} info 
	 */
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
				this.setState({
					imageUrl,
					loading: false,
				});
				this.props.setImage(imageUrl);
			},
			);
		}
	};

	/**
	 * get current from the Usermanager
	 */
	getImage = () => {
		UserManager.getCurrentUser()
			.then(response => {
				console.log('getCurrentUser successful');
				console.log('photourl:' + response.photoURL);

				if (response.photoURL) {
					/**
					 * get one attribute: photoURL of the current user
					 */
					UserManager.getAvatar(response.photoURL)
						.then(photo => {
							console.log('getAvatar successful');
							console.log('setImage successful');
							this.setState({ imageUrl: photo });
							// this.props.setImage(photo);
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
				{loading ? <LoadingOutlined style={{ background: 'red' }} /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}></div>
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
					{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '200%', borderRadius: '100%' }} /> : uploadButton}
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

				this.setState({displayedName:response.nickname});

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

		this.state = {
			displayedName: null
		}
	}
	
	render() {

		return (

			<Body1Wrapper>
				<h1>Admin Home</h1>
				{/* PodCreate */}
				<Button onClick={()=>{this.props.history.push("/Admin/PodCreate")}} type="primary" style={{ margin: '3% 55% 0', width: '15%', height: '10%', position: 'absolute' }}>Create a New Roundtable</Button>
				<Button onClick={()=>{this.props.history.push("/Admin/AdminPodList")}} type="primary" style={{ margin: '8% 55% 0', width: '15%', height: '10%', position: 'absolute' }}>Browse/Edit Roundtables</Button>
				<Button onClick={()=>{this.props.history.push("/Admin/ResearcherList")}} type="primary" style={{ margin: '13% 55% 0', width: '15%', height: '10%', position: 'absolute' }}>View/Edit Researcher Accounts</Button>
				<ProfileWrapper>
				<h2 style={{color:'red'}}>Hey there, {this.state.displayedName}!</h2>
					<br /><br/>
					<Avatar setImage={this.props.setImage} size="large" />
					<br /><br /><br /><br />
				</ProfileWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body1);