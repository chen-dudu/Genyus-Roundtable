import { withRouter } from 'react-router-dom'
import { Avatar, Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import logo from '../../../img/logo.png';
import { HeaderWrapper, ImageWrapper, Seperator } from './ParticipantPodList.style';
import { UserOutlined } from "@ant-design/icons";
import UserManager from '../../../DataModel/UserModel/UserManager';

/**
 *@Description: a react component that renders the header of the ParticipantPodList
 */

class Header extends React.Component {
    /**
     * a functions used to logout when the logout button is clicked
     */
    handleClick = () => {
        UserManager.logout()
            .then(response => {
                console.log("logout succesfully");
            })
            .catch(error => {
                console.log(error);
            });
        this.props.history.push('/');
    }
    /**
     * render the JSX elements
     * @returns {JSX.Element} including a logo and the avatar of the current user and a button to logout
     */
    render() {
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <img src={logo} />
                    <Button danger style={{ right: "20%", margin: '1% 3%' }} onClick={() => this.props.history.push('../')} >Logout</Button> */}
                    <Avatar onClick={()=>{this.props.history.push("/ParticipantHomePage")}} src={this.props.image} size={64} style={{ margin: '0% auto', position: "absolute", left: "85%", top: "3%" }} icon={<UserOutlined />} />
                    <Button danger style={{ left: "90%", margin: '1% auto' }} onClick={this.handleClick} >logout</Button>
                </ImageWrapper>
                <Seperator />
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)