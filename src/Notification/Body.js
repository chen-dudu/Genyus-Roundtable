import React from 'react';
import { Body1Wrapper, ListWrapper, TitleWrapper } from './Notification.style';
import { List, Avatar, Button} from 'antd';
import 'antd/dist/antd.css';

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
	render() {
		return (
			<Body1Wrapper>
				<TitleWrapper>
					<h1>Researcher list</h1>
					<Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Create a new account</Button>
				</TitleWrapper>
				<ListWrapper>
					<List
						bordered={true}


						dataSource={data}
						renderItem={item => (
							<List.Item

							>
								<List.Item.Meta
									avatar={<Avatar src={item.img} size={80}/>}
									title={<a href="https://ant.design" style={{fontSize:25}}>{item.title}</a>}
									description={<p style={{fontSize:15}}>"Description"</p>}
								/>

								<div>
									<Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Edit</Button>
									<text> </text>
									<Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Detail</Button>
								</div>

							</List.Item>
						)}
					/>
				</ListWrapper>
				<br/>


			</Body1Wrapper>


		)
	}
}

export default Body;