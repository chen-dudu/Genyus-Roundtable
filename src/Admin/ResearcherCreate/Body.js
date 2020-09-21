import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,SubmitButton,Body2Wrapper,TitleWrapper,ListWrapper} from './ResearcherCreate.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button} from 'antd';


const data = [
	{
		img : Img,
		title: 'Ant Design Title 1',
	},
	{
		img : Img,
		title: 'Ant Design Title 2',
	},
	{
		img : Img,
		title: 'Ant Design Title 3',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
	{
		img : Img,
		title: 'Ant Design Title 4',
	},
];

class Body extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }



	render(){
		return(
			
			<Body1Wrapper>
				<TitleWrapper>
				<h1>Researcher list</h1>
				<Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Create a new account</Button>
				</TitleWrapper>
				<ListWrapper>
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
						>
							<List.Item.Meta
								avatar={<Avatar src={item.img} size={80}/>}
								title={<a href="https://ant.design" style={{fontSize:25}}>{item.title}</a>}
								description={<p style={{fontSize:15}}>"Ant Design, a design language for background applications, is refined by Ant UED Team"</p>}
							/>

							<div>
								<Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Edit</Button>
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




export default withRouter(Body);

