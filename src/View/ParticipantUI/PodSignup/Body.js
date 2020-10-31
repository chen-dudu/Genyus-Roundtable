import React from 'react';
import {
	Body1Wrapper,
	Body2Wrapper,
	ProfileWrapper
} from './PodSignup.style';
import { withRouter } from "react-router-dom";
import { CalendlyEventListener } from "react-calendly"
import {Avatar, Button, Spin} from 'antd';
import UserManager from "../../../DataModel/UserModel/UserManager";
import PodManager from "../../../DataModel/PodModel/PodManager";
import firebase from 'firebase';


/**
 * a function that get a user with given user id
 * @type {firebase.functions.HttpsCallable}
 */
const getUser = firebase.functions().httpsCallable('getUser');

/**
 *@Description: a react component that renders the body of the PodSignup page
 */
class Body1 extends React.Component {

	/**
	 * define the state needed when rendering the page
	 * @param props React predefined props
	 */
	constructor(props) {
		super(props)
		/**
		 * get the pod id from url
		 */
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

	/**
	 * a function to signup a participant for a pod
	 */
    podSignup = () => {
		PodManager.signup(this.state.pid)
			.then(result => {
				window.alert("You have successfully scheduled! Click Back Button to view your homepage.")
			})
			.catch(err => {
				console.log(err);
			})
	}

	/**
	 * a function to get a pod with given pod id
	 * @param pid the pod id
	 */
	getPodDetail = (pid) => {
		PodManager.getPod(pid)
			.then(response =>{
				this.setState({
					calendlyLink : response._calendlyLink,
					podTitle : response._title,
					podDescription : response._description,
				});
				/**
				 * get the researcher information with the given researcher id
				 */
				return getUser( {uid: response.researcher})
					.then(result => {
						this.setState({
							researcherName : result.data.fullname,
							researcherDescription : result.data.description,
						});
						if(result.data.photoURL){
							UserManager.getAvatar(result.data.photoURL)
								.then(result =>{
									this.setState({
										researcherAvatar : result,
										loading : false,
									});
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
	/**
	 * a function to render the Calendly component
	 * @returns {JSX.Element} return a embed component of calendly with an event listener
	 * the event listener will call the podSignup function when listen to the onEventScheduled event
	 */
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

	/**
	 * render the JSX elements
	 * @returns {JSX.Element} including a Calendly component, a back button and the researcher information
	 */
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
					</div>
				<br />
				<br />
			</Body1Wrapper>
				<Body2Wrapper>
					<br />
					<ProfileWrapper>
						<Avatar size={120} src={this.state.researcherAvatar}/>
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

export default withRouter(Body1);