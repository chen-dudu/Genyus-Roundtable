/**
 * The Header is composed by
 * ImageWapper holding the GN logo
 * LogoutWrapper holding the Avatar and the logout button
 * Author: Yujun Yan
 */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HeaderWrapper, ImageWrapper, Seperator, LogoutWrapper } from './ProfileSetting.style';
import logo from '../../../img/logo.png';
import { Avatar, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import UserManager from '../../../DataModel/UserModel/UserManager';


class Header extends React.Component {
  handleClick = () => {
    UserManager.logout()
      .then(response => {
        console.log("logout succesfully");
      })
      .catch(error => {
        console.log(error);
      });

    this.props.history.push('../');
  }

  render() {
    console.log("Header**************", this.props.image);
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <div>
            <img src={logo}></img>
          </div>
        </ImageWrapper>
        <LogoutWrapper>
          <div>
            <Avatar onClick={()=>{this.props.history.push("/ParticipantHomePage")}} src={this.props.image} size={64} style={{ left: '70%', margin: '2% auto' }} icon={<UserOutlined />} />

            <Button danger style={{ left: '75%', margin: '2% auto' }} onClick={this.handleClick} >Logout</Button>
          </div>
        </LogoutWrapper>
        <br></br> <br></br> <br></br>
        <br></br> <br></br> <br></br>
        <br></br>
        <Seperator></Seperator>
      </HeaderWrapper>

    );
  }
}

export default withRouter(Header);