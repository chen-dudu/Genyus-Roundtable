import React, {useState} from 'react';
import {Body1Wrapper, ListWrapper} from './Notification.style';
import {Button, List, Spin} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {withRouter} from "react-router-dom";
import UserManager from '../DataModel/UserModel/UserManager';
import NotificationManager from "../DataModel/NotificationModel/NotificationManager";

class Body extends React.Component {

	state = {
		loading : true,
		data : []
	};

	constructor(props) {
		super(props);
		this.getNotification();
		this.state = {
			nid: null,
			title: null,
			time: null,
			des: null};

	}

	getNotification = () => {
		UserManager.getCurrentUser()
			.then(user => {
				console.log('getCurrentUser successful');

				if (user.notifications) {
					let notifications = [];
					console.log('have notification');
					console.log('set notification');
					NotificationManager.getNotifications(user.notifications)
						.then(result => {
							console.log("get result");
							console.log(result);
							notifications = result;
							this.setState({data: notifications});
							this.setState({loading: false});
							console.log("get notifications");
							console.log(this.state.data)
						}).catch(err => {
						console.log("something wrong: ", err);
					})

					// let notification;
					// for (notification of user.notifications) {
					// 	NotificationManager.getNotification(notification)
					// 		.then(notif => {
					// 			console.log(notif.title);
					// 			console.log(notif.timeReceived);
					// 			console.log(notif.description);
					// 			const d = new Date(notif.timeReceived.seconds).toString();
					// 			this.setState({nid: notif.nid, title: notif.title, time: d, des: notif.description});
					// 			// this.props.setTitle(notif.title);
					// 			// this.props.setTime(notif.timeReceived);
					// 			// this.props.setDes(notif.description);
					// 			console.log(this.state.title);
					// 			console.log(this.state.time);
					// 			console.log(this.state.des);
					// 			console.log("set successful");
					// 		}).catch(error => {
					// 		console.log(error);
					// 	});
					// }
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

				<ListWrapper>
					<Spin spinning={this.state.loading}>
						<List
							bordered={false}
							itemLayout="vertical"
							dataSource={this.state.data}
							renderItem={item => (
								<div>
									<List.Item style={{borderColor:'red', borderWidth:4,borderStyle:'solid',borderRadius:20}}>
										{/*<List.Item.Meta style={{marginLeft:20}}*/}
										{/*				title={<h1 style={{color: "red", fontSize: "20px", textAlign:"left"}}>{item.title}</h1>}*/}
										{/*				description={<p style={{width:"70%", fontSize:20, wordBreak:"break-all"}}>{item.description}</p>}*/}
										{/*/>*/}
										{/*/!*<h1 style={{color: "red", fontSize: "20px", textAlign:"left", marginBottom:"10%"}}>{(new Date(item.timeReceived.seconds)).toString()}</h1>*!/*/}
										{/*<Button style={{background: "#3399ff", borderRadius: 5,*/}
										{/*	width: "20%", height: 40, fontWeight: "bold",*/}
										{/*	boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
										{/*	fontSize: 15, color: "white", marginLeft:'1%'}}*/}
										{/*		onClick={() => this.props.history.push('/ViewAcceptedSession/'+this.state.nid, this.state)}*/}
										{/*>Go To Event Page</Button>*/}
										<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left", marginLeft:'2%'}}>{item.title}</h1>
										<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right", marginRight:'2%'}}>{(new Date(item.timeReceived.seconds)).toString()}</h1>
										<br></br>
										<br></br>
										<p style={{color: "black", fontSize: "20px", marginLeft:'2%'}}>{item.description}</p>
										<Button style={{background: "#3399ff", borderRadius: 5,
											width: "20%", height: 40, fontWeight: "bold",
											boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
											fontSize: 15, color: "white", marginLeft:'2%'}}
												onClick={() => this.props.history.push({pathname: '/ViewAcceptedSession/'+item.nid, state:{item: item}})}>Go To Event Page</Button>
									</List.Item>
									<br/><br/></div>
							)}
						/>
					</Spin>
				</ListWrapper>

				{/*<Card style={{width: 1000, borderColor:"red", background: "transparent",*/}
				{/*	borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left"}}>{this.state.title}</h1>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>{this.state.time}</h1>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<p style={{color: "black", fontSize: "20px"}}>{this.state.des}</p>*/}
				{/*	<Button style={{background: "#3399ff", borderRadius: 5,*/}
				{/*		width: "20%", height: 40, fontWeight: "bold",*/}
				{/*		boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*		fontSize: 15, color: "white"}}*/}
				{/*			onClick={() => this.props.history.push('/ViewAcceptedSession/'+this.state.nid, this.state)}*/}
				{/*	>Go To Event Page</Button>*/}
				{/*</Card>*/}
				{/*<br></br> <br></br>*/}
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