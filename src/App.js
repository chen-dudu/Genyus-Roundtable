import React,{useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Signup from './Signup/Signup'
import Login from './Login/Login'
import Notification from './Notification/Notification'
import ViewAcceptedSession from "./ViewAcceptedSession/ViewAcceptedSession";
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
        <Route path="/Notification" component={Notification}></Route>
        <Route path="/ViewAcceptedSession/:nid" component={ViewAcceptedSession}></Route>
        <Route path="/StatusAndRewards" component={StatusAndRewards}></Route>
    </Router>
  );
}
export default App;
