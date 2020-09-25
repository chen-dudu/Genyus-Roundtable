import React,{useState} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Signup from './Signup/Signup'
import Login from './Login/Login'
import Users from './Users/Users'

import ResearcherList from './Admin/ResearcherList/ResearcherHomePage'
import ResearcherDetail from './Admin/ResearcherDetail/ResearcherDetail'
import ResearcherCreate from './Admin/ResearcherCreate/ResearcherCreate'

import ProfileSetting from './ProfileSetting/ProfileSetting'
import StatusAndRewards from './StatusAndRewards/StatusAndRewards'



function App(){
  const [nickName, setNickName] = useState("");
  return (
    <Router>

        <Route path="/HomePage" component={HomePage}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Login" component={Login}/>

        <Route path="/Admin/ResearcherList" component={ResearcherList}/>
        <Route path="/Admin/ResearcherDetail" component={ResearcherDetail}/>
        <Route path="/Admin/ResearcherCreate" component={ResearcherCreate}/>

        <Route path="/ProfileSetting" component={ProfileSetting}/>
        <Route path="/users" component={Users}/>

    </Router>
  );
}
export default App;
