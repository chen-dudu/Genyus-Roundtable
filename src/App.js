import React,{useState} from 'react';
import './App.css';
import logo from './img/logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Signup from './Signup/Signup'
import Login from './Login/Login'
import Users from './Users/Users'
import ProfileSetting from './ProfileSetting/ProfileSetting'
import StatusAndRewards from './StatusAndRewards/StatusAndRewards'


function App(){
  const [nickName, setNickName] = useState("");
  return (
    <Router>
        <Route path="/HomePage" component={HomePage}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/ProfileSetting" component={ProfileSetting}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/StatusAndRewards" component={StatusAndRewards}></Route>
    </Router>
  );
}
export default App;
