/**
 * The Body Wrapper holds login functionality
 * After click signup button, all inputs are submitted to the database
 * Author: Yujun Yan, Kaixuan Guo
 */
import React from 'react';
import { BodyWrapper, SubmitButton } from './Signup.style';
import noteImg from "../../img/note.png"
import { Link } from "react-router-dom";

import UserManager from "../../DataModel/UserModel/UserManager";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';


const CLASS_NAME = "Signup/Body";

class Body extends React.Component {
    constructor(props) {
        super(props);
        const query = this.props.location.search;
        const pid = query.substr(5);
        this.onEmailEnter = this.onEmailEnter.bind(this);
        this.onPasswordEnter = this.onPasswordEnter.bind(this);
        this.onRePasswordEnter = this.onRePasswordEnter.bind(this);
        this.onFullnameEnter = this.onFullnameEnter.bind(this);
        this.onNicknameEnter = this.onNicknameEnter.bind(this);
        this.signup = this.signup.bind(this);
        this.state = { email: '', password: '', re_password: '', full_name: '', nick_name: '', pid: pid};
    }

    /**
     * isTrigger when clicking signup button 
     * @param {*} e 
     */
    signup(e) {
        e.preventDefault();
        if (document.getElementById("password").value !== document.getElementById("confirmPassword").value) {
            alert("The passwords entered does not match!");
            return;
        }

        /**
         * all inputs are passed to the db
         * firebase: firestore
         */
        UserManager.signup(this.state.email, this.state.password, this.state.full_name, this.state.nick_name)
            .then(response => {
                if(this.state.pid){
                    this.props.history.push({pathname:'/Login', search:"?pid="+this.state.pid});
                }
                else {
                    this.props.history.push("/Login");
                }
            })
            .catch(err => {
                console.error(`${CLASS_NAME}| signup | failed to sign up user with email ${this.state.email}`);
                alert(err);
            });
    }

    /**
     * updateEmail
     * @param {*} e 
     */
    onEmailEnter(e) {
        this.setState({ email: e.target.value });
    }

    /**
     * updatePassword
     * @param {*} e 
     */
    onPasswordEnter(e) {
        this.setState({ password: e.target.value });
    }

    /**
     * update reentered password
     * @param {*} e 
     */
    onRePasswordEnter(e) {
        this.setState({ re_password: e.target.value });
    }

    /**
     * update fullname
     * @param {*} e 
     */
    onFullnameEnter(e) {
        this.setState({ full_name: e.target.value });
    }

    /**
     * update nickname
     * @param {*} e 
     */
    onNicknameEnter(e) {
        this.setState({ nick_name: e.target.value });
    }

    /**
     * be directed to the login page when clicking the
     * "Already have an account" button
     */
    handleChange = () => {
        if(this.state.pid){
            this.props.history.push({pathname:'/Login', search:"?pid="+this.state.pid});
        }
        else {
            this.props.history.push("/Login");
        }
    }

    render() {
        return (
            <BodyWrapper>
                <div className="cal"><img src={noteImg} alt={"instruction"}/></div>
                <div className="title">Let's make you a Genyus!</div>
                <br />
                <form onSubmit={this.signup}>
                    <div align={'center'}>
                        <label htmlFor="email" style={{ fontSize: "25px" }}>Email</label>
                    </div>

                    <Input id={'email'} size={"large"} placeholder={'Email'} allowClear value={this.state.email} onChange={this.onEmailEnter} style={{ width: '55%' }} />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="password" style={{ fontSize: "25px" }}>Password</label>
                    </div>

                    <Input.Password id={'password'} size={"large"} placeholder={'Password'} value={this.state.password} onChange={this.onPasswordEnter} style={{ width: '55%' }} />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="confirmPassword" style={{ fontSize: "25px" }}>Re-enter</label>
                    </div>

                    <Input.Password id={'confirmPassword'} size={"large"} placeholder={'Re-enter your password'} value={this.state.re_password} onChange={this.onRePasswordEnter} style={{ width: '55%' }} />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="full_name" style={{ fontSize: "25px" }}>Full Name</label>
                    </div>

                    <Input id={'full_name'} size={"large"} allowClear placeholder={'Full Name'} value={this.state.full_name} onChange={this.onFullnameEnter} style={{ width: '55%' }} />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="nick_name" style={{ fontSize: "25px" }}>Nickname</label>
                    </div>

                    <Input id={'nick_name'} size={"large"} allowClear placeholder={'Nick Name'} value={this.state.nick_name} onChange={this.onNicknameEnter} style={{ width: '55%' }} />
                    <br />
                    <br />

                    <div align={'center'} style={{ width: '90%' }}>
                        <br />
                        <Button htmlType={"submit"} id={'signup-button'} type={"primary"} size={"large"}
                            style={{ fontSize: "large", display: "block", margin: "0% auto 5%", width: "100%" }} >
                            Sign up
                        </Button>
                    </div>
                </form>
                <br />
                <Button type="text" danger onClick={this.handleChange} style={{ marginBottom: "3%" }}>Already have an account? Log in</Button>

            </BodyWrapper>
        )
    }
}

Body.propTypes = {};


export default withRouter(Body);
