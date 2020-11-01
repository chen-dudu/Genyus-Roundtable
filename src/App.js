import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"

import HomePage from './View/HomePage/HomePage';
import Signup from './View/Signup/Signup';
import Login from './View/Login/Login';
import Notification from './View/ParticipantUI/Notification/Notification';
import ViewAcceptedSession from "./View/ParticipantUI/ViewAcceptedSession/ViewAcceptedSession";
import ParticipantHomePage from './View/ParticipantUI/ParticipantHomePage/ParticipantHomePage';
import ResearcherList from './View/AdminUI/ResearcherList/ResearcherList';
import ResearcherDetail from './View/AdminUI/ResearcherDetail/ResearcherDetail';
import ResearcherCreate from './View/AdminUI/ResearcherCreate/ResearcherCreate';
import ProfileSetting from './View/ParticipantUI/ProfileSetting/ProfileSetting';
import AdminHomePage from './View/AdminUI/AdminHomePage/AdminHomePage';
import Detail from './View/Detail/Detail';
import AdminPodList from './View/AdminUI/AdminPodList/AdminPodList';
import PodCreate from './View/AdminUI/PodCreate/PodCreate';
import PodInvitation from './View/AdminUI/PodInvitation/PodInvitation';
import PodSignup from "./View/ParticipantUI/PodSignup/PodSignup";
import PodLandingPage from "./View/ParticipantUI/PodLandingPage/PodLandingPage";
import ResearcherHomePage from "./View/ResearcherUI/ResearcherHomePage/ResearcherHomePage";
import ParticipantPodList from "./View/ParticipantUI/ParticipantPodList/ParticipantPodList";
import ResearcherPodList from "./View/ResearcherUI/ResearcherPodList/ResearcherPodList";

/**
 * a function that defines the react router, which controls the jump between the pages
 * @returns {JSX.Element} returns routers
 */
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
