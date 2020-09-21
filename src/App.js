import React from 'react';
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



class App extends React.Component{
  render(){
  return (
    <Router>
        <Route path="/HomePage" component={HomePage}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Login" component={Login}/>
        <Route path="/users" component={Users}/>
        <Route path="/Admin/ResearcherList" component={ResearcherList}/>
        <Route path="/Admin/ResearcherDetail" component={ResearcherDetail}/>
        <Route path="/Admin/ResearcherCreate" component={ResearcherCreate}/>
    </Router>
  );
}
}
export default App;
