import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,ProfileWrapper,TitleWrapper,BodyWrapper} from './ResearcherDetail.style';
import Img from '../../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Input, Avatar, Button, Modal, message, Upload} from 'antd';
import noteImg from "../../../img/note.png";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import firebase from "firebase";
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import ImgCrop from "antd-img-crop";


const { TextArea } = Input;
const { Search } = Input;
const updateUserFullname = firebase.functions().httpsCallable('updateUserFullname');
const updateUserDescription = firebase.functions().httpsCallable('updateUserDescription');
const updateUserEmail = firebase.functions().httpsCallable('updateUserEmail');
const updateUserPassword = firebase.functions().httpsCallable('updateUserPassword');
const updateUserAvatar = firebase.functions().httpsCallable('updateUserAvatar');
const getUser = firebase.functions().httpsCallable('getUser');


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
		this.onFullNameEnter = this.onFullNameEnter.bind(this);



		this.state = {
			uid: this.props.history.location.state.item.uid,
			fullname : this.props.history.location.state.item.fullname,
			description : this.props.history.location.state.item.description,
			email : this.props.history.location.state.item.email,
			password : this.props.history.location.state.item.password,
			imageUrl : this.props.history.location.state.item.photoURL,


			loading: false,
			Modal1visible: false,
			Modal2visible: false,
			Modal3visible: false,
			Modal4visible: false,
			confirmLoading: false,

		}
        console.log(this.state.uid);
		console.log(this.state.imageUrl);
		// this.getImage();

	}


	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			console.log(info.file.originFileObj);
			UserManager.updateAvatar(info.file.originFileObj,this.state.uid)
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

				},
			);
		}
	};


	onFullNameEnter(e) {
		this.setState({fullname: e.target.value});
	}

	onDescriptionEnter(e) {
		this.setState({description: e.target.value});
	}

	onEmailEnter(e) {
		this.setState({email: e.target.value});
	}

	onPasswordEnter(e) {
		this.setState({password: e.target.value});
	}

	showModal1 = () => {this.setState({Modal1visible: true,});};
	handleModal1Ok = () => {
		this.setState({
			confirmLoading: true,
		});
		updateUserFullname({uid: this.state.uid, fullname :this.state.fullname})
			.then(result => {
			this.setState({Modal1visible: false, confirmLoading: false,});
		}).catch(err => {
			console.log("something wrong: ", err);
		});

	};
	handleModal1Cancel = () => {this.setState({Modal1visible: false,});};

	showModal2 = () => {this.setState({Modal2visible: true,});};
	handleModal2Ok = () => {
		this.setState({
			confirmLoading: true,
		});
		updateUserDescription({uid: this.state.uid, description :this.state.description})
			.then(result => {
				this.setState({Modal2visible: false, confirmLoading: false,});
			}).catch(err => {
			console.log("something wrong: ", err);
		});

	};
	handleModal2Cancel = () => {this.setState({Modal2visible: false,});};

	showModal3 = () => {this.setState({Modal3visible: true,});};
	handleModal3Ok = () => {
		this.setState({
			confirmLoading: true,
		});
		updateUserEmail({uid: this.state.uid, email :this.state.email})
			.then(result => {
				this.setState({Modal3visible: false, confirmLoading: false,});
			}).catch(err => {
			console.log("something wrong: ", err);
		});
	};
	handleModal3Cancel = () => {this.setState({Modal3visible: false,});};

	showModal4 = () => {this.setState({Modal4visible: true,});};
	handleModal4Ok = () => {
		this.setState({
			confirmLoading: true,
		});
		updateUserPassword({uid: this.state.uid, password :this.state.password})
			.then(result => {
				this.setState({Modal4visible: false, confirmLoading: false,});
			}).catch(err => {
			console.log("something wrong: ", err);
		});

	};
	handleModal4Cancel = () => {this.setState({Modal4visible: false,});};

	render(){
		const { loading, imageUrl} = this.state;

		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined style={{ background: 'red' }} /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}></div>
			</div>
		);
		return(
			
			<Body1Wrapper>
				<TitleWrapper>
				<h1>Edit Researcher</h1>
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
						<text style={{ fontWeight:"bold",color: '#4682B4' }}>Click on the photo to change</text>


						<br />
						<br />
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="Full Name" style={{fontSize:"25px"}}>Full Name</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<Input readOnly type={'text'}  id={'Full Name'} name={'Full Name'}style={{width: '60%', height: 30}} value={this.state.fullname}/>
						<text>&emsp;&emsp;</text>
						<Button style={{width: "10%", color:"white", fontWeight:"bold", background: "#3399ff"}} onClick={this.showModal1}>modify</Button>
						<Modal
							title="Enter full name"
							visible={this.state.Modal1visible}
							onOk={this.handleModal1Ok}
							confirmLoading={this.state.confirmLoading}
							onCancel={this.handleModal1Cancel}
						>
							<Input onChange={this.onFullNameEnter} type={'text'} allowClear id={'Full Name'} name={'Full Name'}style={{width: '60%', height: 30}} defaultValue={this.state.fullname}/>
						</Modal>

							<br />
						<br />


						<div align={'center'}>
							<label htmlFor="Description" style={{fontSize:"25px"}}>Description </label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<TextArea readOnly rows={3} type={'text'} allowClear id={'Description'} name={'Description'} style={{width: '60%', height: 120}} value={this.state.description}/>
						<text>&emsp;&emsp;</text>
						<Button style={{width: "10%", color:"white", fontWeight:"bold", background: "#3399ff"}} onClick={this.showModal2}>modify</Button>
						<Modal
							title="Enter description"
							visible={this.state.Modal2visible}
							onOk={this.handleModal2Ok}
							confirmLoading={this.state.confirmLoading}
							onCancel={this.handleModal2Cancel}
						>
							<Input onChange={this.onDescriptionEnter} type={'text'} allowClear id={'description'} name={'description'}style={{width: '60%', height: 30}} defaultValue={this.state.description}/>
						</Modal>
						<br />
						<br />



						<div align={'center'}>
							<label htmlFor="Email" style={{fontSize:"25px"}}>Email</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						<Input readOnly type={'text'} id={'Email'} name={'Email'} style={{width: '60%', height: 30}} value={this.state.email}/>
						<text>&emsp;&emsp;</text>
						<Button style={{width: "10%", color:"white", fontWeight:"bold", background: "#3399ff"}} onClick={this.showModal3}>modify</Button>
						<Modal
							title="Enter email"
							visible={this.state.Modal3visible}
							onOk={this.handleModal3Ok}
							confirmLoading={this.state.confirmLoading}
							onCancel={this.handleModal3Cancel}
						>
							<Input onChange={this.onEmailEnter} type={'text'} allowClear id={'email'} name={'email'}style={{width: '60%', height: 30}} defaultValue={this.state.email}/>
						</Modal>
						<br />
						<br />


						<div align={'center'}>
							<label htmlFor="full_name" style={{fontSize:"25px"}}>Password</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						<Input.Password readOnly type={'password'} id={'Password'} name={'Password'} style={{width: '60%', height: 30}} value={this.state.password}/>
						<text>&emsp;&emsp;</text>
						<Button style={{width: "10%", color:"white", fontWeight:"bold", background: "#3399ff"}} onClick={this.showModal4}>modify</Button>
						<Modal
							title="Enter password"
							visible={this.state.Modal4visible}
							onOk={this.handleModal4Ok}
							confirmLoading={this.state.confirmLoading}
							onCancel={this.handleModal4Cancel}
						>
							<Input.Password onChange={this.onPasswordEnter} type={'password'} allowClear id={'password'} name={'password'}style={{width: '60%', height: 30}} defaultValue={this.state.password}/>
							<p>At least 6 characters long</p>
						</Modal>
						<br />
						<br />


						<div>
							<Button className="backButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherList')}>Back</Button>

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

