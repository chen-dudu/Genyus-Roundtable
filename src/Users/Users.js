import React from 'react';
import HomePage from './HomePage';
import {WelcomeWrapper} from'./HomePage.style'


class Users extends React.Component{
	

  render(){
  return (
    <div>
    	<WelcomeWrapper>Welcome,{this.props.location.state}!</WelcomeWrapper>
    	<HomePage></HomePage>
    </div>
  );
}
}

export default Users;