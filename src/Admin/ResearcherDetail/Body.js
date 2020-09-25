import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper,TitleWrapper,BodyWrapper} from './ResearcherDetail.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Input, Avatar, Button,DatePicker} from 'antd';
import noteImg from "../../img/note.png";
import {UserOutlined} from "@ant-design/icons";



const { TextArea } = Input;



class Body extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
		img : Img,
		Fullname: 'Name 1',
		description: "description",
		joindate:"2020-01-01",
		email:"1234@123.com",
		password:123
    };
  }



	onFullNameEnter(e) {
		this.setState({Fullname: e.target.value});
	}

	onRePasswordEnter(e) {
		this.setState({re_password: e.target.value});
	}

	onFullNameEnter(e) {
		this.setState({full_name: e.target.value});
	}

	onPasswordEnter(e) {
		this.setState({nick_name: e.target.value});
	}



	render(){
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
						{/*<Input type="text" id="email" name="email" style={{width:"50%"}}></Input>*/}
						<Input type={'text'} placeholder={'Full name'} allowClear id={'Full Name'} name={'Full Name'}style={{width: '70%', height: 30}} defaultValue={this.state.Fullname}/>
						<br />
						<br />


						<div align={'center'}>
							<label htmlFor="Description" style={{fontSize:"25px"}}>Description </label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<TextArea rows={3} type={'text'} allowClear id={'Description'} name={'Description'} style={{width: '70%', height: 90}} defaultValue={this.state.description}/>
						<br />
						<br />



						<div align={'center'}>
							<label htmlFor="Email" style={{fontSize:"25px"}}>Email</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>

						<Input type={'text'} allowClear id={'Email'} name={'Email'} style={{width: '70%', height: 30}} defaultValue={this.state.email}/>
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="full_name" style={{fontSize:"25px"}}>Password</label>
						</div>
						<text>&emsp;&emsp;&emsp;&emsp;&emsp;</text>
						{/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
						<Input.Password type={'password'} placeholder={"Password"} id={'Password'} name={'Password'} style={{width: '70%', height: 30}} defaultValue={this.state.password}/>
						<br />
						<br />


						<div>
							<Button className="cancelButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherList')}>Cancel</Button>
							<Button className="confirmButton" style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherList')}>Confirm</Button>
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

