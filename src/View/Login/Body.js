import React from 'react';
// import PropTypes from 'prop-types';
import { BodyWrapper, SubmitButton, GoSignup } from './Login.style';
import noteImg from "../../img/note.png"
import UserManager from "../../DataModel/UserModel/UserManager";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

const CLASS_NAME = "Login/Body";

class Body extends React.Component {


    constructor(props) {
        super(props);
        const query = this.props.location.search;
        const pid = query.substr(5);

        this.state = { email: '', password: '', pid: pid };



        this.onEmailEnter = this.onEmailEnter.bind(this);
        this.onPasswordEnter = this.onPasswordEnter.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    login(e) {
        e.preventDefault();
        //console.log('user', this.state.email, 'is trying to login using password', this.state.password);
        UserManager.login(this.state.email, this.state.password)
            .then(userType => {
                // redirect to user home page
                console.debug(`${CLASS_NAME} | login | successfully login user, who is a ${userType}`);
                //console.log(this.state.pid);

                if (this.state.pid) {
                    this.props.history.push({pathname:'/PodSignup', search:"?pid="+this.state.pid});
                }
                else if (userType === "participant") {
                    this.props.history.push("/ParticipantHomePage");
                }
                else if (userType === "admin") {
                    this.props.history.push("/AdminHomePage");
                }
                else {
                    this.props.history.push("/ResearcherHomePage");
                }
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | login | failed to login the user with email ${this.state.email}`);
                alert(err);
            });
    }

    // update email
    onEmailEnter(e) {
        this.setState({ 'email': e.target.value });
        //console.log('new state', this.state);
    }

    // update password
    onPasswordEnter(e) {
        // console.log('password enter:', e.target);
        this.setState({ 'password': e.target.value });
        //console.log('new state', this.state);
    }

    handleChange(e) {
        if(this.state.pid){
            this.props.history.push({pathname:'/Signup', search:"?pid="+this.state.pid});
        }
        else {
            this.props.history.push("/Signup");
        }


    }

    render() {
        return (
            <BodyWrapper>
                <div className="cal"><img src={noteImg} alt={"instruction"}/></div>
                <div className="title">Welcome Back!</div>
                <br />
                <br />
                <form onSubmit={this.login} >
                    <div align={'center'}>
                        <label htmlFor="email" style={{ fontSize: "25px" }}>Email</label>
                    </div>

                    <Input id={'email'} size={"large"} placeholder={'Email'} allowClear value={this.state.email} onChange={this.onEmailEnter} style={{ width: '50%' }} />
                    <br />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="password" style={{ fontSize: "25px" }}>Password</label>
                    </div>

                    <Input.Password id={'password'} size={"large"} placeholder={'Password'} value={this.state.password} onChange={this.onPasswordEnter} style={{ width: '50%' }} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div align={'center'} style={{ width: "90%" }} >
                        <Button htmlType={"submit"} id={'login-button'} type={"primary"} size = {"large"}
						        style={{ fontSize:"large", display:"block", margin: "0% auto 5%", width:"100%" }} >
                            Log in
                        </Button>

                    </div>
                </form>
                <br/>
                <Button type="text" danger onClick={this.handleChange}>Don't have an account? Sign up</Button>

                <br />
                <br />
            </BodyWrapper>
        );
    }
}

// Body.propTypes = {};

export default withRouter(Body);
