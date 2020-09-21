import React from 'react';
import { Body1Wrapper, ListWrapper, TitleWrapper } from './Notification.style';
import { List, Avatar, Button} from 'antd';
import 'antd/dist/antd.css';
import {Card} from 'antd';

const data = [
	{
		title: "Title 1",
		description: "Description 1",
		time: "Time 1"
	},
	{
		title: "Title 2",
		description: "Description 2",
		time: "Time 2"
	},
	{
		title: "Title 3",
		description: "Description 3",
		time: "Time 3"
	},
	{
		title: "Title 4",
		description: "Description 4",
		time: "Time 4"
	}
]

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
				<Card style={{width: 800, borderColor:"red", background: "transparent",
					borderWidth: 4, borderRadius: 20, marginLeft: "10%", marginRight: "10%"}}>
					<h1>Card content</h1>
					<p>Card content</p>
					<p>Card content</p>
				</Card>
			</Body1Wrapper>


		)
	}
}

export default Body;