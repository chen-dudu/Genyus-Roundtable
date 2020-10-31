import React from 'react';
import ReactDOM from 'react-dom';
import {
	Body1Wrapper,
	Body2Wrapper,
	BodyWrapper, ProfileWrapper
} from './PodLandingPage.style';
import Img from '../../../img/person.gif';
import { withRouter } from "react-router-dom";
import { InlineWidget } from "react-calendly"
import {List, Avatar, Button, Spin, message, Switch, Empty} from 'antd';
import UserManager from "../../../DataModel/UserModel/UserManager";
import PodManager from "../../../DataModel/PodModel/PodManager";
import {ButtonWrapper} from "../../AdminUI/ResearcherList/ResearcherList.style";
import {CloseOutlined, CheckOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import firebase from 'firebase';


/**
 * a function that get a user with given user id
 * @type {firebase.functions.HttpsCallable}
 */

const getUser = firebase.functions().httpsCallable('getUser');

/**
 *@Description: a react component that renders the body of the PodLandingPage
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
		const query = this.props.history.location.search;
		const pid = query.substr(5);
		console.log(this.props);
		this.state = {
			pid : pid,
			researcherUid : '',
			researcherName : "",
			researcherDescription : "",
			researcherAvatar : "",
			calendlyLink : "",
			podTitle : "",
			podDescription : "",
            loading : true,
		}
		this.getPodDetail(this.state.pid);
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
							loading : false,
						});
						if(result.data.photoURL){
							UserManager.getAvatar(result.data.photoURL)
								.then(result =>{
									this.setState({
										researcherAvatar : result,
									});
								})
								.catch(error => {
									console.error(error);
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
	 * render the JSX elements
	 * @returns {JSX.Element} including a pod title, pod description, a login button, researcher avatar,
	 * researcher name, researcher description
	 */
	render(){
		return(
			<BodyWrapper>
				<Spin spinning={this.state.loading}>
			<Body1Wrapper>
				<h1>{this.state.podTitle}</h1>
				<h2>Pod Description</h2>
				<p className="description">{this.state.podDescription}</p>
				<br />
				<h2>Login to view Available Sessions</h2>
				<Button className="login" style={{left:"43.3%",width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push({pathname:'/Login', search:"?pid="+this.state.pid})}>Login</Button>
				<br />
				<br />
			</Body1Wrapper>
			</Spin>
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
			</BodyWrapper>
		)
	}
}

export default withRouter(Body1);