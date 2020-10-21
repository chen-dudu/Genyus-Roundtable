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
import Img from '../../../img/person.gif';
import { withRouter } from "react-router-dom";
import { InlineWidget } from "react-calendly"
import {List, Avatar, Button, Spin, message, Upload} from 'antd';
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import PodManager from "../../../FoundationLayer/PodModel/PodManager";
import {ButtonWrapper} from "../../Admin/ResearcherList/ResearcherList.style";

import firebase from 'firebase';




const getUser = firebase.functions().httpsCallable('getUser');

class Body1 extends React.Component {
	constructor(props) {
		super(props);
		const query = this.props.location.search;
		const pid = query.substr(5);

		this.state = {
			pid : pid,
			researcherUid : '',
			researcherName : "",
			researcherDescription : "",
			researcherAvatar : "",
			calendlyLink : "",
			loading : true,
		}
		this.getPodDetail(this.state.pid);



	}




	getPodDetail = (pid) => {
		PodManager.getPod(pid)
			.then(response =>{
				this.setState({
					calendlyLink : response._calendlyLink,
					podTitle : response._title,
					podDescription : response._description,

				});
				return getUser( {uid: response.researcher})
					.then(result => {
						this.setState({
							researcherName : result.data.fullname,
							researcherDescription : result.data.description,
						});
						console.log(this.state.researcherName);
						console.log(this.state.researcherDescription);
						if(result.data.photoURL){
							UserManager.getAvatar(result.data.photoURL)
								.then(result =>{
									this.setState({
										researcherAvatar : result,
										loading : false,
									});
									console.log(this.state.researcherAvatar);

								})
								.catch(error => {
									console.error(error);
								});
						}else{
							this.setState({
								loading : false,
							});
						}
					})
					.catch(error => {
						console.error(error);
					});
			})
			.catch(error =>{
				console.log(error);
			});
	}


	render(){
		return(
			<>
				<Spin spinning={this.state.loading}>
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
						<Avatar size={120} src={this.state.researcherAvatar}></Avatar>
					</ProfileWrapper>
					<br />
					<h2>Researcher Information</h2>
					<p className="fullname">{this.state.researcherName}</p>
					<p className="description">{this.state.researcherDescription}</p>
					<br />
					<br />
					<br />
				</Body2Wrapper>
				</Spin>

			</>


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