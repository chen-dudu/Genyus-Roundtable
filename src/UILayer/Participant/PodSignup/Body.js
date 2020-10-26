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
import {InlineWidget, PopupText, PopupWidget, CalendlyEventListener} from "react-calendly"
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

    podSignup = () => {
		PodManager.signup(this.state.pid)
			.then(result => {
				window.alert("You have successfully scheduled! Click Back Button to view your homepage.")
			})
			.catch(err => {
				console.log(err);
			})
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

	renderCalendly = () => {
		if(this.state.loading === false)


		return <>

			<CalendlyEventListener
				onEventScheduled={()=>{this.podSignup()}}
			>
				<div
					style={{
						height: '700px',
						minWidth: '320px',
					}}
				>
					<iframe
						frameBorder="0"
						height="100%"
						src={this.state.calendlyLink+"?embed_domain=localhost:3000&embed_type=Inline"}
						width="100%"
					/>
				</div>
			</CalendlyEventListener>
		</>

	}




	render(){

		return(
			<>
				<Spin spinning={this.state.loading}>
			<Body1Wrapper>


					<div id="Calendly">

						{this.renderCalendly()}
						<Button className="backButton" style={{marginLeft:"43.4%",width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary"
								onClick={()=>{
							this.props.history.push("ParticipantHomepage")

								}}>Back</Button>

						{/*/!*<InlineWidget*!/*/}
						{/*			// pageSettings={{*/}
						{/*			// backgroundColor: 'fffff0',*/}
						{/*			// hideEventTypeDetails: false,*/}
						{/*			// hideLandingPageDetails: false,*/}
						{/*			// primaryColor: '00a2ff',*/}
						{/*			// textColor: '4d5055'*/}
						{/*			// }}*/}


						{/*			styles={{*/}
						{/*				height: '700px'*/}
						{/*			}}*/}
						{/*			url={link}*/}


						{/*/>*/}

						{/*<PopupWidget style= url={this.state.calendlyLink}>Schedule</PopupWidget>*/}
						{/*<div className="calendly-inline-widget"*/}
						{/*	 data-url="https://calendly.com/genyus-roundtable/meaningful-vocation-stroke-recovery"*/}
						{/*	 style={{minWidth: 320, height:630}}></div>*/}
						{/*<script type="text/javascript"*/}
						{/*		src="https://assets.calendly.com/assets/external/widget.js"></script>*/}





					</div>

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