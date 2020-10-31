import React from 'react';
import { HeaderWrapper, ImageWrapper, Seperator, LogoutWrapper } from '../PodCreate/PodCreate.style';
import logo from '../../../img/logo.png';
import { Avatar, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import UserManager from '../../../DataModel/UserModel/UserManager';


/**
 *@Description: a react component that renders the header of the ResearcherDetail
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
     * a function to get the avatar of the current user
     */
    getImage = () => {
        UserManager.getCurrentUser()
            .then(response => {

                if (response.photoURL) {
                    UserManager.getAvatar(response.photoURL)
                        .then(photo => {
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
    };

    constructor(props) {
        super(props);
        this.getImage();
    }

    /**
     * render the JSX elements
     * @returns {JSX.Element} including a logo and the avatar of the current user and a button to logout
     */
    render() {
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <div>
                        <img src={logo}/>
                    </div>
                </ImageWrapper>
                <LogoutWrapper>
                    <div>
                        <Avatar onClick={()=>{this.props.history.push("/AdminHomePage")}} src={this.props.image} size={64} style={{ left: '70%', margin: '2% auto' }} icon={<UserOutlined />} />
                        <Button danger style={{ left: '75%', margin: '2% auto' }} onClick={this.handleClick} >Logout</Button>
                    </div>
                </LogoutWrapper>
                <br></br> <br></br> <br></br>
                <Seperator/>
                <br />
            </HeaderWrapper>
        );
    }
}

export default withRouter(Header);