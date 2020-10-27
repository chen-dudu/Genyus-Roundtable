import React,{useState} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import HomePage from './UILayer/HomePage/HomePage';
import Signup from './UILayer/Signup/Signup'
import Login from './UILayer/Login/Login'
import Notification from './UILayer/Participant/Notification/Notification'
import ViewAcceptedSession from "./UILayer/Participant/ViewAcceptedSession/ViewAcceptedSession";
import ParticipantHomePage from './UILayer/Participant/ParticipantHomePage/ParticipantHomePage'

import ResearcherList from './UILayer/Admin/ResearcherList/ResearcherList'
import ResearcherDetail from './UILayer/Admin/ResearcherDetail/ResearcherDetail'
import ResearcherCreate from './UILayer/Admin/ResearcherCreate/ResearcherCreate'

import ProfileSetting from './UILayer/Participant/ProfileSetting/ProfileSetting'

import AdminHomePage from './UILayer/Admin/AdminHomePage/AdminHomePage'
import Detail from './UILayer/Detail/Detail'
import AdminPodList from './UILayer/Admin/AdminPodList/AdminPodList'

import PodCreate from './UILayer/Admin/PodCreate/PodCreate'
import PodInvitation from './UILayer/Admin/PodInvitation/PodInvitation'
import PodSignup from "./UILayer/Participant/PodSignup/PodSignup";
import PodLandingPage from "./UILayer/Participant/PodLandingPage/PodLandingPage";
import ResearcherHomePage from "./UILayer/Researcher/ResearcherHomePage/ResearcherHomePage"
import ParticipantPodList from "./UILayer/Participant/ParticipantPodList/ParticipantPodList";
import ResearcherPodList from "./UILayer/Researcher/ResearcherPodList/ResearcherPodList";


function App(){

    return (
    <Router>

    <switch>

    <Route exact path="/" component={HomePage}/>

    <Route path="/Signup" component={Signup}/>
    <Route path="/Login" component={Login}/>
    <Route path="/ProfileSetting" component={ProfileSetting}/>
    <Route path="/ParticipantHomePage" component={ParticipantHomePage}/>
    <Route path="/Participant/ParticipantPodList" component={ParticipantPodList}/>

    <Route path="/AdminHomePage" component={AdminHomePage}/>
    <Route path="/ResearcherHomePage" component={ResearcherHomePage}/>
    <Route path="/ResearcherPodList/ResearcherPodList" component={ResearcherPodList}/>

    <Route path="/Notification" component={Notification}/>

    <Route path="/Admin/ResearcherList" component={ResearcherList}/>
    <Route path="/Admin/ResearcherDetail/:fullname" component={ResearcherDetail}/>
    <Route path="/Admin/ResearcherCreate" component={ResearcherCreate}/>
    <Route path="/Detail" component={Detail}/>
    <Route path="/Admin/AdminPodList" component={AdminPodList}/>

    <Route path="/PodSignup" component={PodSignup}/>
    <Route path="/PodLandingPage" component={PodLandingPage}/>


    <Route path="/ViewAcceptedSession/:nid" component={ViewAcceptedSession}/>

    <Route path="/Admin/PodCreate" component={PodCreate}/>
    <Route path="/Admin/PodInvitation" component={PodInvitation}/>

    </switch>
    </Router>
    );
  }
export default App;
