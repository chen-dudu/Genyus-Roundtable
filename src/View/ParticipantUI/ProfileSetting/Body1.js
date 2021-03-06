/**
 * Body1: The react component holds: buttons and upload photo field
 * Buttons: imported from antd
 * Upload field: imported from antd
 * Crop function: antd
*/
import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { Body1Wrapper, ProfileWrapper } from './ProfileSetting.style';
import { Upload, message, Button, Input, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';
import { withRouter } from 'react-router-dom';
import UserManager from '../../../DataModel/UserModel/UserManager';

const CLASS_NAME = "ProfileSetting/Body1";

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
	return true;
}

class UploadTrigger extends React.Component {
	state = {
		loading: false,
	};

	/**
	 * update the uploaded photo file to the database
	 * @param {*} info 
	 */
	handleChange = info => {
		getBase64(info.file.originFileObj, imageUrl => {
			this.setState({
				imageUrl,
				loading: false,
			});
			this.props.setImage(imageUrl);
		});
	};

	/**
	 * get current from the Usermanager
	 */
	getImage = () => {
		UserManager.getCurrentUser()
			.then(user => {
				console.log('getCurrentUser successful');
				console.log('photourl:' + user.photoURL);

				if (user.photoURL) {
					/**
					 * get one attribute: photoURL of the current user
					 */
					UserManager.getAvatar(user.photoURL)
						.then(photo => {
							console.log('getAvatar successful');
							console.log('setImage successful');
							this.setState({ imageUrl: photo });
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
		return (
			<ImgCrop rotate>
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action={UserManager.updateAvatar}
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
	constructor(props) {
		super(props);
		this.getImage();
		this.onFullnameEnter = this.onFullnameEnter.bind(this);
		this.onNicknameEnter = this.onNicknameEnter.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.state = { full_name: '', nick_name: '' };
	}

	/**
	 * change fullname after entering input in the
	 * Fullname field
	 * @param {*} e 
	 */
	onFullnameEnter(e) {
		this.setState({ full_name: e.target.value });
	}

	/**
	 * change nickname after entering input in the
	 * Nickname field
	 * @param {*} e 
	 */
	onNicknameEnter(e) {
		this.setState({ nick_name: e.target.value });
	}

	/**
	 * is triggered when submitting the form
	 * @param {*} e 
	 */
	updateProfile = (e) => {
		e.preventDefault();
		/**
		 * if neither fullname nor nickname is blank
		 */
		if (this.state.full_name && this.state.nick_name) {
			console.log("PrintFullname", this.state.full_name);
			console.log("PrintNickname", this.state.nick_name);
			/**
			 * ask the userManager to update fullname and nickname
			 * of the user in the db
			 * firebase: firestore
			 */
			UserManager.updateProfile(this.state.full_name, this.state.nick_name)
				.then(response => {
					this.props.history.push("ParticipantHomePage");
					console.log("update profile information successful");

				})
				.catch(err => {
					alert(err);
				});
		}
	}

	/**
	 * get current user from the UserManager
	 * so that we can get other attributes of the user
	 */
	getImage = () => {
		UserManager.getCurrentUser()
			.then(user => {
				console.log('getCurrentUser successful');
				console.log('photourl:' + user.photoURL);
				this.setState({ full_name: user.fullname, nick_name: user.nickname });

				if (user.photoURL) {
					/**
					 * get the photoUrl of the current user
					 */
					UserManager.getAvatar(user.photoURL)
						.then(photo => {
							console.log('getAvatar successful');
							console.log('setImage successful');
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

	render() {
		return (
			<Body1Wrapper>
				<h2 style={{ margin: '0 10% 3%', width: '20%', height: '5%' }}>Profile Setting</h2>
				{/* <h5 style={{ margin: '3% 60% 0', width: '20%', position: 'absolute' }}>Full Name</h5> */}
				{/* <Input type={'text'} id={'full_name'} name={'full_name'} value={this.state.full_name} style={{width: '50%', height: 30}} onChange={this.onFullnameEnter}/> */}

				<form onSubmit={this.updateProfile} style={{ width: '40%', margin: '0 45% auto', position: 'absolute' }}>
					<div align={'left'}>
						<label htmlFor="full_name" style={{ fontSize: "120%", margin: 'auto 18% auto', position: 'relative' }}>Full Name</label>
					</div>

					<Input id={'full_name'} size={"large"} allowClear placeholder={'Full Name'} value={this.state.full_name} onChange={this.onFullnameEnter} style={{ width: '55%', margin: '0 18% auto' }} />
					{/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
					{/*<input type={'text'} id={'full_name'} name={'full_name'} value={this.state.full_name} style={{width: '50%', height: 30}} onChange={this.onFullnameEnter}/>*/}
					<br />
					<br />
					<div align={'left'}>
						<label htmlFor="nick_name" style={{ fontSize: "120%", margin: 'auto 18% auto', position: 'relative' }}>Nickname</label>
					</div>

					<Input id={'nick_name'} size={"large"} allowClear placeholder={'Nick Name'} value={this.state.nick_name} onChange={this.onNicknameEnter} style={{ width: '55%', margin: 'auto 18% auto' }} />

					<br />
					<br />

					<div align={'center'} style={{ width: '90%' }}>

						<Button htmlType={"submit"} id={'signup-button'} type={"primary"} block size={"large"} style={{ borderRadius: 5, width: '31%', position: 'relative', margin: '5% 10% auto' }} >
							Save Changes
                        </Button>
						<Button type="primary" style={{ margin: '5% 10% 0', width: '31%', position: 'relative', height: '200%', borderRadius: 5, fontSize: '120%' }} onClick={() => this.props.history.push('/ParticipantHomePage')}>Go Back</Button>

					</div>
				</form>


				{/* <Input type={'text'} id={'full_name'} name={'full_name'} style={{ margin: '5% 60% 0', width: '20%', height: '5%', position: 'absolute' }} placeholder="Enter your new Full Name" /> */}
				{/* <h5 style={{ margin: '8% 60% 0', width: '20%', position: 'absolute' }}>Nickname</h5> */}
				{/* <input type={'text'} id={'nick_name'} name={'nick_name'} value={this.state.nick_name} style={{width: '50%', height: 30}} onChange={this.onNicknameEnter}/> */}
				{/* <Input type={'text'} id={'nick_name'} name={'nick_name'} style={{ margin: '10% 60% 0', width: '20%', height: '5%', position: 'absolute' }} placeholder="Enter your new Nickname" /> */}
				{/* <Button type="primary" style={{ margin: '15% 60% 0', width: '10%', height: '8%', position: 'absolute' }}>Save Changes</Button> */}

				<ProfileWrapper>
					<h3>Current Profile Pic: </h3>
					<h5 style={{ color: '#4682B4' }}>Click on the photo to make changes</h5>
					<br /><br /><br /><br />
					<UploadTrigger setImage={this.props.setImage} size="large" />
				</ProfileWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body1);