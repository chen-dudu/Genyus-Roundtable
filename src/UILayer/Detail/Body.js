import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import {Body2Wrapper, BodyWrapper, Body3Wrapper, ListWrapper} from './Detail.style';
import {Button, Card, Tooltip, Avatar, Spin, List, Upload, message} from 'antd';
import 'antd/dist/antd.css';
import {Steps, Row, Col} from 'antd';
import {QuestionOutlined, UserOutlined} from '@ant-design/icons';
import Img from "../../img/person.gif";
import UserManager from '../../FoundationLayer/UserModel/UserManager';
import NotificationManager from "../../FoundationLayer/NotificationModel/NotificationManager";
import SessionManager from "../../FoundationLayer/SessionModel/SessionManager";
import PodManager from "../../FoundationLayer/PodModel/PodManager";
import {notification} from "antd/es";

// const { Step } = Steps;
// const style = {background: 'white', padding: '8px 0'};

class Body extends React.Component {

	constructor(props) {
		super(props);

		const query = this.props.history.location.search;
		const pid = query.substr(5);
		console.log(pid);

		this.state = {
			pid: pid,
			title: null,
			description: null,
			loading: true,
			researcher: null,
			youtubeLink: null,
			researcherFullName: null,
			researcherDes: null,
			researcherAvatar: null,
			participates: null,
			notifications: [],
			isParti: false,
			note: null
		}
		console.log("state pid")
		console.log(this.state.pid);
		this.getPod();
		this.upload.onChange = this.upload.onChange.bind(this);
	}

	getPod = () => {
		console.log("check pid");
		console.log(this.state.pid);
		PodManager.getPod(this.state.pid)
			.then(result => {
				console.log('get Pod successful');
				console.log('get Researcher ID');
				console.log(result.researcher);
				console.log('get Notification');
				console.log(result.notifications)
				this.setState({
					title: result.title,
					description: result.description,
					researcher: result.researcher,
					participates: result.participants,
					notifications: result.notifications,
					note: result.notes,
					loading: false
				})
				console.log("get pod note");
				console.log(this.state.note);
				console.log(this.state.researcher);
				UserManager.getUser(this.state.researcher)
					.then(res => {
						console.log('get Researcher successful');
						console.log(typeof(res));
						console.log(Object.keys(res));
						console.log(Object.values(res));
						this.setState({
							researcherFullName: Object.values(res)[3],
							researcherDes: Object.values(res)[2],
							researcherAvatar: Object.values(res)[1]
						})

						if (res[7] == 'participant') {
							this.setState({
								isPart: true
							})
						} else {
							this.setState({
								isPart: false
							})
						}
						console.log('get isPart');
						console.log(this.state.isPart);

						console.log('get Researcher avatar');
						console.log(this.state.researcherAvatar);
						if (this.state.researcherAvatar) {
							UserManager.getAvatar(this.state.researcherAvatar)
								.then(photo => {
									console.log('getAvatar successful');
									console.log('setImage successful');
									// this.setState({imageUrl: photo});
									console.log('show photo');
									console.log(photo);
									this.props.setImage(photo);
								})
								.catch(error => {
									console.log(error);
								});
						}
					}).catch(error => {
					console.log(error);
				});

				console.log("start to get notis");
				console.log(typeof(result.notifications))
				console.log(result.notifications)
				let list2 = [];
				result.notifications.forEach(function (item,index,array){
					if(item){
						list2.unshift(item);
					}
				});
				console.log("check list");
				console.log(list2);
				NotificationManager.getNotifications(list2)
					.then(notis => {
						console.log('get notifications successful');
						console.log(notis);

						this.setState({
							notifications: notis
						})
					}).catch(error => {
					console.log(error);
				});

			}).catch(error => {
			console.log(error);
		});
	}

	formatDate(date) {
		let d = new Date(date);

		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		let year = d.getFullYear();
		let hour = d.getHours();
		let min = ('0'+d.getMinutes()).slice(-2);

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		let res = [year, month, day].join('-');
		res = res.concat(' ');
		res = res.concat(hour.toString());
		res = res.concat(':');
		res = res.concat(min.toString());

		return res;
	}

