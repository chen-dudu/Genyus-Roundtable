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
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import PodManager from "../../../FoundationLayer/PodModel/PodManager";
import {ButtonWrapper} from "../../Admin/ResearcherList/ResearcherList.style";
import {CloseOutlined, CheckOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import firebase from 'firebase';




const getUser = firebase.functions().httpsCallable('getUser');

class Body1 extends React.Component {
	constructor(props) {
		super(props)


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



//https://auth.calendly.com/oauth/token?client_id=qJWDGzV1-0Jzw5QHusOPv8yGdPZ24RiBJJs_-qwWe_U&client_secret=-0nkGp3XFXEnvsDS8xVNKMXJdTO4xaIu16OlZh24LEw&code=68YfgP63JYS4nLs0uYAd58WDOtwBL5LoPBl8dhY0XEE&redirect_uri=https://genyus-roundtables.web.app/



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
							loading : false,
						});
						console.log(this.state.researcherName);
						console.log(this.state.researcherDescription);
						if(result.data.photoURL){
							UserManager.getAvatar(result.data.photoURL)
								.then(result =>{
									this.setState({
										researcherAvatar : result,
										// loading : false,
									});
									console.log(this.state.researcherAvatar);

								})
								.catch(error => {
									console.error(error);
								});
						}else{
							this.setState({
								// loading : false,
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