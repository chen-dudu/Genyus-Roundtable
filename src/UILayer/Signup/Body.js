import React from 'react';
// import PropTypes from 'prop-types';
import { BodyWrapper, SubmitButton } from './Signup.style';
import noteImg from "../../img/note.png"
import { Link } from "react-router-dom";

import UserManager from "../../FoundationLayer/UserModel/UserManager";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';


const CLASS_NAME = "Signup/Body";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailEnter = this.onEmailEnter.bind(this);
        this.onPasswordEnter = this.onPasswordEnter.bind(this);
        this.onRePasswordEnter = this.onRePasswordEnter.bind(this);
        this.onFullnameEnter = this.onFullnameEnter.bind(this);
        this.onNicknameEnter = this.onNicknameEnter.bind(this);
        this.signup = this.signup.bind(this);
        this.state = { email: '', password: '', re_password: '', full_name: '', nick_name: '' };
    }

    signup(e) {
        e.preventDefault();
        if (document.getElementById("password").value !== document.getElementById("confirmPassword").value) {
            alert("The passwords entered does not match!");
            return;
        }
        console.log('information from user', this.state);

        // first sign up user

        UserManager.signup(this.state.email, this.state.password, this.state.full_name, this.state.nick_name)
            .then(response => {
                this.props.history.push("Login");
            })
            .catch(err => {
                console.error(`${CLASS_NAME}| signup | failed to sign up user with email ${this.state.email}`);
                alert(err);
            });
    }


    onEmailEnter(e) {
        this.setState({ email: e.target.value });
    }

    onPasswordEnter(e) {
        this.setState({ password: e.target.value });
    }

    onRePasswordEnter(e) {
        this.setState({ re_password: e.target.value });
    }

    onFullnameEnter(e) {
        this.setState({ full_name: e.target.value });
    }

    onNicknameEnter(e) {
        this.setState({ nick_name: e.target.value });
    }

    handleChange = () => {
        this.props.history.push("Login");
    }

    render() {
        // const nname = this.state.nname;
        return (
            <BodyWrapper>
                <div className="cal"><img src={noteImg}></img></div>
                <div className="title">Let's make you a Genyus!</div>
                <br />
                <form onSubmit={this.signup}>
                    <div align={'center'}>
                        <label htmlFor="email" style={{ fontSize: "25px" }}>Email</label>
                    </div>

                    <Input id={'email'} size={"large"} placeholder={'Email'} allowClear value={this.state.email} onChange={this.onEmailEnter} style={{ width: '55%' }} />
                    {/*<Input type="text" id="email" name="email" style={{width:"50%"}}></Input>*/}
                    {/*<input type={'text'} id={'email'} name={'email'} value={this.state.email} style={{width: '50%', height: 30}} onChange={this.onEmailEnter}/>*/}
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="password" style={{ fontSize: "25px" }}>Password</label>
                    </div>

                    <Input.Password id={'password'} size={"large"} placeholder={'Password'} value={this.state.password} onChange={this.onPasswordEnter} style={{ width: '55%' }} />
                    {/*<Input type="text" id="password" name="password" style={{width:"50%"}}></Input>*/}
                    {/*<input type={'password'} id={'password'} name={'password'} value={this.state.password} style={{width: '50%', height: 30}} onChange={this.onPasswordEnter}/>*/}
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="confirmPassword" style={{ fontSize: "25px" }}>Re-enter</label>
                    </div>

                    <Input.Password id={'confirmPassword'} size={"large"} placeholder={'Re-enter your password'} value={this.state.re_password} onChange={this.onRePasswordEnter} style={{ width: '55%' }} />
                    {/*<Input type="text" id="confirmPassword" name="confirmPassword" style={{width:"50%"}}></Input>*/}
                    {/*<input type={'password'} id={'re_password'} name={'re_password'} value={this.state.re_password} style={{width: '50%', height: 30}} onChange={this.onRePasswordEnter}/>*/}
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="full_name" style={{ fontSize: "25px" }}>Full Name</label>
                    </div>

                    <Input id={'full_name'} size={"large"} allowClear placeholder={'Full Name'} value={this.state.full_name} onChange={this.onFullnameEnter} style={{ width: '55%' }} />
                    {/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
                    {/*<input type={'text'} id={'full_name'} name={'full_name'} value={this.state.full_name} style={{width: '50%', height: 30}} onChange={this.onFullnameEnter}/>*/}
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="nick_name" style={{ fontSize: "25px" }}>Nickname</label>
                    </div>

                    <Input id={'nick_name'} size={"large"} allowClear placeholder={'Nick Name'} value={this.state.nick_name} onChange={this.onNicknameEnter} style={{ width: '55%' }} />
                    {/*<Input type="text" id="nname" name="nname" style={{width:"50%" }} value={nname}*/}
                    {/*  onChange={this.handleChange} ></Input>*/}
                    {/*<input type={'text'} id={'nick_name'} name={'nick_name'} value={this.state.nick_name} style={{width: '50%', height: 30}} onChange={this.onNicknameEnter}/>*/}
                    <br />
                    <br />

                    <div align={'center'} style={{ width: '90%' }}>
                        <br />
                        <Button htmlType={"submit"} id={'signup-button'} type={"primary"} size={"large"}
                            style={{ fontSize: "large", display: "block", margin: "0% auto 5%", width: "100%" }} >
                            Sign up
                        </Button>
                        {/*<input align={'center'} id={'signup-button'} style={{background: "#3399ff", borderRadius: 5,*/}
                        {/*    width: "80%", height: 40, fontWeight: "bold",*/}
                        {/*    fontSize: 20, color: "white"}} type={'submit'} value={'Sign up'}/>*/}
                    </div>
                </form>
                <br />
                <Button type="text" danger onClick={this.handleChange} style={{ marginBottom: "3%" }}>Already have an account? Log in</Button>
                {/*<Link to={{pathname: '/users', state: this.state.nname}}>*/}
                {/*<SubmitButton type="primary">Sign Up</SubmitButton>*/}
                {/*</Link>*/}

            </BodyWrapper>
        )
    }
}

Body.propTypes = {};


export default withRouter(Body);
