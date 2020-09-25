import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,ButtonWrapper,TitleWrapper,ListWrapper} from './ResearcherHomePage.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';







class Body extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
       	value: 1,
		data : [
			{

				img : Img,
				title: 'Name 1',
				description: "",
				joindate:"",

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
		]
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
				<Button style={{width:241, height:53,fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherCreate')}>Create a new account</Button>
				</TitleWrapper>
				<ListWrapper>
				<List
					style={{borderColor:'red', borderWidth:3,borderStyle:'solid',borderRadius:20}}
					bordered={true}


					dataSource={this.state.data}
					renderItem={item => (
						<List.Item
						>
							<List.Item.Meta
								avatar={<Avatar icon={<UserOutlined />} size={80}/>}
								title={<a href="https://ant.design" style={{fontSize:25}}>{item.title}</a>}
								description={<p style={{width:"50%", fontSize:20, wordBreak:"break-all"}}>Description111111111111111111111111111111111111111111111111111111111111111111111111111111<br/>joined: {item.title}</p>}
							/>

							<div>
								<Button style={{width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherDetail')}>Edit</Button>
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

