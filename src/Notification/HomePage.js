import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {HeaderWrapper,ImageWrapper,Seperator,LogoutWrapper,LogoutButton} from './Notification.style';
import logo from '../img/logo.png';
import Footer from './Footer.js';
import Body from './Body.js';
import { Avatar } from 'antd';
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
          <Avatar src={this.props.image} size={64} style={{ left: '80%' ,margin: '2% auto'}} icon={<UserOutlined />} />
          <br/>
          <LogoutButton>Logout</LogoutButton>
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

const HomePage = props => {
  const [image, setImage] = useState();
    return(
      <container>
        <Header image={image}></Header>
        <Body setImage={setImage}></Body>  
        <Footer></Footer>
      </container>
    )
}

// ========================================
export default HomePage;