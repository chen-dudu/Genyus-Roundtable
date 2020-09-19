import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper,TitleWrapper,BodyWrapper} from './ResearcherDetail.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button} from 'antd';
import noteImg from "../../img/note.png";






class Body extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }



	render(){
		return(
			
			<Body1Wrapper>
				<TitleWrapper>
				<h1>Researcher Detail</h1>
				</TitleWrapper>
				<BodyWrapper>

					<div className="title">Researcher Detail</div>
					<br />
					<form>
						<div align={'center'}>
							<label htmlFor="Photo" style={{fontSize:"25px"}}>Photo</label>
						</div>

						<Avatar src={Img} size={80}/>
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="Full Name" style={{fontSize:"25px"}}>Full Name</label>
						</div>

						{/*<Input type="text" id="email" name="email" style={{width:"50%"}}></Input>*/}
						<input type={'text'} id={'Full Name'} name={'Full Name'}style={{width: '70%', height: 30}}/>
						<br />
						<br />


						<div align={'center'}>
							<label htmlFor="Description" style={{fontSize:"25px"}}>Description </label>
						</div>

						{/*<Input type="text" id="password" name="password" style={{width:"50%"}}></Input>*/}
						<input type={'text'} id={'Description'} name={'Description'} style={{width: '70%', height: 30}} />
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="Email" style={{fontSize:"25px"}}>Email</label>
						</div>

						{/*<Input type="text" id="confirmPassword" name="confirmPassword" style={{width:"50%"}}></Input>*/}
						<input type={'text'} id={'Email'} name={'Email'} style={{width: '70%', height: 30}} />
						<br />
						<br />
						<div align={'center'}>
							<label htmlFor="full_name" style={{fontSize:"25px"}}>Password</label>
						</div>

						{/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
						<input type={'password'} id={'Password'} name={'Password'} style={{width: '70%', height: 30}} />
						<br />
						<br />


						<div>
							<input align={'center'} id={'signup-button'} style={{background: "#3399ff", borderRadius: 5,
								width: "80%", height: 40, fontWeight: "bold",
								fontSize: 20, color: "white"}} type={'submit'} value={'Confirm'}/>
						</div>
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

