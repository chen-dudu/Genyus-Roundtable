import { withRouter } from 'react-router-dom'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../img/logo.png';
import {HeaderWrapper,ImageWrapper,Seperator} from './ResearcherDetail.style';


class Header extends React.Component {
  render(){
    return (
      <HeaderWrapper>
        <ImageWrapper>
          <img src={logo}/>
          <Button type="primary" onClick={() => this.props.history.push('/HomePage')}>Sign out</Button>
        </ImageWrapper>
       
        <Seperator/>
      </HeaderWrapper>
      
    );
  }
}

export default withRouter(Header)