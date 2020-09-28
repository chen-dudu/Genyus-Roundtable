import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import {Body2Wrapper, BodyWrapper, Body3Wrapper} from './ViewAcceptedSession.style';
import {Button, Card, Tooltip, Avatar} from 'antd';
import 'antd/dist/antd.css';
import {Steps, Row, Col} from 'antd';
import {QuestionOutlined, UserOutlined} from '@ant-design/icons';
import {Body1Wrapper} from "../Notification/Notification.style";
import Img from "../img/person.gif";
import UserManager from '../DataModel/UserModel/UserManager';
import NotificationManager from "../DataModel/NotificationModel/NotificationManager";
import SessionManager from "../DataModel/SessionModel/SessionManager";

const { Step } = Steps;
const style = {background: 'white', padding: '8px 0'};

class Body extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nid: this.props.history.location.state.item.nid,
			title: this.props.history.location.state.item.title,
			description: this.props.history.location.state.item.description,
			time: (new Date(this.props.history.location.state.item.timeReceived.seconds)).toString(),
			sid: this.props.history.location.state.item.sid,

			loading: false,
			sessionDes: null,
			sessionDur: null,
			sessionQues: null,
			researcher: null,
			timeslot: null,
			youtubeLink: null,
			zoomLink: null
		}
		console.log(this.state.nid);
		this.getSession();
	}

	getSession = () => {
		SessionManager.getSession(this.state.sid)
			.then(result => {
				console.log('get Session successful');
				console.log(result.duration);
				// this.setState()
			})
	}

	render() {
		return (
			<div>
				<BodyWrapper>
					<h1>Roundtable Confirmation</h1>
					<h2 style={{fontStyle:"italic"}}>Meaningful Vocation: Stroke Recovery Stories</h2>

					<Steps
						type="navigation"
						current={3}
						onChange={this.onChange}
						className="site-navigation-steps"
					>
						<Step status="finish" title="Learn About Roundtable" />
						<Step status="finish" title="Login or Sign Up" />
						<Step status="finish" title="Complete Questionnaire" />
						<Step status="process" title="Registration Complete" />
					</Steps>
					<br></br>
					<br></br>
					<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Your Confirmation</h1>
					<br></br>
				</BodyWrapper>
				<Body2Wrapper style={{marginLeft:"auto", marginRight:"auto"}}>
					<br />
					<h1>Confirmation Details:</h1>
					<br />
					<Row
						gutter={[5, 5]}
						style={{marginLeft:"20px", marginRight:"40%"}}
					>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Your Status</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center",
								fontSize:"16px"}}>Signed up, you're ready to go!</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Date of Event</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								2/5/20,  6:30 pm</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Video Chat Link</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								https://zoom.com/join39436?pwd=iisbado8b</div>
						</Col>
						<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
							boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
							width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"82%",
							fontSize: 15, color: "white"}}>Add to Calendar</Button>
						<br />
						<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
							boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
							width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"70%",
							fontSize: 15, color: "white"}}>Edit Status</Button>
						<br />
					</Row>
					<br />
					<hr style={{color: "white", height: 0}} />
					<br />
					<h1>Your Signup Responses:</h1>
					<br />
					<Row
						gutter={[5, 5]}
						style={{marginLeft:"20px", marginRight:"40%"}}
					>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Are you willing for the data collected to be used for research
								purposes?</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '20.5px 0', textAlign:"center",
								fontSize:"16px"}}>Yes</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Have you suffered a stroke?</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								Yes</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>What is your current employment status?</div>
						</Col>
						<Col className="gutter-row" span={12}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								Employed full time</div>
						</Col>
						<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
							boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
							width: "20%", height: 40, fontWeight: "bold", position:"absolute", left: "70%", bottom:"40%",
							fontSize: 15, color: "white"}}>Edit Responses</Button>
						<br />
					</Row>
					<br />
					<hr style={{color: "white", height: 0}} />
					<br />
					<br />
					<Button style={{background: "red", borderRadius: 5, borderWidth: "0",
						marginLeft:"35%", marginRight:"35%",
						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
						width: "30%", height: 40, fontWeight: "bold",
						fontSize: 15, color: "white"}}>Download Researcher's Notes</Button>
					<Tooltip>
						<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
								style={{position:"absolute", left: "92%", bottom:"82%", borderColor:"red", }}/>
						<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
								style={{position:"absolute", left: "61%", bottom:"68%", borderColor:"red", }}/>
						<Button type="primary" shape="circle" icon={<QuestionOutlined />} size="large"
								style={{position:"absolute", left: "70%", bottom:"10%", borderColor:"red", }}/>
					</Tooltip>
					<br />
					<br />
					<br />
					<br />
				</Body2Wrapper>
				<Body3Wrapper>
					<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Roundtable Details</h1>
					<br/>

					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Session Information</h2>
					<h3>Session name : Meaningful Vocation</h3>
					<h3>In this session we'll be discussing how you've returned to meaningful vocation post stroke.
						We want to share stories about hurdles you've experienced and overcome, and how we could help
						remove those obstacles for future survivors!</h3>

					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Available times</h2>
					<h3>The session will be run at the following times:</h3>
					<h3 style={{marginBottom:"-10px"}}>4/5/2020 - 6pm-8pm</h3>
					<h3 style={{marginBottom:"-10px"}}>6/5/2020 - 10am - 8am</h3>
					<h3>7/5/2020 6pm-8pm</h3>

					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>About the Researcher</h2>
					<h3>Researcher Name: Joan Perez</h3>
					<h3 style={{marginRight:"30%"}}>Joan Perez is a stroke researcher working at Monash University.
						She's been in the field for over 15 years, and has been working with Genyus for the last 2 years!</h3>
					<Avatar src={this.props.image} size={128} style={{position:"absolute", left: '80%', bottom:"48%",
						margin: '2% auto'}} icon={<UserOutlined />} />
					<br/>
					<br/>

					<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>Event Updates:</h1>
					<br></br> <br></br>
					<Card style={{width: 1000, borderColor:"red", background: "transparent",
						borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
						<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
							float:"left"}}>Event Update: "Coming up Soon!"</h1>
						<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>
						<br></br>
						<br></br>
						<p style={{color: "black", fontSize: "20px"}}> Hi Genyuses! This session is coming up fast!
							We're excited to see you all there next week! Joan has finalised the questions that will be
							asked (see the event description!) and we're excited to see all your lovely faces!</p>
					</Card>
					<br></br> <br></br>
					<Card style={{width: 1000, borderColor:"red", background: "transparent",
						borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
						<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
							float:"left"}}>Event Update: "Ready to go!"</h1>
						<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>
						<br></br>
						<br></br>
						<p style={{color: "black", fontSize: "20px"}}> Hey everyone! The event description has been
							updated to include some of the questions that will be asked in the session! Have a
							looksee if you're interested ♥</p>
					</Card>
					<br></br> <br></br>

					<div style={{position:"absolute", bottom:"65%", right:"5%"}}>
						<h2>Learn more about the Session!!</h2>
						<iframe id="u35_input" scrolling="auto" frameBorder="0" webkitallowfullscreen=""
								mozallowfullscreen="" allowFullScreen=""
								src="https://www.youtube.com/embed/Xm_F_UBjrq8"></iframe>
					</div>

				</Body3Wrapper>
			</div>

		)
	}
}

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
// 				<div style={{position:"absolute", bottom:"65%", right:"5%"}}>
// 					<h2>Learn more about the Session!!</h2>
// 					<iframe id="u35_input" scrolling="auto" frameBorder="0" webkitallowfullscreen=""
// 							mozallowfullscreen="" allowFullScreen=""
// 							src="https://www.youtube.com/embed/Xm_F_UBjrq8"></iframe>
// 				</div>
//
// 			</Body3Wrapper>
// 		)
// 	}
// }

export default withRouter(Body);