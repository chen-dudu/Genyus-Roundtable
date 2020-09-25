import { withRouter } from 'react-router-dom'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../../img/logo.png';
import {HeaderWrapper,ImageWrapper,Seperator} from './ResearcherHomePage.style';


class Header extends React.Component {
    render(){
        return (
            <HeaderWrapper>
                <ImageWrapper>
                    <img src={logo}/>
                    <Button style={{width:120, height:53,fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}} type="primary" onClick={() => this.props.history.push('/HomePage')}>Sign out</Button>
                </ImageWrapper>

                <Seperator/>
            </HeaderWrapper>

        );
    }
}

export default withRouter(Header)