import React from 'react';
// import PropTypes from 'prop-types';
import {BodyWrapper} from './Signup.style';
import noteImg from "../img/note.png"
import { Link } from "react-router-dom";

import firebase from "firebase";

class Body extends React.Component{
  constructor(props) {
    super(props);
    this.onEmailEnter = this.onEmailEnter.bind(this);
    this.onPasswordEnter = this.onPasswordEnter.bind(this);
    this.onRePasswordEnter = this.onRePasswordEnter.bind(this);
    this.onFullnameEnter = this.onFullnameEnter.bind(this);
    this.onNicknameEnter = this.onNicknameEnter.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {email: '', password: '', re_password: '', full_name: '', nick_name: ''};
  }

  signup(e) {
    if (document.getElementById("password").value !== document.getElementById("re_password").value) {
      alert("The passwords entered does not match!");
      return;
    }
    e.preventDefault();
    const auth = firebase.auth();
    const db = firebase.firestore();
    console.log('information from user', this.state);

    // first sign up user
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(credential => {
      // user signup successful, now can move on adding more info about this user
      let uid = credential.user.uid;
      console.log('successfully add in new user with uid', uid);
      let record = db.collection('users').doc(uid);
      record.set({fullname: this.state.full_name, nickname: this.state.nick_name});
      console.log("###");
      window.location.href = "http://localhost:3000/login";

    }, credential => {
      console.log(credential);
      alert(credential.message);
    });
  }

  onEmailEnter(e) {
    this.setState({email: e.target.value});
  }

  onPasswordEnter(e) {
    this.setState({password: e.target.value});
  }

  onRePasswordEnter(e) {
    this.setState({re_password: e.target.value});
  }

  onFullnameEnter(e) {
    this.setState({full_name: e.target.value});
  }

  onNicknameEnter(e) {
    this.setState({nick_name: e.target.value});
  }

  render(){
  // const nname = this.state.nname;
  return (
    <BodyWrapper>
      <div className="cal"><img src={noteImg}></img></div>
      <div className="title">Let's make you a Genyus!</div>
      <br />
      <form onSubmit={this.signup}>
        <div align={'center'}>
          <label htmlFor="email" style={{fontSize:"25px"}}>Email</label>
        </div>

        {/*<Input type="text" id="email" name="email" style={{width:"50%"}}></Input>*/}
        <input type={'text'} id={'email'} name={'email'} value={this.state.email} style={{width: '50%', height: 30}} onChange={this.onEmailEnter}/>
        <br />
        <br />
        <div align={'center'}>
          <label htmlFor="password" style={{fontSize:"25px"}}>Password</label>
        </div>

        {/*<Input type="text" id="password" name="password" style={{width:"50%"}}></Input>*/}
        <input type={'password'} id={'password'} name={'password'} value={this.state.password} style={{width: '50%', height: 30}} onChange={this.onPasswordEnter}/>
        <br />
        <br />
        <div align={'center'}>
          <label htmlFor="confirmPassword" style={{fontSize:"25px"}}>Re-enter</label>
        </div>

        {/*<Input type="text" id="confirmPassword" name="confirmPassword" style={{width:"50%"}}></Input>*/}
        <input type={'password'} id={'re_password'} name={'re_password'} value={this.state.re_password} style={{width: '50%', height: 30}} onChange={this.onRePasswordEnter}/>
        <br />
        <br />
        <div align={'center'}>
          <label htmlFor="full_name" style={{fontSize:"25px"}}>Full Name</label>
        </div>

        {/*<Input type="text" id="full_name" name="fname" style={{width:"50%"}}></Input>*/}
        <input type={'text'} id={'full_name'} name={'full_name'} value={this.state.full_name} style={{width: '50%', height: 30}} onChange={this.onFullnameEnter}/>
        <br />
        <br />
        <div align={'center'}>
          <label htmlFor="nick_name" style={{fontSize:"25px"}}>Nickname</label>
        </div>

        {/*<Input type="text" id="nname" name="nname" style={{width:"50%" }} value={nname}*/}
        {/*  onChange={this.handleChange} ></Input>*/}
        <input type={'text'} id={'nick_name'} name={'nick_name'} value={this.state.nick_name} style={{width: '50%', height: 30}} onChange={this.onNicknameEnter}/>
        <br />
        <br />

        <div align={'center'} style={{width: '90%'}}>
          <input align={'center'} id={'signup-button'} style={{background: "#3399ff", borderRadius: 5,
            width: "80%", height: 40, fontWeight: "bold",
            fontSize: 20, color: "white"}} type={'submit'} value={'Sign up'}/>
        </div>
      </form>
      <br/><br/>
      {/*<Link to={{pathname: '/users', state: this.state.nname}}>*/}
        {/*<SubmitButton type="primary">Sign Up</SubmitButton>*/}
      {/*</Link>*/}
    
    </BodyWrapper>
  )
}
}

Body.propTypes = {};

export default Body;
