import React, { useState } from 'react';
import { BodyWrapper, Body1Wrapper, TitleWrapper} from './PodCreate.style';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';

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

class Body extends React.Component {
	formRef = React.createRef();
	onFinish = (values) => {
		console.log(values);
	};

	render() {

		return (
				<Body1Wrapper>
					<TitleWrapper>
						<h2>Create Pod</h2>
					</TitleWrapper>
				<BodyWrapper>
				<Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} style={{ marginLeft:"20%",fontSize:"40px"}}>
					<br />
					<Form.Item name="researcher" label="Researcher" rules={[{ required: true }]}>
						<Select
							placeholder="Select a researcher"
							style={{ width: "50%" }}
							allowClear
						>
							<Option value="researcher1">researcher1</Option>
							<Option value="researcher2">researcher2</Option>
							<Option value="researcher3">researcher3</Option>
						</Select>
					</Form.Item>
					<br />
					<Form.Item name="calendlyLink" label="CalendlyLink" rules={[{ required: true }]}>
						<Input style={{ width: "50%"}} />
					</Form.Item>
					<br />
					<Form.Item >
						<Button type="primary" htmlType="submit" style={{margin:"0% 10% 0%", width:"50%"}}>
							Submit
          				</Button></Form.Item>
				</Form>
				</BodyWrapper>
			</Body1Wrapper>
		)
	}
}

export default withRouter(Body);