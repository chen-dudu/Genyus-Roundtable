import React from 'react';
import ReactDOM from 'react-dom';
import {Body1Wrapper,ButtonWrapper,TitleWrapper,ListWrapper} from './AdminPodList.style';
import Img from '../../../img/Avatar.png';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {List, Avatar, Button, Spin, message, Upload, Switch} from 'antd';
import {CheckOutlined, CloseOutlined, LoadingOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import UserManager from "../../../FoundationLayer/UserModel/UserManager";
import firebase from "firebase";
import ImgCrop from "antd-img-crop";
import {Body2Wrapper} from "../../Participant/ParticipantHomePage/ParticipantHomePage.style";
import PodManager from "../../../FoundationLayer/PodModel/PodManager";













class Body extends React.Component {


	getAdminImage = () => {
		console.log("here");
		UserManager.getCurrentUser()
			.then(response => {
				if (response.photoURL) {

					UserManager.getAvatar(response.photoURL)
						.then(photo => {
							this.setState({ AdminAvatar: photo });
							this.props.setImage(photo);
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	getPod = () => {
		PodManager.getAllPods()
			.then(result =>{
				this.setState({loading : false });
				let all = [];
				let upcoming = [];
				result.forEach(function (item,index,array){

					if(item._status == "upcoming"){
						upcoming.unshift(item);
						all.unshift(item);
					}
				});
				result.forEach(function (item,index,array){

					if(item._status == "finished"){
						all.unshift(item);
					}
				});
				this.setState({upcoming : upcoming ,data : upcoming, all : all});


			})
			.catch(err=>{
				console.log(err);
			})
	}


	constructor(props) {
    	super(props);
		this.getPod();
		this.getAdminImage();
		this.state = {
			loading : true,
			data : [],
			all : [],
			upcoming : [],
			AdminAvatar: <UserOutlined/>,
			isCheck : true

		};
		this.onChange = this.onChange.bind(this);



  }

	onChange = checked => {
		if(checked){
			this.setState({ isCheck: !checked , data : this.state.all});
		}else{
			this.setState({ isCheck: !checked , data : this.state.upcoming});
		}

	};









	render(){

		return(
			<container>
			<Body1Wrapper setImage={this.props.setImage}>


				<TitleWrapper>


					<h1>Pod list</h1>
					<div>

					<p>show finished pod</p>
					<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={!this.state.isCheck}
							onChange={this.onChange}
							style={{position:"absolute" , left:"55%", top: 7}}
					/>
					</div>





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

								title={<a style={{fontSize:25}}>{item._title}</a>}
								description={<p style={{width:"70%", fontSize:20, wordWrap:"break-word"}}>{item._description}<br/>status:{item._status}</p>}
							/>

							<div>
								<Button style={{marginRight:20, width:186, height:53, fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push({pathname:'/Detail/',search: "?pid="+item.pid})}>View Pod Info</Button>
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

