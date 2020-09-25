import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper,TitleWrapper,BodyWrapper} from './ResearcherCreate.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Input, text,Avatar, Button} from 'antd';
import noteImg from "../../img/note.png";
import {UserOutlined} from "@ant-design/icons";
import UserManager from "../../DataModel/UserModel/UserManager";


const CLASS_NAME = "Admin/ResearcherCreate/Body";
const { TextArea } = Input;


class Body extends React.Component {
	constructor(props) {
		super(props);
		this.signup = this.signup.bind(this);
		this.onEmailEnter = this.onEmailEnter.bind(this);
		this.onPasswordEnter = this.onPasswordEnter.bind(this);
		this.onDescriptionEnter = this.onDescriptionEnter.bind(this);
		this.onFullnameEnter = this.onFullnameEnter.bind(this);
		this.state = {
			img : Img,
			Fullname: '',
			description: '',
			email:'',
			password:'',
			nickname:''
		};
	}
	signup(e) {
		e.preventDefault();
		console.log('information of a researcher', this.state);

		// UserManager.signup(this.state.email, this.state.password, this.state.full_name, this.state.nick_name,"researcher", this.state.description)
		// 	.then(response => {
		// 		this.props.history.push('/Admin/ResearcherList');
		// 	})
		// 	.catch(err => {
		// 		console.error(`${CLASS_NAME}| create | failed to create a researcher with email ${this.state.email}`);
		// 		alert(err);
		// 	});
	}



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
		this.setState({Fullname: e.target.value});
	}




	render(){
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
						<div align={'center'}>
							<label htmlFor="Photo" style={{fontSize:"25px"}}>Photo</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						<Avatar icon={<UserOutlined />}  size={150}/>
						<text>&emsp;&emsp;&emsp;</text>
						<Button style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" >Upload picture</Button>

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
							<Button className="cancelButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherList')}>Cancel</Button>
							<Button className="confirmButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={this.signup}>Confirm</Button>
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

