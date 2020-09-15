import React from 'react';
// import PropTypes from 'prop-types';
import { BodyWrapper, SubmitButton, Input, GoSignup} from './Notification.style';
import noteImg from "../img/note.png"
import firebase from '../firebase';

export class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.onEmailEnter = this.onEmailEnter.bind(this);
        this.onPasswordEnter = this.onPasswordEnter.bind(this);
        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();
        const auth = firebase.auth();
        console.log('user', this.state.email, 'is trying to login using password', this.state.password);
        // TODO handle exception return (e.g. wrong password, user not existed)
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(credential => {
            // TODO redirecting to home page after successful login
            console.log('successful login for user', this.state.email);
            window.location.href = "http://localhost:3000/users";
        }, credential => {
            console.log(credential);
            alert(credential.message);
        });
    }

    // update email
    onEmailEnter(e) {
        // console.log('email enter:', e.target.value);
        this.setState({'email': e.target.value});
        console.log('new state', this.state);
    }

    // update password
    onPasswordEnter(e) {
        // console.log('password enter:', e.target);
        this.setState({'password': e.target.value});
        console.log('new state', this.state);
    }

    render() {
        return (
            <BodyWrapper>
                <div className="cal"><img src={noteImg}></img></div>
                <div className="title">Welcome Back!</div>
                <br />
                <br />
                <form onSubmit={this.login}>
                    <div align={'center'}>
                        <label htmlFor="email" style={{ fontSize: "25px" }}>Email</label>
                    </div>

                    {/*<Input type="text" id="email" name="email" style={{ width: "50%" }} />*/}
                    <input type={'text'} id={'email'} name={'email'} value={this.state.email} style={{width: '50%', height: 30}} onChange={this.onEmailEnter} />
                    <br />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="password" style={{ fontSize: "25px" }}>Password</label>
                    </div>

                    {/*<Input type="password" id="password" name="password" style={{ width: "50%" }} />*/}
                    <input type={'password'} id={'password'} name={'password'} value={this.state.password} style={{width: '50%', height: 30}} onChange={this.onPasswordEnter}/>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div align={'center'} style={{ width: '90%'}}>
                        <input align={'center'} id={'login-button'} style={{background: "#3399ff", borderRadius: 5,
                            width: "80%", height: 40, fontWeight: "bold",
                            fontSize: 20, color: "white"}}
                               type={'submit'} value={'Log in'} />
                    </div>
                </form>
                {/*<SubmitButton>Log In</SubmitButton>*/}
                {/* todolist: domain name need to be updated after deploying*/}
                <GoSignup><a href = 'http://localhost:3000/signup'>Don't have an account? Sign up</a></GoSignup>
                <br />
                <br />
            </BodyWrapper>
        );
    }
}