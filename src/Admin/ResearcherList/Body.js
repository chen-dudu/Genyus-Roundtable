import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,ButtonWrapper,TitleWrapper,ListWrapper} from './ResearcherHomePage.style';
import Img from '../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button, Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserManager from "../../DataModel/UserModel/UserManager";
import firebase from "firebase";



let data = [];


const getResearchers = firebase.functions().httpsCallable('getResearchers');
getResearchers().then(result=>{

	console.log(result);

}).catch(err=>{
	console.log("something wrong");
});


class Body extends React.Component {

	// this.setState({loading:false});





	constructor(props) {
    super(props);

		this.state = {
       	loading : true,
		// data : [
		// 	{
		//
		// 		img : Img,
		// 		title: 'Name 1',
		// 		description: "",
		// 		joindate:"",
		//
		// 	},
		// 	{
		// 		img : Img,
		// 		title: 'Name 2',
		// 	},
		// 	{
		// 		img : Img,
		// 		title: 'Name 3',
		// 	},
		// 	{
		// 		img : Img,
		// 		title: 'Name 4',
		// 	}
		// 	]
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
					<Spin spinning={this.state.loading}>
				<List

					bordered={false}


					dataSource={data}
					renderItem={item => (
						<div>
						<List.Item style={{borderColor:'red', borderWidth:4,borderStyle:'solid',borderRadius:20}}>
							<List.Item.Meta style={{marginLeft:20}}
								avatar={<Avatar icon={<UserOutlined />} size={80}/>}
								title={<a style={{fontSize:25}}>{item.fullname}</a>}
								description={<p style={{width:"50%", fontSize:20, wordBreak:"break-all"}}>{item.description}<br/>joined: {item.title}</p>}
							/>

							<div>
								<Button style={{marginRight:20, width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/Admin/ResearcherDetail')}>Edit</Button>
							</div>


						</List.Item><br/><br/></div>


						)}
				/>
					</Spin>
				</ListWrapper>
                <br/>
                

			</Body1Wrapper>


		)
	}
}




export default withRouter(Body);

