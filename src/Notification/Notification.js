import React from 'react';
import HomePage from './HomePage';
import {WelcomeWrapper} from './Notification.style'

class Notification extends React.Component{
	

  render(){
  return (
    <div>
    	{/* <WelcomeWrapper>Welcome,{this.props.location.state}!</WelcomeWrapper> */}
    	<HomePage></HomePage>
    </div>
  );
}
}

export default Notification;