import React, {useState} from 'react';
import {Body1Wrapper} from './Notification.style';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {withRouter} from "react-router-dom";
import UserManager from '../DataModel/UserModel/UserManager';
import NotificationManager from "../DataModel/NotificationModel/NotificationManager";

class Body extends React.Component {

	constructor(props) {
		super(props);
		this.getNotification();
		this.state = {title: null, time: null, des: null};
	}

	// state = {
	// 	loading: false,
	// };
	//
	// onChange = checked => {
	// 	this.setState({ loading: !checked });
	// };


	getNotification = () => {
		UserManager.getCurrentUser()
			.then(user => {
				console.log('getCurrentUser successful');;

				if (user.notifications) {
					console.log('have notification');
					console.log('set notification');
					let notification;
					for (notification of user.notifications) {
						NotificationManager.getNotification(notification)
							.then(notif => {
								console.log(notif.title);
								console.log(notif.timeReceived);
								console.log(notif.description);
								const d = new Date(notif.timeReceived.seconds).toString();
								this.setState({title: notif.title, time: d, des: notif.description});
								// this.props.setTitle(notif.title);
								// this.props.setTime(notif.timeReceived);
								// this.props.setDes(notif.description);
								console.log(this.state.title);
								console.log(this.state.time);
								console.log(this.state.des);
								console.log("set successful");
							}).catch(error => {
							console.log(error);
						});
					}
				}


			})
			.catch(error => {
				console.log(error);
			});
		console.log('print notification at the end');
		console.log('print state information');
	};

	render() {
		return (
			<Body1Wrapper>
				<h1>Notifications</h1>
				<br></br> <br></br> <br></br>
				<Card style={{width: 1000, borderColor:"red", background: "transparent",
					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left"}}>{this.state.title}</h1>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>{this.state.time}</h1>
					<br></br>
					<br></br>
					<p style={{color: "black", fontSize: "20px"}}>{this.state.des}</p>
					<Button style={{background: "#3399ff", borderRadius: 5,
						width: "20%", height: 40, fontWeight: "bold",
						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
						fontSize: 15, color: "white"}}
							href="\ViewAcceptedSession"
					>Go To Event Page</Button>
				</Card>
				<br></br> <br></br>
				{/*<Card style={{width: 1000, borderColor:"red", background: "transparent",*/}
				{/*	borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"left",*/}
				{/*		float:"left"}}>Event Update for 'Meaningful Vocation: Stroke Recovery'</h1>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<p style={{color: "black", fontSize: "20px"}}> Hi Genyuses! This session is coming up fast!*/}
				{/*		Just a reminder that the session has been finalised for 6:00 next week and we're excited*/}
				{/*		to see you all there! Joan has ...*/}
				{/*		Click to go to the event page to read the whole update!</p>*/}
				{/*	<Button style={{background: "#3399ff", borderRadius: 5,*/}
				{/*		width: "20%", height: 40, fontWeight: "bold",*/}
				{/*		boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*		fontSize: 15, color: "white"}}*/}
				{/*			href="\ViewAcceptedSession"*/}
				{/*	>Go To Event Page</Button>*/}
				{/*</Card>*/}
				{/*<br></br> <br></br>*/}
				{/*<Card style={{width: 1000, borderColor:"red", background: "transparent",*/}
				{/*	borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"left",*/}
				{/*		float:"left"}}>Signup for Session Completed</h1>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 1.00pm</h1>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<p style={{color: "black", fontSize: "20px"}}> Thanks for signing up for the event*/}
				{/*		'Meaningful Vocation: Stroke Recovery'.*/}
				{/*		Click to go to the event page to view details or alter your availabilities!</p>*/}
				{/*	<Button style={{background: "#3399ff", borderRadius: 5,*/}
				{/*		width: "20%", height: 40, fontWeight: "bold",*/}
				{/*		boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*		fontSize: 15, color: "white"}}*/}
				{/*			href="\ViewAcceptedSession"*/}
				{/*	>Go To Event Page</Button>*/}
				{/*</Card>*/}
				{/*<br></br> <br></br>*/}
			</Body1Wrapper>

		)
	}
}

export default withRouter(Body);