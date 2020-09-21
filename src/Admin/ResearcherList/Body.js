import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,ButtonWrapper,TitleWrapper,ListWrapper} from './ResearcherHomePage.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button} from 'antd';


const data = [
	{
		img : Img,
		title: 'Name 1',
	},
	{
		img : Img,
		title: 'Name 2',
	},
	{
		img : Img,
		title: 'Name 3',
	},
	{
		img : Img,
		title: 'Name 4',
	},
	{
		img : Img,
		title: 'Name 4',
	},
	{
		img : Img,
		title: 'Name 4',
	},
	{
		img : Img,
		title: 'Name 4',
	},
	{
		img : Img,
		title: 'Name 4',
	},
	{
		img : Img,
		title: 'Name 4',
	},
];

class MyButton extends React.Component{
	render(){
		return(


			<Button type="primary"/>

		)
	}
}



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
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>

				<h1>Researcher list</h1>
				<Button onClick={() => this.props.history.push('/HomePage')}>Create a new account</Button>
				</TitleWrapper>
				<ListWrapper>
				<List
					style={{borderColor:'red'}}
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
								<Button type="primary" onClick={() => this.props.history.push('/Admin/ResearcherDetail')}>Edit</Button>

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