	upload = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
				console.log("Get file successful");
				console.log(info.file.originFileObj);
				PodManager.upload(info.file.originFileObj, this.state.pid)
					.then(response => {
						console.log('update successful');
					})
					.catch(error => {
						console.log(error);
					});
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	render() {

		return (
			<div style={{minWidth:500}}>
				<Body3Wrapper>
					<h1>Pod Details</h1>
					<br></br>
					<br></br>
					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>{this.state.title}</h2>
					<h3>{this.state.description}</h3>

					<br></br>
					<br></br>
					<br></br>
					<br></br>

					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>About the Researcher</h2>
					<h3> Researcher Name: {this.state.researcherFullName}</h3>
					<h3 style={{marginRight:"30%"}}>{this.state.researcherDes}</h3>
					<Avatar src={this.props.image} size={96} style={{position:"absolute", left: '80%', bottom:"50%",
						margin: '2% auto'}} icon={<UserOutlined/>} />
					<br/>
					<br/>

					<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Event Updates:</h1>
					<br></br> <br></br>

					<ListWrapper style={{width: '70%', margin: 'auto'}}>
						<Spin spinning={this.state.loading}>
							<List
								bordered={false}
								itemLayout="vertical"
								dataSource={this.state.notifications}
								renderItem={item => (
									<div>
										<List.Item style={{borderColor:'red', borderWidth:4,borderStyle:'solid',borderRadius:20}}>
											<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left", marginLeft:'2%'}}>{item.title}</h1>
											<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right", marginRight:'2%'}}>{this.formatDate(item.timeReceived)}</h1>
											<br></br>
											<br></br>
											<p style={{color: "black", fontSize: "20px", marginLeft:'2%'}}>{item.description}</p>
										</List.Item>
										<br/><br/></div>
								)}
							/>
						</Spin>
					</ListWrapper>

					<br></br> <br></br>

					<div style={{position:"absolute", bottom:"50%", right:"45%"}}>
						<iframe id="u35_input" scrolling="auto" frameBorder="0" webkitallowfullscreen=""
								mozallowfullscreen="" allowFullScreen=""
								src={this.state.youtubeLink}></iframe>
					</div>

					<div style={{position:"absolute", bottom:"66%", right:"25%"}}>
						<iframe id="u35_input" scrolling="auto" frameBorder="0" webkitallowfullscreen=""
								mozallowfullscreen="" allowFullScreen=""
								src="https://www.youtube.com/embed/Xm_F_UBjrq8"></iframe>
					</div>

					<Button style={{background: "#3399ff", borderRadius: 5,
						width: "10%", height: 40, fontWeight: "bold",
						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
						fontSize: 15, color: "white", position:"absolute", bottom:"5%", right:"45%"}}
					>Download Notes</Button>

					{ this.state.isPart
						? null
						: <Upload {...this.upload} progress={{ strokeWidth: 2, }}>
							<Button className="manager" style={{background: "#3399ff", borderRadius: 5,
								width: "10%", height: 40, fontWeight: "bold",
								boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
								fontSize: 15, color: "white", position:"absolute", bottom:"5%", right:"75%"}}
							>Upload Notes</Button>
						</Upload>
					}

					<br></br> <br></br>
					<br></br> <br></br>

				</Body3Wrapper>
			</div>

		)
	}
}

