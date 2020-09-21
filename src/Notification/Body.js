import React from 'react';
import {Body1Wrapper} from './Notification.style';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';

class Body extends React.Component {
	state = {
		loading: false,
	};

	onChange = checked => {
		this.setState({ loading: !checked });
	};

	render() {
		return (
			<Body1Wrapper>
				<h1>Notifications</h1>
				<br></br> <br></br> <br></br>
				<Card style={{width: 1000, borderColor:"red", background: "transparent",
					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left"}}>Time Set for Session</h1>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Just Now</h1>
					<br></br>
					<br></br>
					<p style={{color: "black", fontSize: "20px"}}> Meaningful Vocation: Stroke Recovery has
						had its time finalised to 2/5/20, 6:00pm. Click to go to the event page to RSVP!</p>
					<Button style={{background: "#3399ff", borderRadius: 5,
						width: "20%", height: 40, fontWeight: "bold",
						fontSize: 15, color: "white"}}>Go To Event Page</Button>
				</Card>
				<br></br> <br></br>
				<Card style={{width: 1000, borderColor:"red", background: "transparent",
					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
						float:"left"}}>Event Update for 'Meaningful Vocation: Stroke Recovery'</h1>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 6.00 pm</h1>
					<br></br>
					<br></br>
					<p style={{color: "black", fontSize: "20px"}}> Hi Genyuses! This session is coming up fast!
						Just a reminder that the session has been finalised for 6:00 next week and we're excited
						to see you all there! Joan has ...
						Click to go to the event page to read the whole update!</p>
					<Button style={{background: "#3399ff", borderRadius: 5,
						width: "20%", height: 40, fontWeight: "bold",
						fontSize: 15, color: "white"}}>Go To Event Page</Button>
				</Card>
				<br></br> <br></br>
				<Card style={{width: 1000, borderColor:"red", background: "transparent",
					borderWidth: 4, borderRadius: 20, marginLeft: "15%", marginRight: "15%", textAlign:'left'}}>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"left",
						float:"left"}}>Signup for Session Completed</h1>
					<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right"}}>Yesterday, 1.00pm</h1>
					<br></br>
					<br></br>
					<p style={{color: "black", fontSize: "20px"}}> Thanks for signing up for the event
						'Meaningful Vocation: Stroke Recovery'.
						Click to go to the event page to view details or alter your availabilities!</p>
					<Button style={{background: "#3399ff", borderRadius: 5,
						width: "20%", height: 40, fontWeight: "bold",
						fontSize: 15, color: "white"}}>Go To Event Page</Button>
				</Card>
				<br></br> <br></br>
			</Body1Wrapper>


		)
	}
}

export default Body;