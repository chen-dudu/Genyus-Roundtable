import React, {useState} from 'react';
import {Body1Wrapper, ListWrapper} from './Notification.style';
import {Button, List, Spin} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';
import {withRouter} from "react-router-dom";
import UserManager from '../../../DataModel/UserModel/UserManager';
import NotificationManager from "../../../DataModel/NotificationModel/NotificationManager";

/**
 * @file this file contains a class that represents the body of notification list page
 */
class Body extends React.Component {

	state = {
		loading : true,
		data : []
	};

	/**
	 * a private constructor which is used to store notification id  and
	 * all notification information from backend
	 */
	constructor(props) {
		super(props);
		this.getNotification();
		this.state = {
			nid: null,
			pid: null,
			title: null,
			time: null,
			des: null};

	}

	/**
	 * get all notification information of current user from backend and store in the state
	 * */
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
							this.setState({pid: result})
							console.log("get notifications");
						}).catch(err => {
						console.log("something wrong: ", err);
					})
				}
			})
			.catch(error => {
				console.log(error);
			});
		console.log('print notification at the end');
		console.log('print state information');
	};

	/**
	 * change js Date format to human readable date
	 */
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
										<h1 style={{color: "red", fontSize: "20px", textAlign:"left", float:"left", marginLeft:'2%'}}>{item.title}</h1>
										<h1 style={{color: "red", fontSize: "20px", textAlign:"right", float:"right", marginRight:'2%'}}>{this.formatDate(item.timeReceived)}</h1>
										<br></br>
										<br></br>
										<p style={{color: "black", fontSize: "20px", marginLeft:'2%'}}>{item.description}</p>
										<Button style={{background: "#3399ff", borderRadius: 5,
											width: "20%", height: 40, fontWeight: "bold",
											boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
											fontSize: 15, color: "white", marginLeft:'2%'}}
												onClick={() => this.props.history.push({pathname:'/Detail/',search: "?pid="+item.pid})}>Go To Event Page</Button>
									</List.Item>
									<br/><br/></div>
							)}
						/>
					</Spin>
				</ListWrapper>
			</Body1Wrapper>

		)
	}
}

export default withRouter(Body);