export default withRouter(Body);

				{/*<BodyWrapper>*/}
				{/*	<h1>Roundtable Confirmation</h1>*/}
				{/*	<h2 style={{fontStyle:"italic"}}>Meaningful Vocation: Stroke Recovery Stories</h2>*/}

				{/*	<Steps*/}
				{/*		type="navigation"*/}
				{/*		current={3}*/}
				{/*		onChange={this.onChange}*/}
				{/*		className="site-navigation-steps"*/}
				{/*	>*/}
				{/*		<Step status="finish" title="Learn About Roundtable" />*/}
				{/*		<Step status="finish" title="Login or Sign Up" />*/}
				{/*		<Step status="finish" title="Complete Questionnaire" />*/}
				{/*		<Step status="process" title="Registration Complete" />*/}
				{/*	</Steps>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Your Confirmation</h1>*/}
				{/*	<br></br>*/}
				{/*</BodyWrapper>*/}
				{/*<Body2Wrapper style={{marginLeft:"auto", marginRight:"auto"}}>*/}
				{/*	<br />*/}
				{/*	<h1>Confirmation Details:</h1>*/}
				{/*	<br />*/}
				{/*	<Row*/}
				{/*		gutter={[5, 5]}*/}
				{/*		style={{marginLeft:"20px", marginRight:"40%"}}*/}
				{/*	>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*/}
				{/*				fontSize:"16px"}}>Your Status</div>*/}
				{/*		</Col>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center",*/}
				{/*				fontSize:"16px"}}>Signed up, you're ready to go!</div>*/}
				{/*		</Col>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*/}
				{/*				fontSize:"16px"}}>Date of Event</div>*/}
				{/*		</Col>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>*/}
				{/*				{this.state.time}</div>*/}
				{/*		</Col>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*/}
				{/*				fontSize:"16px"}}>Video Chat Link</div>*/}
				{/*		</Col>*/}
				{/*		<Col className="gutter-row" span={12}>*/}
				{/*			<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>*/}
				{/*				{this.state.zoomLink}</div>*/}
				{/*		</Col>*/}
				{/*		<Button style={{background: "red", borderRadius: 5, borderWidth: "0",*/}
				{/*			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*			width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"82%",*/}
				{/*			fontSize: 15, color: "white"}}>Add to Calendar</Button>*/}
				{/*		<br />*/}
				{/*		<Button style={{background: "red", borderRadius: 5, borderWidth: "0",*/}
				{/*			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*			width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"70%",*/}
				{/*			fontSize: 15, color: "white"}}>Edit Status</Button>*/}
				{/*		<br />*/}
				{/*	</Row>*/}
				{/*	<br />*/}
				{/*	<hr style={{color: "white", height: 0}} />*/}
				{/*	<br />*/}
				{/*	<h1>Your Signup Responses:</h1>*/}
				{/*	<br />*/}
				{/*	<Row*/}
				{/*		gutter={[5, 5]}*/}
				{/*		style={{marginLeft:"20px", marginRight:"40%"}}*/}
				{/*	>*/}

				{/*		<ListWrapper>*/}
				{/*			<Spin spinning={this.state.loading}>*/}
				{/*				<List*/}
				{/*					bordered={false}*/}
				{/*					itemLayout="horizontal"*/}
				{/*					dataSource={Object.keys(this.state.sessionQues)}*/}
				{/*					renderItem={item => (*/}
				{/*						<div>*/}
				{/*							<List.Item style={{borderColor:'red', borderWidth:0,borderStyle:'solid',borderRadius:20}}>*/}
				{/*								<Col className="gutter-row" span={12}>*/}
				{/*									<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*/}
				{/*										fontSize:"16px", marginBottom:"-5%"}}>{item}</div>*/}
				{/*								</Col>*/}
				{/*								<Col className="gutter-row" span={12}>*/}
				{/*									<div style={{background: 'white', padding: '8px 0', textAlign:"center",*/}
				{/*										fontSize:"16px", marginBottom:"-5%"}}>{this.state.sessionQues[item]}</div>*/}
				{/*								</Col>*/}
				{/*							</List.Item>*/}
				{/*						</div>*/}
				{/*						)}*/}
				{/*					/>*/}
				{/*			</Spin>*/}
				{/*		</ListWrapper>*/}

				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*!/*/}
				{/*		/!*		fontSize:"16px"}}>Are you willing for the data collected to be used for research*!/*/}
				{/*		/!*		purposes?</div>*!/*/}
				{/*		/!*</Col>*!/*/}
				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '20.5px 0', textAlign:"center",*!/*/}
				{/*		/!*		fontSize:"16px"}}>Yes</div>*!/*/}
				{/*		/!*</Col>*!/*/}

				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*!/*/}
				{/*		/!*		fontSize:"16px"}}>Have you suffered a stroke?</div>*!/*/}
				{/*		/!*</Col>*!/*/}
				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>*!/*/}
				{/*		/!*		Yes</div>*!/*/}
				{/*		/!*</Col>*!/*/}

				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",*!/*/}
				{/*		/!*		fontSize:"16px"}}>What is your current employment status?</div>*!/*/}
				{/*		/!*</Col>*!/*/}
				{/*		/!*<Col className="gutter-row" span={12}>*!/*/}
				{/*		/!*	<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>*!/*/}
				{/*		/!*		Employed full time</div>*!/*/}
				{/*		/!*</Col>*!/*/}

				{/*		<Button style={{background: "red", borderRadius: 5, borderWidth: "0",*/}
				{/*			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*			width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"40%",*/}
				{/*			fontSize: 15, color: "white"}}>Edit Responses</Button>*/}
				{/*		<br />*/}
				{/*	</Row>*/}
				{/*	<br />*/}
				{/*	<hr style={{color: "white", height: 0}} />*/}
				{/*	<br />*/}
				{/*	<br />*/}
				{/*	<Button style={{background: "red", borderRadius: 5, borderWidth: "0",*/}
				{/*		marginLeft:"35%", marginRight:"35%",*/}
				{/*		boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",*/}
				{/*		width: "30%", height: 40, fontWeight: "bold",*/}
				{/*		fontSize: 15, color: "white"}}>Download Researcher's Notes</Button>*/}
				{/*	<Tooltip>*/}
				{/*		<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"*/}
				{/*				style={{position:"absolute", left: "92%", bottom:"82%", borderColor:"red", }}/>*/}
				{/*		<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"*/}
				{/*				style={{position:"absolute", left: "61%", bottom:"68%", borderColor:"red", }}/>*/}
				{/*		<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"*/}
				{/*				style={{position:"absolute", left: "70%", bottom:"10%", borderColor:"red", }}/>*/}
				{/*	</Tooltip>*/}
				{/*	<br />*/}
				{/*	<br />*/}
				{/*	<br />*/}
				{/*	<br />*/}
				{/*</Body2Wrapper>*/}
				{/*<Card style={{width: 1000, borderColor:"red", background: "transparent",*/}
				{/*	borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"left",*/}
				{/*		float:"left"}}>Event Update: "Coming up Soon!"</h1>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<p style={{color: "black", fontSize: "20px"}}> Hi Genyuses! This session is coming up fast!*/}
				{/*		We're excited to see you all there next week! Joan has finalised the questions that will be*/}
				{/*		asked (see the event description!) and we're excited to see all your lovely faces!</p>*/}
				{/*</Card>*/}
				{/*<br></br> <br></br>*/}
				{/*<Card style={{width: 1000, borderColor:"red", background: "transparent",*/}
				{/*	borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"left",*/}
				{/*		float:"left"}}>Event Update: "Ready to go!"</h1>*/}
				{/*	<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>*/}
				{/*	<br></br>*/}
				{/*	<br></br>*/}
				{/*	<p style={{color: "black", fontSize: "20px"}}> Hey everyone! The event description has been*/}
				{/*		updated to include some of the questions that will be asked in the session! Have a*/}
				{/*		looksee if you're interested ♥</p>*/}
				{/*</Card>*/}

