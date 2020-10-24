import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,ProfileWrapper,TitleWrapper,BodyWrapper} from './ResearcherCreate.style';
import Img from '../../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Input, text, Avatar, Button, Modal, Upload, message} from 'antd';
import noteImg from "../../../img/note.png";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import firebase from "firebase";
import ImgCrop from "antd-img-crop";



const { TextArea } = Input;
const createUser = firebase.functions().httpsCallable('createUser');
const updateUserAvatar = firebase.functions().httpsCallable('updateUserAvatar');

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


class Body extends React.Component {
	constructor(props) {
		super(props);
		this.onEmailEnter = this.onEmailEnter.bind(this);
		this.onPasswordEnter = this.onPasswordEnter.bind(this);
		this.onDescriptionEnter = this.onDescriptionEnter.bind(this);
		this.onFullnameEnter = this.onFullnameEnter.bind(this);
		this.state = {
			fullname : '',
			description : '',
			email : '',
			password : '',
			avatar : '',
			Modalvisible : false,
			confirmLoading : false,
			loading: false,
		};
	}

	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			console.log(info.file.originFileObj);
			this.setState({avatar : info.file.originFileObj});

			getBase64(info.file.originFileObj, imageUrl => {
					this.setState({
						imageUrl,
						loading: false,
					});

				},
			);
		}
	};


	onEmailEnter (e){
		this.setState({ email: e.target.value})
	}

	onPasswordEnter(e) {
		this.setState({password: e.target.value});
	}

	onDescriptionEnter(e) {
		this.setState({description: e.target.value});
	}

	onFullnameEnter(e) {
		this.setState({fullname: e.target.value});
	}

	showModal = () => {this.setState({Modalvisible: true,});};
	handleModalOk = () => {
		this.setState({
			confirmLoading: true,
		});
		console.log(this.state);
		createUser({fullname: this.state.fullname, password :this.state.password,email :this.state.email,description :this.state.description})
			.then(result => {
				console.log(this.state.imageUrl,result.data.uid);
				UserManager.updateAvatar(this.state.avatar,result.data.uid)
					.then(response => {
						console.log('update successful');
					})
					.catch(error => {
						console.log("avatar "+error);
					});
				this.setState({Modalvisible: false, confirmLoading: false,});
			}).catch(err => {
				console.log("something wrong: ", err);
				this.setState({confirmLoading: false,});
		});

	};
	handleModalCancel = () => {this.setState({Modalvisible: false,});};



	render(){
		const { loading, imageUrl } = this.state;
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined style={{ background: 'red' }} /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}></div>
			</div>
		);
		return(

			<Body1Wrapper>
				<TitleWrapper>
					<h1>Create a new Researcher</h1>
					<br/>
				</TitleWrapper>
				<BodyWrapper>

					<div className="title">Researcher Details</div>
					<br />
					<br />
					<br />
					<br />
					<form>
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="Photo" style={{fontSize:"25px"}}>Photo</label>
						</div>

						<ProfileWrapper>

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
									{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '150%', borderRadius: '100%' }} /> : uploadButton}
								</Upload>
							</ImgCrop>
						</ProfileWrapper>


						<text>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						<br />
						<br />
						<br />
						<br />
						<text style={{ fontWeight:"bold",color: '#4682B4',marginLeft:'20%' }}>Click on the photo to make a change</text>

						<br />
						<br />

						<div align={'center'}>
							<label htmlFor="Full Name" style={{fontSize:"25px"}}>Full Name</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<Input type={'text'} allowClear id={'Full Name'} name={'Full Name'} value={this.state.FullName} onChange={this.onFullnameEnter} style={{width: '70%', height: 30}}/>
						<br />
						<br />


						<div align={'center'}>
							<label htmlFor="Description" style={{fontSize:"25px"}}>Description </label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<TextArea rows={3} type={'text'} allowClear id={'Description'} name={'Description'} value={this.state.description} onChange={this.onDescriptionEnter} style={{width: '70%', height: 90}} />
						<br />
						<br />


						<div align={'center'}>
							<label htmlFor="Email" style={{fontSize:"25px"}}>Email</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						{/*<Input type="text" id="confirmPassword" name="confirmPassword" style={{width:"50%"}}></Input>*/}
						<Input type={'text'} allowClear id={'Email'} name={'Email'} value={this.state.email} onChange={this.onEmailEnter} style={{width: '70%', height: 30}}/>						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="full_name" style={{fontSize:"25px"}}>Password</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						{/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
						<Input.Password type={'password'}  id={'Password'} name={'Password'} value={this.state.password} onChange={this.onPasswordEnter} style={{width: '70%', height: 30}} />
						<br />
						<br />


						<div>
							<Button className="cancelButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherList')}>Back</Button>
							<Button className="confirmButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={this.showModal}>Confirm</Button>
							<Modal
								title="Confirm to create a new researcher?"
								visible={this.state.Modalvisible}
								onOk={this.handleModalOk}
								confirmLoading={this.state.confirmLoading}
								onCancel={this.handleModalCancel}
							>
								<p>Confirm information</p>
								<p>Fullname: {this.state.fullname}</p>
								<p>Description: {this.state.description}</p>
								<p>Email: {this.state.email}</p>
								<p>Password: {this.state.password}</p>
							</Modal>
						</div>
						<br/>
						<br/>

					</form>
					<br/><br/>
				</BodyWrapper>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>

			</Body1Wrapper>




		)
	}
}




export default withRouter(Body);

