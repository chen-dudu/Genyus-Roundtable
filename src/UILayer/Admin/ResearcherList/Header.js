import { withRouter } from 'react-router-dom'
import {Avatar, Button} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import {HeaderWrapper,ImageWrapper,Seperator} from './ResearcherHomePage.style';
import {UserOutlined} from "@ant-design/icons";


class Header extends React.Component {
    render(){
        return (
            <HeaderWrapper>
                <ImageWrapper>

                    <img src={logo}/>
                    <Avatar src={this.props.image} size={64} style={{position:"absolute",right:"30%", top:"3%"}} icon={<UserOutlined />} />
                    <Button danger style={{ right:"20%" ,margin: '1% 3%'}} onClick={() => this.props.history.push('../')} >Logout</Button>
                    
                </ImageWrapper>

                <Seperator/>
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)