// class Body1 extends React.Component {
//
// 	render() {
// 		return (
// 			<BodyWrapper>
// 				<h1>Roundtable Confirmation</h1>
// 				<h2 style={{fontStyle:"italic"}}>Meaningful Vocation: Stroke Recovery Stories</h2>
//
// 				<Steps
// 					type="navigation"
// 					current={3}
// 					onChange={this.onChange}
// 					className="site-navigation-steps"
// 				>
// 					<Step status="finish" title="Learn About Roundtable" />
// 					<Step status="finish" title="Login or Sign Up" />
// 					<Step status="finish" title="Complete Questionnaire" />
// 					<Step status="process" title="Registration Complete" />
// 				</Steps>
// 				<br></br>
// 				<br></br>
// 				<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Your Confirmation</h1>
// 				<br></br>
// 			</BodyWrapper>
// 		)
// 	}
// }
//
// class Body2 extends React.Component {
// 	render() {
// 		return (
// 			<Body2Wrapper style={{marginLeft:"auto", marginRight:"auto"}}>
// 				<br />
// 				<h1>Confirmation Details:</h1>
// 				<br />
// 				<Row
// 					gutter={[5, 5]}
// 					style={{marginLeft:"20px", marginRight:"40%"}}
// 				>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>Your Status</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center",
// 							fontSize:"16px"}}>Signed up, you're ready to go!</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>Date of Event</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
// 							2/5/20,  6:30 pm</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>Video Chat Link</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
// 							https://zoom.com/join39436?pwd=iisbado8b</div>
// 					</Col>
// 					<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
// 						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
// 						width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"82%",
// 						fontSize: 15, color: "white"}}>Add to Calendar</Button>
// 					<br />
// 					<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
// 						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
// 						width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"70%",
// 						fontSize: 15, color: "white"}}>Edit Status</Button>
// 					<br />
// 				</Row>
// 				<br />
// 				<hr style={{color: "white", height: 0}} />
// 				<br />
// 				<h1>Your Signup Responses:</h1>
// 				<br />
// 				<Row
// 					gutter={[5, 5]}
// 					style={{marginLeft:"20px", marginRight:"40%"}}
// 				>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>Are you willing for the data collected to be used for research
// 							purposes?</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '20.5px 0', textAlign:"center",
// 							fontSize:"16px"}}>Yes</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>Have you suffered a stroke?</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
// 							Yes</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
// 							fontSize:"16px"}}>What is your current employment status?</div>
// 					</Col>
// 					<Col className="gutter-row" span={12}>
// 						<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
// 							Employed full time</div>
// 					</Col>
// 					<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
// 						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
// 						width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"40%",
// 						fontSize: 15, color: "white"}}>Edit Responses</Button>
// 					<br />
// 				</Row>
// 				<br />
// 				<hr style={{color: "white", height: 0}} />
// 				<br />
// 				<br />
// 				<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
// 					marginLeft:"35%", marginRight:"35%",
// 					boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
// 					width: "30%", height: 40, fontWeight: "bold",
// 					fontSize: 15, color: "white"}}>Download Researcher's Notes</Button>
// 				<Tooltip>
// 					<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
// 							style={{position:"absolute", left: "92%", bottom:"82%", borderColor:"red", }}/>
// 					<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
// 							style={{position:"absolute", left: "61%", bottom:"68%", borderColor:"red", }}/>
// 					<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
// 					style={{position:"absolute", left: "70%", bottom:"10%", borderColor:"red", }}/>
// 				</Tooltip>
// 				<br />
// 				<br />
// 				<br />
// 				<br />
// 			</Body2Wrapper>
// 		)
// 	}
// }
//
// class Body3 extends React.Component {
// 	state = {
// 		loading: false,
// 	};
//
// 	onChange = checked => {
// 		this.setState({ loading: !checked });
// 	};
//
// 	render() {
// 		return (
// 			<Body3Wrapper>
// 				<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Roundtable Details</h1>
// 				<br/>
//
// 				<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Session Information</h2>
// 				<h3>Session name : Meaningful Vocation</h3>
// 				<h3>In this session we'll be discussing how you've returned to meaningful vocation post stroke.
// 					We want to share stories about hurdles you've experienced and overcome, and how we could help
// 					remove those obstacles for future survivors!</h3>
//
// 				<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Available times</h2>
// 				<h3>The session will be run at the following times:</h3>
// 				<h3 style={{marginBottom:"-10px"}}>4/5/2020 - 6pm-8pm</h3>
// 				<h3 style={{marginBottom:"-10px"}}>6/5/2020 - 10am - 8am</h3>
// 				<h3>7/5/2020 6pm-8pm</h3>
//
// 				<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>About the Researcher</h2>
// 				<h3>Researcher Name: Joan Perez</h3>
// 				<h3 style={{marginRight:"30%"}}>Joan Perez is a stroke researcher working at Monash University.
// 					She's been in the field for over 15 years, and has been working with Genyus for the last 2 years!</h3>
// 				<Avatar src={this.props.image} size={128} style={{position:"absolute", left: '80%', bottom:"48%",
// 					margin: '2% auto'}} icon={<UserOutlined />} />
// 				<br/>
// 				<br/>
//
// 				<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Event Updates:</h1>
// 				<br></br> <br></br>
// 				<Card style={{width: 1000, borderColor:"red", background: "transparent",
// 					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
// 					<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
// 						float:"left"}}>Event Update: "Coming up Soon!"</h1>
// 					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>
// 					<br></br>
// 					<br></br>
// 					<p style={{color: "black", fontSize: "20px"}}> Hi Genyuses! This session is coming up fast!
// 						We're excited to see you all there next week! Joan has finalised the questions that will be
// 						asked (see the event description!) and we're excited to see all your lovely faces!</p>
// 				</Card>
// 				<br></br> <br></br>
// 				<Card style={{width: 1000, borderColor:"red", background: "transparent",
// 					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
// 					<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
// 						float:"left"}}>Event Update: "Ready to go!"</h1>
// 					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>
// 					<br></br>
// 					<br></br>
// 					<p style={{color: "black", fontSize: "20px"}}> Hey everyone! The event description has been
// 						updated to include some of the questions that will be asked in the session! Have a
// 						looksee if you're interested ♥</p>
// 				</Card>
// 				<br></br> <br></br>
//
//
// 			</Body3Wrapper>
// 		)
// 	}
// }

