import React, {useState} from 'react';
import logo from '../../../img/logo.png';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';
import UserManager from "../../../DataModel/UserModel/UserManager";


class ParticipantHomePage extends React.Component {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            displayName: "",
            photo: ""
        };
        // get display name and avtar file
        UserManager.getCurrentUser()
            .then(user => {
                this.setState({displayName: user.displayName});
                // use url to get photo file
                UserManager.getAvatar(user.photoURL)
                    .then(photoFile => {
                        this.setState({photo: photoFile});
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                <Header photo = {this.state.photo} />
                <Body displayName = {this.state.displayName} photo = {this.state.photo} />
                <Footer />
            </div>
        );
    }
}

// ========================================
export default ParticipantHomePage;