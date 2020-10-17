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
import ParticipantHomePage from './UILayer/Participant/ParticipantHomePage/ParticipantHomePage'

import ResearcherList from './UILayer/Admin/ResearcherList/ResearcherHomePage'
import ResearcherDetail from './UILayer/Admin/ResearcherDetail/ResearcherDetail'
import ResearcherCreate from './UILayer/Admin/ResearcherCreate/ResearcherCreate'

import ProfileSetting from './UILayer/Participant/ProfileSetting/ProfileSetting'
// import StatusAndRewards from './StatusAndRewards/StatusAndRewards'
import AdminHomePage from './UILayer/Admin/AdminHomePage/AdminHomePage'
import ResearcherHomePage from './UILayer/Researcher/ResearcherHomePage/ResearcherHomePage'
import Detail from './UILayer/Detail/Detail'

import PodCreate from './UILayer/Admin/PodCreate/PodCreate'



function App(){
  // const [nickName, setNickName] = useState("");
  return (
    <Router>
      <switch>
        {/* <Route path="/HomePage" component={HomePage}></Route> */}
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/ProfileSetting" component={ProfileSetting}></Route>
        <Route path="/ParticipantHomePage" component={ParticipantHomePage}></Route>
        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}
        <Route path="/AdminHomePage" component={AdminHomePage}></Route>
        <Route path="/ResearcherHomePage" component={ResearcherHomePage}></Route>
        <Route path="/Notification" component={Notification}></Route>

        {/*<Route path="/StatusAndRewards" component={StatusAndRewards}></Route>*/}
        <Route path="/Admin/ResearcherList" component={ResearcherList}/>
        <Route path="/Admin/ResearcherDetail/:fullname" component={ResearcherDetail}/>
        <Route path="/Admin/ResearcherCreate" component={ResearcherCreate}/>
        <Route path="/Detail" component={Detail}/>

        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}

        <Route path="/ViewAcceptedSession/:nid" component={ViewAcceptedSession}></Route>
        {/* <Route path="/StatusAndRewards" component={StatusAndRewards}></Route> */}

        <Route path="/Admin/PodCreate" component={PodCreate}></Route>
        </switch>
    </Router>
  );
}
export default App;
