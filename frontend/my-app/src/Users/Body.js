import React from 'react';
import ReactDOM from 'react-dom';
import { Body1Wrapper, NotificationButton, Body2Wrapper, ScheduleButton, PhotoWrapper, SettingButton, StatusButton } from './HomePage.style';
import Img from '../img/person.gif';
import firebase from 'firebase';

class Body1 extends React.Component {
	render() {
		const auth = firebase.auth();
		let name;
		if (auth.currentUser) {
			let uid = auth.currentUser.uid;
			const db = firebase.firestore();
			name = db.collection("users").doc(uid);
		}
		else {
			name = "Rico";
		}
		return (

			<Body1Wrapper>
				<h1>Welcome to Genyus Roundtable!</h1>
				<h2>Hey there, {name}</h2>
				<NotificationButton>My Notification</NotificationButton>
				<ScheduleButton>My Roundtable Schedule</ScheduleButton>
				<PhotoWrapper>
					<SettingButton>Profile Settings</SettingButton>
					<StatusButton>Status and Rewards</StatusButton>
				</PhotoWrapper>
				<br />
				<br />
				{/* <div className='notificationButton'>My Notification</div>
			<div className='scheduleButton'>My Roundtable Schedule</div> */}

			</Body1Wrapper>


		)
	}
}

class Body2 extends React.Component {
	render() {
		return (
			<Body2Wrapper>
				<br />
				<h1>Genyus Roundtable Is...</h1>
				<p>·...An online peer-led focus group</p>
				<p>·...Led by fellow survivors</p>
				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
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