import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator,LogoutWrapper} from './PodCreate.style';
import logo from '../../../img/logo.png';
import { Avatar,Button } from 'antd';
import {withRouter} from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import UserManager from '../../../FoundationLayer/UserModel/UserManager';


class Header extends React.Component {
	getImage = () => {
		UserManager.getCurrentUser()
			.then(response => {

				if (response.photoURL) {
					UserManager.getAvatar(response.photoURL)
						.then(photo => {
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

	constructor(props) {
		super(props);
		this.getImage();
	}
    render(){
      return (
        <HeaderWrapper>
          <ImageWrapper>
            <div>
            <img src={logo}></img>
            </div>
          </ImageWrapper>
          <LogoutWrapper>
            <div>
            <Avatar src={this.props.image} size={64} style={{ left: '30%' ,margin: '2% auto'}} icon={<UserOutlined />} />
            
            <Button danger style={{ left: '35%' ,margin: '2% auto'}} onClick={() => this.props.history.push('../HomePage')} >Logout</Button>
            </div>
          </LogoutWrapper>
          <br></br> <br></br> <br></br>
          <br></br> <br></br> <br></br>
          <br></br> 
          <Seperator></Seperator>
          <br/> 
        </HeaderWrapper>
        
      );
    }
  }

  export default withRouter(Header);