import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import {Body2Wrapper, BodyWrapper, Body3Wrapper, ListWrapper} from './Detail.style';
import {Modal, Button, Card, Tooltip, Avatar, Spin, List, Upload, message, Input} from 'antd';
import 'antd/dist/antd.css';
import {Steps, Row, Col} from 'antd';
import {QuestionOutlined, UserOutlined} from '@ant-design/icons';
import Img from "../../img/person.gif";
import UserManager from '../../DataModel/UserModel/UserManager';
import NotificationManager from "../../DataModel/NotificationModel/NotificationManager";
import SessionManager from "../../DataModel/SessionModel/SessionManager";
import PodManager from "../../DataModel/PodModel/PodManager";
import {notification} from "antd/es";
import 'antd/dist/antd.css';
import Notification from '../../DataModel/NotificationModel/Notification';

/**
 * @file this file contains a class that represents the body of pod detail page
 */
const {TextArea} = Input

class Body extends React.Component {

	/**
	 * a private constructor which is used to store pod id from pod list page and
	 * all pod information from backend
	 */
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
			youtubeLink: "N/A",
			shareLink: "http://localhost:3000/",
			researcherFullName: null,
			researcherDes: null,
			researcherAvatar: null,
			participates: null,
			notifications: [],
			isParti: true,
			note: null,
			// noteUrl: null
			visible: false,
			confirmLoading: false,
			link: "",
			notiVisible: false,
			notiTitle: "",
			notiContent: "",
			notiConfirmLoading: false,
			video: ""
		}
		console.log("state pid")
		console.log(this.state.pid);
		this.getPod();
		this.upload.onChange = this.upload.onChange.bind(this);
	}

	/**
	* get all pod information from backend and store in the state
	* */
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
					loading: false,
					shareLink: result.shareLink,
					video: result.video,
					youtubeLink: result.youtubeLink
				})
				console.log("get pod note");
				console.log(this.state.note);
				console.log(this.state.researcher);

				UserManager.getCurrentUser()
					.then(res => {
						console.log('get Current User successful');
						console.log(typeof(res));
						console.log(Object.keys(res));
						console.log(Object.values(res));
						if (res.type === 'participant') {
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
					})

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
									this.setState({
										researcherAvatar: photo
									})

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

	/**
	 * show model for updating recording link
	 * use handleOK to send link to backend and put on the page
	 * use handleCancel to cancel model
	 */
	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		this.setState({
			confirmLoading: true,
		});
		PodManager.updateYoutubeLink(this.state.pid, this.state.link)
			.then(response => {
				this.setState({
					visible: false,
					confirmLoading: false,
					youtubeLink: this.state.link,
					link: ""
				})
				console.log("change youtube link success")
			}).catch(error => {
				this.setState({
					confirmLoading: false
				})
				alert("change youtube link fail")
		})
	};

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false,
		});
	};

	/**
	 * show notification model for creating notification
	 * use notiOK to send notification to backend and put on the page
	 * use notiCancel to cancel creating notification
	 */
	showNotiModal = () => {
		this.setState({
			notiVisible: true,
			notiTitle: "",
			notiContent: ""
		});
	};

	notiOk = e => {
		this.setState({
			notiConfirmLoading: true
		});
		NotificationManager.sendNotification(
			{title: this.state.notiTitle,
			description: this.state.notiContent,
			timeReceived: new Date(),
			isRead: false,
			pid: this.state.pid})
			.then(noid => {
				// this.setState({
				// 	visible: false,
				// 	confirmLoading: false
				// });
				return NotificationManager.getNotification(noid)
					.then(noti => {
						console.log("New Notification");
						console.log(noti);
						console.log("Old Notification");
						console.log(this.state.notifications);
						this.state.notifications.unshift(noti);
						this.setState({
							notiVisible: false,
							notiConfirmLoading: false
						})
					}).catch(error => {
						this.setState({
							notiConfirmLoading: false
						})
						alert("add notification fail");
					})
			}).catch(error => {
			this.setState({
				notiConfirmLoading: false
			})
			alert("add notification fail")
		})
	}

	notiCancel = e => {
		console.log(e);
		this.setState({
			notiVisible: false,
			notiTitle: "",
			notiContent: ""
		});
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

	/**
	 * upload note file to backend
	 */
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
				<BodyWrapper>
					<h1>Pod Details</h1>
					<br></br>
					<br></br>
					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>{this.state.title}</h2>
					<h3>{this.state.description}</h3>

					<iframe id="u35_input" scrolling="auto" frameBorder="0" webkitallowfullscreen=""
					mozallowfullscreen="" allowFullScreen=""
					src={this.state.video} style={{position:"absolute", left: '57%', bottom:"45%"}}/>

					<br></br>
					<br></br>
					<br></br>
					<br></br>

					<h2 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal"}}>About the Researcher</h2>
					<h3> Researcher Name: {this.state.researcherFullName}</h3>
					<h3 style={{marginRight:"30%"}}>{this.state.researcherDes}</h3>
					<Avatar src={this.state.researcherAvatar} size={156} style={{position:"absolute", left: '80%', bottom:"5%",
						margin: '2% auto'}} icon={<UserOutlined/>} />
					<br/>
					<br/>
				</BodyWrapper>
				<Body2Wrapper>
					<br/> <br/>
					<Row
						gutter={[5, 5]}
						style={{marginLeft:"80px", marginRight:"30%"}}
					>
						<Col className="gutter-row" span={4}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Recording Link</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								{this.state.youtubeLink}</div>
						</Col>
						<Col className="gutter-row" span={4}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontWeight:"bold",
								fontSize:"16px"}}>Share Link</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<div style={{background: 'white', padding: '8px 0', textAlign:"center", fontSize:"16px"}}>
								{this.state.shareLink}</div>
						</Col>

					</Row>

					{ this.state.isPart
						? null
						: <Button style={{background: "#D9021B", borderRadius: 8,
							width: "10%", height: 40, fontWeight: "bold", borderWidth: 0,
							boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
							fontSize: 15, color: "white", position:"absolute", bottom:"76%", right:"15%"}}
								  onClick={this.showModal}
						>Edit</Button>
					}

					<Modal
						title="Update link"
						visible={this.state.visible}
						onOk={this.handleOk}
						confirmLoading={this.state.confirmLoading}
						onCancel={this.handleCancel}
					>
						<Input
							placeholder = "Youtube Link for session recording"
							onChange = {(e) => {this.setState({link: e.target.value});}}
							allowClear
							value = {this.state.link}
						/>
					</Modal>

					<br />
					<hr style={{color: "white", height: 0}} />
					<br /> <br />
					<br /> <br />

					<Button style={{background: "#D9021B", borderRadius: 8,
						width: "10%", height: 40, fontWeight: "bold", borderWidth: 0,
						boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
						fontSize: 15, color: "white", position:"absolute", bottom:"30%", right:"85%"}}
							onClick={() => PodManager.download(this.state.note)}
					>Download Notes</Button>

					{ this.state.isPart
						? null
						: <Upload {...this.upload} progress={{ strokeWidth: 2, }}>
							<Button className="manager" style={{background: "#D9021B", borderRadius: 8,
								width: "10%", height: 40, fontWeight: "bold", borderWidth: 0,
								boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
								fontSize: 15, color: "white", position:"absolute", bottom:"30%", right:"70%"}}
							>Upload Notes</Button>
						</Upload>
					}
					<br />
					<br />
					<br />
				</Body2Wrapper>
				<Body3Wrapper>
					<br />
					<br />
					<h1 style={{fontSize:"30px", marginLeft:"5%", fontWeight:"normal", display:"inline"}}>Event Updates:</h1>
					{ this.state.isPart
						? null
						: <Button type="primary" onClick={this.showNotiModal}
								  style={{background: "#D9021B", borderRadius: 8,
									  width: "auto", height: 40, fontWeight: "bold", borderWidth: 0,
									  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
									  fontSize: 18, color: "white", marginLeft:"65%"}}>
							Send a notification
						</Button>
					}
					<Modal
						title="New notification"
						visible={this.state.notiVisible}
						comfirmLoading={this.state.notiConfirmLoading}
						onOk={this.notiOk}
						onCancel={this.notiCancel}
					>
						<div style={{marginBottom: 20}}>
							Title
							<Input
								placeholder="Message Title"
								style={{marginTop: 15}}
								allowClear
								onChange={
									(e) => {
										this.setState({notiTitle: e.target.value});
									}
								}
								value = {this.state.notiTitle}
							/>
						</div>
						<div>
							Content
							<TextArea placeholder="Write a message here that will be sent to all participants who have expressed interest in this event"
									  style={{marginTop: 10}}
									  autoSize={{minRows: 3}}
									  allowClear
									  showCount
									  onChange={
									  	(e) => {
									  		this.setState({notiContent: e.target.value});
									  	}
									  }
									  value = {this.state.notiContent}
							/>
						</div>
					</Modal>

					<br></br> <br></br>
					<br></br>

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
					<br></br> <br></br>

				</Body3Wrapper>
			</div>

		)
	}
}

export default withRouter(Body);