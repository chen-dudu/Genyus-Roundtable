import React, { useState } from 'react';
import { BodyWrapper, Body1Wrapper, TitleWrapper } from './PodCreate.style';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import firebase from 'firebase';
import PodManager from '../../../FoundationLayer/PodModel/PodManager';

const { Option } = Select;
const domainName = "http://localhost:3000";
const pathName = "/Admin/PodInvitation";
const searchName = "?pid=";
let shareLinkSuffix = domainName.concat("/podLandingPage?pid=");
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

const getResearchers = firebase.functions().httpsCallable('getResearchers');

const { TextArea } = Input;

class Body extends React.Component {
	formRef = React.createRef();
	onFinish = (values) => {
		console.log(values);
	};

	getResearcherName = () => {
		return getResearchers()
			.then(result => {
				console.log("print result.data", result.data);
				let list = [];
				result.data.forEach(function (item, index, array) {

					if (item) {
						list.unshift(item);
					}
				});
				console.log("print list", list);
				this.setState({ data: list, loading: false });
			})
			.catch(error => {
				console.error(error);
			});
	}

	createPod = (values) => {
		let pod = {
			title: this.state.title,
			calendlyLink: this.state.calendlyLink,
			researcher: this.state.researcher,
			participants: this.state.participants,
			notifications: this.state.notifications,
			status: this.state.status,
			description: this.state.description,
			video: this.state.video,
		}

		console.log("print pod", pod);
		console.log("print researcherid", this.state.researcher);
		PodManager.createPod(pod, this.state.researcher)
			.then(response => {
				let theLink = shareLinkSuffix.concat(response);
				this.setState({shareLink: theLink})
				console.log("create pod successful");
				console.log("print id", response);
				this.setState({ pid: response });
				// this.setState({ shareLink: domainName.concat(pathName,searchName,response)})
				this.props.history.push({ pathname: pathName, search: searchName + response })
				console.log("the shared link is", this.state.shareLink);
				console.log("the introduction video link is: ", this.state.video);
				PodManager.updateShareLink(this.state.pid, this.state.shareLink)
					.then(returnValue => {
						console.log("upadateShareLink successfully");
					})
					.catch(err => {
						alert(err);
						console.log("error when updateShareLink");
					});

			}
			)
			.catch(err => {
				alert(err);
				console.log("error when creating pod");
			});
	}

	onTitleEnter = (e) => {
		console.log("Title: ", e.target.value);
		// this.setState({ pod: { title: e.target.value } });
		this.setState({ title: e.target.value });
	}

	onResearcherEnter = (name) => {
		console.log("Researcher: ", name);
		// this.setState({ pod: { researcher: name } });
		this.setState({ researcher: name });

	}

	onCalendlyLinkEnter = (e) => {
		console.log("CalendlyLink: ", e.target.value);
		// this.setState({ pod: { calendlyLink: e.target.value } });
		this.setState({ calendlyLink: e.target.value });
	}

	onDescriptionEnter = (e) => {
		console.log("Description: ", e.target.value);
		this.setState({ description: e.target.value });
	}

	onVideoEnter = (e) => {
		console.log("Video: ", e.target.value);
		this.setState({ video: e.target.value });
	}

	constructor(props) {
		super(props);
		this.onTitleEnter = this.onTitleEnter.bind(this);
		this.onResearcherEnter = this.onResearcherEnter.bind(this);
		this.onCalendlyLinkEnter = this.onCalendlyLinkEnter.bind(this);
		this.onVideoEnter = this.onVideoEnter.bind(this);

		this.getResearcherName();
		this.state = {
			loading: true,
			data: [],
			pid: "",
			title: "",
			calendlyLink: "",
			researcher: "",
			notifications: [],
			participants: [],
			status: "upcoming",
			description: "",
			shareLink: "",
			video: "",
		};
	}


	render() {
		return (
			<Body1Wrapper>
				<TitleWrapper>
					<h2>Create Pod</h2>
				</TitleWrapper>
				<BodyWrapper>
					<br />
					<Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.createPod}>
						<br />
						<Form.Item name="title" label="Pod Title" rules={[{ required: true }]}>
							<Input style={{ width: "60%" }} onChange={this.onTitleEnter} />
						</Form.Item>
						<Form.Item name="researcher" label="Researcher" rules={[{ required: true }]}>
							<Select
								placeholder="Select a researcher"
								style={{ width: "60%" }}
								onChange={this.onResearcherEnter}
								allowClear
							>
								{console.log(this.state.data)}
								{this.state.data.map(item => {
									return (<Option value={item.uid}>{item.fullname}</Option>)
								})}
							</Select>
						</Form.Item>
						<Form.Item name="calendlyLink" label="CalendlyLink" rules={[{ required: true }]}>
							<Input style={{ width: "60%" }} onChange={this.onCalendlyLinkEnter} />
						</Form.Item>
						<Form.Item name="video" label="Video" rules={[{ required: true }]}>
							<Input style={{ width: "60%" }} onChange={this.onVideoEnter} />
						</Form.Item>
						<Form.Item name="description" label="Description" rules={[{ required: false }]}>
							<TextArea style={{ width: "60%" }} rows={4} onChange={this.onDescriptionEnter} />
						</Form.Item>
						<br />
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit" style={{ width: "60%" }}>
								Confirm Session
          					</Button>
						</Form.Item>
					</Form>
				</BodyWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body);