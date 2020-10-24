import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,ButtonWrapper,TitleWrapper,ListWrapper,Body2Wrapper} from './ResearcherList.style';
import Img from '../../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button, Spin, message, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import firebase from "firebase";
import ImgCrop from "antd-img-crop";







const getResearchers = firebase.functions().httpsCallable('getResearchers');






class Body extends React.Component {


	// getAdminImage = () => {
	// 	UserManager.getCurrentUser()
	// 		.then(response => {
	// 			if (response.photoURL) {
	//
	// 				UserManager.getAvatar(response.photoURL)
	// 					.then(photo => {
	// 						this.setState({ AdminAvatar: photo });
	// 						this.props.setImage(photo);
	// 					})
	// 					.catch(error => {
	// 						console.log(error);
	// 					});
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	getImage = () => {
		this.getResearchers1()
			.then(result =>{
				console.log(result);
				// this.setState({ data : this.state.data.concat(result)});
				let list=[];
				result.forEach(function (item,index,array){
					if(item){
						list.unshift(item);
					}
				});
				console.log(list);
				this.setState({ data : list, loading : false})
				console.log(this.state.data);


			})
			.catch(error =>{
				console.error(error);
			});
	}

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


	getResearchers1 = () => {


		return getResearchers().then(result => {
			let researchers = result.data.map(item => {
				if(item){
					if(item.photoURL){

						return UserManager.getAvatar(item.photoURL)
							.then(photo => {
								item.photoURL = photo;
								console.log(item.photoURL);
								return Promise.resolve(item);
							})
							.catch(error => {
								console.log(error);
								return Promise.reject(error);
							});
					}else{
						item.photoURL = null;
						console.log("get researcher : " + item);
						return Promise.resolve(item);
					}

				}else{
					console.log("get researcher : " + item);
					return Promise.resolve(item);
				}
			})
			return Promise.all(researchers);
			})
			.catch(error =>{
				console.log(error);
				return Promise.reject(error);
			});
	};


	constructor(props) {
    	super(props);
		this.getImage();
		this.formatDate = this.formatDate.bind(this);
		// this.getAdminImage();
		this.state = {
			loading : true,
			data : [],
			// AdminAvatar: <UserOutlined/>,

		};

  }








	render(){

		return(
			<container>
			<Body1Wrapper setImage={this.props.setImage}>


				<TitleWrapper>
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>

				<h1>Researcher list</h1>
				<Button style={{width:241, height:53,fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push({pathname:'/Admin/ResearcherCreate'})}>Create a new account</Button>
				</TitleWrapper>


				<ListWrapper>
					<Spin spinning={this.state.loading}>
				<List


					bordered={false}


					dataSource={this.state.data}

					renderItem={item => (
						<div>
						<List.Item style={{borderColor:'red', borderWidth:4,borderStyle:'solid',borderRadius:20}}>

							<List.Item.Meta style={{marginLeft:20}}
								avatar={<Avatar src={item.photoURL} icon={<UserOutlined />} size={120}/>}
								title={<a style={{fontSize:25}}>{item.fullname}</a>}
								description={<p style={{width:"70%", fontSize:20, wordWrap:"break-word"}}>{item.description}<br/>joined: {this.formatDate(item.creationTime)}</p>}
							/>

							<div>
								<Button style={{marginRight:20, width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push({pathname:'/Admin/ResearcherDetail/'+item.fullname, state:{item:item}})}>Edit</Button>
							</div>


						</List.Item><br/><br/></div>


						)}
				/>
					</Spin>
				</ListWrapper>
                <br/>

                

			</Body1Wrapper>
			<Body2Wrapper>
				<br />
				<h1>Genyus Roundtable Is...</h1>
				<p>·...An online peer-led focus group</p>
				<p>·...Led by fellow survivors</p>
				<p>·...About sharing what’s been most impactful and important to you in your experience</p>
				<p>·...Aiming to pay it forward, and help others along their journeys!</p>
				<br />
				<br />
			</Body2Wrapper>
			</container>



		)
	}
}




export default withRouter(Body);

