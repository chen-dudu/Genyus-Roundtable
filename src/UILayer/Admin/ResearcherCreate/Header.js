import { withRouter } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import { HeaderWrapper, ImageWrapper, Seperator } from './ResearcherCreate.style';
import { UserOutlined } from "@ant-design/icons";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AdminAvatar: this.props.history.location.query.AdminAvatar,
    };

  }

  render() {
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo} />
          {/* <Avatar src={this.state.AdminAvatar} size={64} style={{position:"absolute",right:170, top:20}} icon={<UserOutlined />} />
            <Button style={{width:120, height:53,fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/')}>Sign out</Button> */}
          <Avatar src={this.state.AdminAvatar} size={64} style={{ position: "absolute", right: "30%", top: "3%" }} icon={<UserOutlined />} />
          <Button danger style={{ right: "20%", margin: '1% 3%' }} onClick={() => this.props.history.push('../')} >Logout</Button>
        </ImageWrapper>

        <Seperator />
      </HeaderWrapper>

    );
  }
}

export default withRouter(Header)