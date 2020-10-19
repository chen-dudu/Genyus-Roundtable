import { withRouter } from 'react-router-dom'
import {Avatar, Button} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import {HeaderWrapper,ImageWrapper,Seperator} from './PodSignup.style';
import {UserOutlined} from "@ant-design/icons";


class Header extends React.Component {

    render(){
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <img src={logo}></img>
                </ImageWrapper>
                <Seperator></Seperator>
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)