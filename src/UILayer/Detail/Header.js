import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HeaderWrapper, ImageWrapper, Seperator, LogoutWrapper, LogoutButton } from './Detail.style';
import logo from '../../img/logo.png';
import Footer from './Footer.js';
import Body from './Body.js';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import UserManager from "../../FoundationLayer/UserModel/UserManager";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.getImage();
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

    getImage = () => {
        UserManager.getCurrentUser()
            .then(user => {
                console.log('getCurrentUser successful');
                console.log('photourl:' + user.photoURL);
                this.setState({ full_name: user.fullname, nick_name: user.nickname });
                console.log("PrintFullname!!!!!!!!!!!!!", user.fullname);
                console.log("PrintNickname!!!!!!!!!!!!!", user.nickname);

                if (user.photoURL) {
                    UserManager.getAvatar(user.photoURL)
                        .then(photo => {
                            console.log('getAvatar successful');
                            console.log('setImage successful');
                            // this.setState({imageUrl: photo});
                            console.log('show photo');
                            console.log(photo);
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
        console.log('print image at the end');
        console.log(this.image);
    };

    render() {
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <div>
                        <img src={logo}></img>
                    </div>
                </ImageWrapper>
                <LogoutWrapper>
                    <div>
                        <Avatar src={this.props.image} size={64} style={{ left: '70%', margin: '2% auto' }} icon={<UserOutlined />} />

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