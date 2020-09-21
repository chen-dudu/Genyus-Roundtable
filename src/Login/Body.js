import React from 'react';
// import PropTypes from 'prop-types';
import { BodyWrapper, SubmitButton, GoSignup} from './Login.style';
import noteImg from "../img/note.png"

import UserManager from "../DataModel/UserModel/UserManager";
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';

const CLASS_NAME = "Login/Body";

export class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.onEmailEnter = this.onEmailEnter.bind(this);
        this.onPasswordEnter = this.onPasswordEnter.bind(this);
        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();
        console.log('user', this.state.email, 'is trying to login using password', this.state.password);
        UserManager.login(this.state.email, this.state.password)
            .then(userType => {
                console.info(`${CLASS_NAME} | login | successfully login user, who is a ${userType}`);
                // redirect to user hoem page
                window.location.href = "http://localhost:3000/users";
            })
            .catch(err => {
                console.error(`${CLASS_NAME} | login | failed to login the user with email ${this.state.email}`);
                alert(err);
            });
    }

    // update email
    onEmailEnter(e) {
        // console.log('email enter:', e.target.value);
        this.setState({'email': e.target.value});
        console.log('new state', this.state);
    }

    // update password
    onPasswordEnter(e) {
        // console.log('password enter:', e.target);
        this.setState({'password': e.target.value});
        console.log('new state', this.state);
    }

    render() {
        return (
            <BodyWrapper>
                <div className="cal"><img src={noteImg}></img></div>
                <div className="title">Welcome Back!</div>
                <br />
                <br />
                <form onSubmit={this.login}>
                    <div align={'center'}>
                        <label htmlFor="email" style={{ fontSize: "25px" }}>Email</label>
                    </div>

                    <Input size={"large"} placeholder={'Email'} allowClear value={this.state.email} onChange={this.onEmailEnter} style={{width: '50%'}}/>
                    {/*<Input type="text" id="email" name="email" style={{ width: "50%" }} />*/}
                    {/*<input type={'text'} id={'email'} name={'email'} value={this.state.email} style={{width: '50%', height: 30}} onChange={this.onEmailEnter} />*/}
                    <br />
                    <br />
                    <br />
                    <div align={'center'}>
                        <label htmlFor="password" style={{ fontSize: "25px" }}>Password</label>
                    </div>

                    <Input.Password size={"large"} placeholder={'Password'} value={this.state.password} onChange={this.onPasswordEnter} style={{width: '50%'}}/>
                    {/*<Input type="password" id="password" name="password" style={{ width: "50%" }} />*/}
                    {/*<input type={'password'} id={'password'} name={'password'} value={this.state.password} style={{width: '50%', height: 30}} onChange={this.onPasswordEnter}/>*/}
                    <br />
                    <br />
                    <br />
                    <br />
                    <div align={'center'} style={{width: "90%"}} >
                        <Button htmlType={"submit"} id={'login-button'} type={"primary"} block size={"large"} style={{fontSize: 18, fontWeight: "bold", background: "#3399ff", borderRadius: 5}}>
                            Log in
                        </Button>

                        {/*<input align={'center'} id={'login-button'} style={{background: "#3399ff", borderRadius: 5,*/}
                        {/*    width: "80%", height: 40, fontWeight: "bold",*/}
                        {/*    fontSize: 20, color: "white"}}*/}
                        {/*       type={'submit'} value={'Log in'} />*/}
                    </div>
                </form>
                {/*<SubmitButton>Log In</SubmitButton>*/}
                 {/*todolist: domain name need to be updated after deploying*/}
                <GoSignup><a href = 'http://localhost:3000/signup'>Don't have an account? Sign up</a></GoSignup>
                <br />
                <br />
            </BodyWrapper>
        );
    }
}


// const Bodyd = props => {
//   return (
//     <BodyWrapper>
//       <div className="cal"><img src={noteImg}></img></div>
//       <div className="title">Welcome Back!</div>
//       <br />
//       <br />
//       <form>
//         <div align={'center'}>
//           <label for="email" style={{ "font-size": "25px" }}>Email</label>
//         </div>
//
//         {/*<Input type="text" id="email" name="email" style={{ width: "50%" }} />*/}
//         <input type={'text'} id={'email'} name={'email'} style={{width: '50%', height: 30}} ref="email"/>
//         <br />
//         <br />
//         <br />
//         <div align={'center'}>
//           <label for="password" style={{ "font-size": "25px" }}>Password</label>
//         </div>
//
//         {/*<Input type="password" id="password" name="password" style={{ width: "50%" }} />*/}
//         <input type={'password'} id={'password'} name={'password'} style={{width: '50%', height: 30}} ref='password'/>
//         <br />
//         <br />
//         <br />
//         <br />
//         <div align={'center'} style={{ width: '90%'}}>
//             <input align={'center'} id={'login-button'} style={{background: "#3399ff", borderRadius: 5,
//                 width: "80%", height: 40, fontWeight: "bold",
//                 fontSize: 20, color: "white"}}
//                    type={'submit'} value={'Log in'} />
//         </div>
//       </form>
//       {/*<SubmitButton>Log In</SubmitButton>*/}
//       {/* todolist: domain name need to be updated after deploying*/}
//       <GoSignup><a href = 'http://localhost:3000/signup'>Don't have an account? Sign up</a></GoSignup>
//       <br />
//       <br />
//     </BodyWrapper>
//   );
// };



// Body.propTypes = {};

// export default Body;
