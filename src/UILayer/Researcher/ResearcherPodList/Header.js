import { withRouter } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../../img/logo.png';
import { HeaderWrapper, ImageWrapper, Seperator } from './ResearcherPodList.style';
import { UserOutlined } from "@ant-design/icons";
import UserManager from '../../../FoundationLayer/UserModel/UserManager';


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
        return (
            <HeaderWrapper>
                <ImageWrapper>

                    <img src={logo} />
                    {/* <Avatar src={this.props.image} size={64} style={{ position: "absolute", right: "30%", top: "3%" }} icon={<UserOutlined />} />
                    <Button danger style={{ right: "20%", margin: '1% 3%' }} onClick={() => this.props.history.push('../')} >Logout</Button> */}
                    <Avatar onClick={()=>{this.props.history.push("/ResearcherHomePage")}} src={this.props.image} size={64} style={{margin: '0% auto', position: "absolute", left: "85%", top: "3%" }} icon={<UserOutlined />} />
                    <Button danger style={{ left: "90%", margin: '1% auto' }} onClick={this.handleClick} >logout</Button>

                </ImageWrapper>

                <Seperator />
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)