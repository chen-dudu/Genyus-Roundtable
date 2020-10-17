import React, { useState } from 'react';
import { BodyWrapper, Body1Wrapper, TitleWrapper } from './PodCreate.style';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import firebase from 'firebase';
import PodManager from '../../../FoundationLayer/PodModel/PodManager';

const { Option } = Select;
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
			participants: [],
		}
		console.log("print pod", pod);
		PodManager.createPod(pod)
			.then(response => {
				console.log("create pod successful");
				console.log("print id", response);

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

	constructor(props) {
		super(props);
		this.onTitleEnter = this.onTitleEnter.bind(this);
		this.onResearcherEnter = this.onResearcherEnter.bind(this);
		this.onCalendlyLinkEnter = this.onCalendlyLinkEnter.bind(this);

		this.getResearcherName();
		this.state = {
			loading: true,
			data: [],
			title: "",
			calendlyLink: "",
			researcher: "",
			participants: [],
		};
	}

	componentDidMount(){



		fetch("https://calendly.com/api/v1/users/me/event_types?include=owner", {
			"method": "GET",
			"headers": {
				"x-token": "LCFHBPAIAY67PWELIB7MVKXYWLCDHKN3"
			}
			})
			.then(response => {
				//console.log(response);
				return response.json();
			})
			.then(data =>{
			console.log(data);
			})
			.catch(err => {
				console.error(err);
			})
			.catch(err => {
				console.error(err);
			});



	}


	render() {
		return (
			<Body1Wrapper>
				<TitleWrapper>
					<h2>Create Pod</h2>
				</TitleWrapper>
				<BodyWrapper>
					<br />
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
						<br />
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit" style={{ width: "50%" }}>
								Confirm Session
          				</Button></Form.Item>
					</Form>
				</BodyWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body);