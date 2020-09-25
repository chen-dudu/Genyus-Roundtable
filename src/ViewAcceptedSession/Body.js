import React from 'react';
import {Body2Wrapper, BodyWrapper} from './ViewAcceptedSession.style';
import {Button, Tooltip} from 'antd';
import 'antd/dist/antd.css';
import {Steps, Row, Col} from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

const { Step } = Steps;
const style = {background: 'white', padding: '8px 0'};

class Body1 extends React.Component {
	state = {
		loading: false,
	};

	onChange = checked => {
		this.setState({ loading: !checked });
	};

	render() {
		return (
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
				<h1 style={{fontSize:"30px", marginLeft:"15%", fontWeight:"normal"}}>Your Confirmation</h1>
				<br></br>
			</BodyWrapper>
		)
	}
}

class Body2 extends React.Component {
	render() {
		return (
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
		)
	}
}

class Body extends React.Component {
	render() {
		return (
			<div>
				<Body1></Body1>
				<Body2></Body2>
			</div>


		)
	}
}

export default Body;