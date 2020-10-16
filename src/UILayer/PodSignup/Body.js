import React from 'react';
import ReactDOM from 'react-dom';
import {
	Body1Wrapper,
	SubmitButton,
	BodyLeftWrapper,
	BodyRightWrapper,
	Body2Wrapper,
	BodyWrapper, ProfileWrapper
} from './PodSignup.style';
import Img from '../../img/person.gif';
import { withRouter } from "react-router-dom";
import { InlineWidget } from "react-calendly"
import {List, Avatar, Button, Spin, message, Upload} from 'antd';
import UserManager from "../../FoundationLayer/UserModel/UserManager";
import PodManager from "../../FoundationLayer/PodModel/PodManager";
import {ButtonWrapper} from "../Admin/ResearcherList/ResearcherHomePage.style";



class Body1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pid : this.props.match.params.podid,
			researcherName : "",
			researcherDescription : "",
			researcherAvatar : "",
			calendlyLink : "",
		}
		this.getPodDetail(this.state.pid);


	}




	getPodDetail = (pid) => {
		PodManager.getPod(pid)
			.then(response =>{
				this.setState({calendlyLink : response.calendlyLink});
			})
			.catch(error =>{
				console.log("pod "+error);
			})
	}

	render(){

		return(
			<BodyWrapper>
			<Body1Wrapper>


					<div className="Calendly">
						<InlineWidget url={this.state.calendlyLink} />
					</div>
				<Button className="backButton" style={{marginLeft:"43%",width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/ParticipantHomePage')}>Back</Button>
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