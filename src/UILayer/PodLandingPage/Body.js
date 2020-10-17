import React from 'react';
import ReactDOM from 'react-dom';
import {
	Body1Wrapper,
	SubmitButton,
	BodyLeftWrapper,
	BodyRightWrapper,
	Body2Wrapper,
	BodyWrapper, ProfileWrapper
} from './PodLandingPage.style';
import Img from '../../img/person.gif';
import { withRouter } from "react-router-dom";
import { InlineWidget } from "react-calendly"
import {List, Avatar, Button, Spin, message, Switch} from 'antd';
import UserManager from "../../FoundationLayer/UserModel/UserManager";
import PodManager from "../../FoundationLayer/PodModel/PodManager";
import {ButtonWrapper} from "../Admin/ResearcherList/ResearcherList.style";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';






class Body1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pid : this.props.match.params.podid,
			researcherName : "",
			researcherDescription : "",
			researcherAvatar : "",
			calendlyLink : "",
			podTitle : "",
			podDescription : "",
			isCheck : true,

			change : "change"
		}
		this.getPodDetail(this.state.pid);
		this.onChange = this.onChange.bind(this);





	}



//https://auth.calendly.com/oauth/token?client_id=qJWDGzV1-0Jzw5QHusOPv8yGdPZ24RiBJJs_-qwWe_U&client_secret=-0nkGp3XFXEnvsDS8xVNKMXJdTO4xaIu16OlZh24LEw&code=68YfgP63JYS4nLs0uYAd58WDOtwBL5LoPBl8dhY0XEE&redirect_uri=https://genyus-roundtables.web.app/


	getPodDetail = (pid) => {
		PodManager.getPod(pid)
			.then(response =>{
				this.setState({calendlyLink : response._calendlyLink, podTitle : response._title })

			})
			.catch(error =>{
				console.log("pod "+error);
			})
	}



	render(){


		return(
			<BodyWrapper>
			<Body1Wrapper>


				<h1>{this.state.podTitle}</h1>
				<h2>Pod Description</h2>
				<p className="description">Meaningful Vacation: More About Recovery
					<br/>10.26: 13:00-14:00
					<br/>To Be Continue: More About Recovery
					<br/>11.2: 10:00-11:00</p>
				<h2>Login to view Available Sessions</h2>
				<Button className="login" style={{marginLeft:"43%",width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push({pathname:'/Login',state:{pid:this.state.pid,}})}>Login</Button>
				<br />
				<br />





			</Body1Wrapper>
				<Body2Wrapper>
					<br />

					<ProfileWrapper>
						<Avatar size={120} src={"https://firebasestorage.googleapis.com/v0/b/genyus-roundtables.appspot.com/o/avatars%2F4I7MGo3ayseEBsxYRbEtq3uO2jX2%2FPerez.png?alt=media&token=649deac9-1dea-4415-a0ee-a04b330bd16d"}></Avatar>
					</ProfileWrapper>

					<br />



					<h2>Researcher Information</h2>
					<p className="fullname">Joan Perez</p>
					<p className="description">Joan Perez is a stroke researcher working at Monash University. She's been in the field for over 15 years, and has been working with Genyus for the last 2 years!</p>
					<br />
					<br />
					<br />


				</Body2Wrapper>

			</BodyWrapper>


		)
	}
}

// class Body2 extends React.Component {
// 	render(){
// 		return(
// 			<Body2Wrapper>
// 			    <br />
// 				<h1>Genyus Roundtable Is...</h1>
// 				<p>·...An online peer-led focus group</p>
// 				<p>·...Led by fellow survivors</p>
// 				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
// 				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
// 				<br/>
// 				<br/>
// 			</Body2Wrapper>
//
//
// 		)
// 	}
// }




export default withRouter(Body1);