// getSession = () => {
// 	console.log("check sid");
// 	console.log(this.state.sid);
// 	SessionManager.getSession(this.state.sid)
// 		.then(result => {
// 			console.log('get Session successful');
// 			console.log(typeof(result.duration));
// 			console.log(typeof(result.questions));
// 			console.log(result.timeSlots);
// 			console.log(typeof(result.timeSlots));
// 			Object.keys(result.questions).forEach(key => {
// 				console.log("get questions key value");
// 				console.log(typeof(key));
// 				console.log(key);
// 				console.log(result.questions[key]);
// 			})
// 			Object.values(result.timeSlots).forEach(value => {
// 				console.log("get timeslot key value");
// 				console.log(typeof(value));
// 				console.log(value);
// 			})
// 			let list = []
// 			result.timeSlots.forEach(function (item,index,array){
// 				if(item){
// 					list.unshift(item);
// 				}
// 			});
// 			console.log("check list");
// 			console.log(list);
//
// 			this.setState({
// 				sessionDes: result.description,
// 				sessionDur: result.duration,
// 				sessionQues: result.questions,
// 				researcher: result.researchers,
// 				timeslot: list,
// 				sessionTitle: result.title,
// 				youtubeLink: result.youtubeLink,
// 				zoomLink: result.zoomLink,
// 				loading: false
// 			})
// 			console.log(this.state.timeslot);
// 			console.log(this.state.researcher);
//
// 			UserManager.getUser(this.state.researcher[0])
// 				.then(res => {
// 					console.log('get Researcher successful');
// 					console.log(typeof(res));
// 					console.log(Object.keys(res));
// 					console.log(Object.values(res));
// 					this.setState({
// 						researcherFullName: Object.values(res)[3],
// 						researcherDes: Object.values(res)[2],
// 						researcherAvatar: Object.values(res)[1]
// 					})
// 				}).catch(error => {
// 					console.log(error);
// 			});
//
// 			console.log("start to get notis");
// 			console.log(typeof(result.notifications))
// 			console.log(result.notifications)
// 			let list2 = [];
// 			result.notifications.forEach(function (item,index,array){
// 				if(item){
// 					list2.unshift(item);
// 				}
// 			});
// 			console.log("check list");
// 			console.log(list2);
// 			NotificationManager.getNotifications(list2)
// 				.then(notis => {
// 					console.log('get notifications successful');
// 					console.log(notis);
//
// 					this.setState({
// 						notifications: notis
// 					})
// 				}).catch(error => {
// 				console.log(error);
// 			});
//
// 		}).catch(error => {
// 		console.log(error);
// 	});
// }
//

//
// arrayToList(array) {
// 	let list = null;
// 	for (let i = array.length - 1; i >= 0; i--) {
// 		list = { value: array[i], rest: list };
// 	}
// 	return list;
// }