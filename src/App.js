import React,{useState} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import HomePage from './UILayer/HomePage/HomePage';
import Signup from './UILayer/Signup/Signup'
import Login from './UILayer/Login/Login'
import Notification from './UILayer/Notification/Notification'
import ViewAcceptedSession from "./UILayer/Participant/ViewAcceptedSession/ViewAcceptedSession";
import Users from './UILayer/Participant/Users/Users'

import ResearcherList from './UILayer/Admin/Admin/ResearcherList/ResearcherHomePage'
import ResearcherDetail from './UILayer/Admin/Admin/ResearcherDetail/ResearcherDetail'
import ResearcherCreate from './UILayer/Admin/Admin/ResearcherCreate/ResearcherCreate'

import ProfileSetting from './UILayer/Participant/ProfileSetting/ProfileSetting'
// import StatusAndRewards from './StatusAndRewards/StatusAndRewards'
import Admins from './UILayer/Admin/Admins/Admins'
import Researchers from './UILayer/Researcher/Researchers/Researchers'



function App(){
  // const [nickName, setNickName] = useState("");
  return (
    <Router>

        <Route path="/HomePage" component={HomePage}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/ProfileSetting" component={ProfileSetting}></Route>
        <Route path="/users" component={Users}></Route>
        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}
        <Route path="/Admins" component={Admins}></Route>
        <Route path="/Researchers" component={Researchers}></Route>
        <Route path="/Notification" component={Notification}></Route>

        {/*<Route path="/StatusAndRewards" component={StatusAndRewards}></Route>*/}
        <Route path="/Admin/ResearcherList" component={ResearcherList}/>
        <Route path="/Admin/ResearcherDetail/:fullname" component={ResearcherDetail}/>
        <Route path="/Admin/ResearcherCreate" component={ResearcherCreate}/>

        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}

        <Route path="/ViewAcceptedSession/:nid" component={ViewAcceptedSession}></Route>
        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}
    </Router>
  );
}
export default App;
