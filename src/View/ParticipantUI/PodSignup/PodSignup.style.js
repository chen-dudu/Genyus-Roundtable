/**
 *@File: a file that exports styled-components
 */

import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 150px;
  left:0px;
`;

export const FooterWrapper = styled.div`
  height: 200px;
  
  background: #141414;
  width:100%;
  bottom:0px;
  left:0px;
 
`;

export const ImageWrapper = styled.div`
  width:50%;
  height: 80%;
  float:left;

  >div>img {
    height:130px;
`;

export const Seperator = styled.div`
  height: 10px;
  background-image: linear-gradient(white, #4682B4);
  `;


export const SubmitButton = styled.div`
  color: white;
  font-weight:bold;
  font-size:20px;
  background: #4682B4;
  width: 150px;
  height: 50px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  :hover {
    background:#3399ff
  }

  // height of the word inside
  line-height: 50px;
  margin: 10px auto 30px;
  text-align: center;
  border-radius: 5px;
`;
export const BodyLeftWrapper = styled.div`
  width:20%;
  float:left;
  > h1 {
    margin:20px auto;
    color: #4682B4;
    font-size: 40px;
    font-weight: normal;
    text-align: center;
  }

  > h2 {
    margin:20px auto;
    color:  #4682B4;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }
  .fullname{
    margin:20px auto;
    color:  #4682B4;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  .description{
    
    margin-left: 20px;
    color:  #4682B4;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  
  `
export const BodyRightWrapper = styled.div`
  width:80%;
  float:left;
  > h1 {
    margin:20px auto;
    color: #4682B4;
    font-size: 40px;
    font-weight: normal;
    text-align: center;
  }

  > h2 {
    margin:20px auto;
    color: red;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }
  `

export const LeftWrapper = styled.div`
  width:33.3%;
  float:left;
  >div {
    margin:0 auto;
    width:50%;

    // height:100%;
  }
  >div>img {
    height:200px;
  `
export const MidWrapper = styled.div`
  width:33.3%;
  float:left;
  >div {
    margin:0 auto;
    width:50%;

    // height:100%;
  }
  >div>img {
    height:200px;
  }
`

export const RightWrapper = styled.div`
  width:33.3%;
  float:left;
  >div {
    margin:0 auto;
    width:50%;
    // height:60%;
  }
  >div>img {
    height:150px;
  }
`


export const Body1Wrapper = styled.div`
  width: 100%;
  height: revert;
  background-image: linear-gradient(white,white,#ffce33);
 

  
  
 > h1 {
    margin:20px auto;
    color: #4682B4;
    font-size: 40px;
    font-weight: normal;
    text-align: center;
  }

  > h2 {
    margin:20px auto;
    color: red;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }
  

  
`

export const Body2Wrapper = styled.div`
  width: 100%;
  height: revert;
  background: #4682B4;
  
 
  
  

  > h2 {
   
    color:  white;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }
  .fullname{
   
    color:  white;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  .description{
    margin: auto;
    width: 55%;
    color:  white;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    
    
  }
  
  

`


export const LogoutWrapper = styled.div` 
  width:50%;
  height: 80%;
  float:left;
  // >div>img {
  //   margin-left: 30%;
  //   margin-top:2%;
  //   height:80px;
`;





export const ProfileWrapper = styled.div`
    
    width: 10%;
    position: relative;
    left: 45.75%;
   
    

   
`