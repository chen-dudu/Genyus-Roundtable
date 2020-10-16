import { withRouter } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import { HeaderWrapper, ImageWrapper, Seperator } from './ResearcherCreate.style';
import { UserOutlined } from "@ant-design/icons";
import UserManager from '../../../FoundationLayer/UserModel/UserManager';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AdminAvatar: this.props.history.location.query.AdminAvatar,
    };

  }
  
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
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo} />
          {/* <Avatar src={this.state.AdminAvatar} size={64} style={{position:"absolute",right:170, top:20}} icon={<UserOutlined />} />
            <Button style={{width:120, height:53,fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/')}>logout</Button> */}
          <Avatar src={this.state.AdminAvatar} size={64} style={{ margin: '0% auto', position: "absolute", left: "85%", top: "3%" }} icon={<UserOutlined />} />
          <Button danger style={{ left: "90%", margin: '1% auto' }} onClick={this.handleClick} >logout</Button>
        </ImageWrapper>

        <Seperator />
      </HeaderWrapper>

    );
  }
}

export default withRouter(Header)