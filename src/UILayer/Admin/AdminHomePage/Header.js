import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator,LogoutWrapper} from './AdminHomePage.style';
import logo from '../../../img/logo.png';
import { Avatar,Button } from 'antd';
import {withRouter} from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';


class Header extends React.Component {
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
        </HeaderWrapper>
        
      );
    }
  }

  export default withRouter(Header);