import styled from "styled-components";

export const LeftWrapper = styled.div`
  width:33.3%;
  float:left;
  >div {
    margin:0 auto;
    width:50%;
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

export const FooterWrapper = styled.div`
  height: 200px;
  
  background: #141414;
  width:100%;
  bottom:0px;
  left:0px;
`

export const HeaderWrapper = styled.div`
  height: 200px;
  left:0px;
`
export const ImageWrapper = styled.div`
  width:50%;
  height: 80%;
  float:left;

  >div>img {
    height:130px;
`
export const LogoutWrapper = styled.div` 
  width:50%;
  height: 80%;
  float:left;
  // >div>img {
  //   margin-left: 30%;
  //   margin-top:2%;
  //   height:80px;
`

export const LogoutButton = styled.div`
  float:left;
  text-align:center;
  position: relative;
  color: red;
  font-weight:bold;
  font-size:15px;
  background: white;
  width: 10%;
  height: 10%;
  top:5%;
  left: 80%;
  border: solid 3px;
  border-color: red;

  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  :hover {
    background:#3399ff
  }
`

export const Seperator = styled.div`
  height: 20px;
  margin-bottom: 10%;
  background-image: linear-gradient(white, #4682B4);
  `

export const BodyWrapper = styled.div`
  width: 100%;
  position: relative;

  background-image: white;
  
  > h1 {
    font-size: 40px;
    font-weight: bold;
    color:#4682B4;
    margin-left:20px;
    margin-bottom: -10px;
  }

  > h2 {
    font-size: 30px;
    color:red;
    margin-left:20px;
    top: 10px;
  }
 
`

export const Body2Wrapper = styled.div`
  width: 100%;
  position: relative;
  
  background-image: linear-gradient(#4682B4,#4682B4,#4682B4,#4682B4, white);
  
  > h1 {
    font-size: 30px;
    color:white;
    margin-left:40px;
    margin-bottom: -10px;
  }

  > h2 {
    font-size: 30px;
    color:red;
    margin-left:20px;
    top: 10px;
  }
 
`

export const Body3Wrapper = styled.div`
  width: 100%;
  position: relative;

  background-image: linear-gradient(white,white,#ffce33);
  
  > h1 {
    font-size: 40px;
    font-weight: bold;
    color:#4682B4;
    margin-left:20px;
    margin-bottom: -10px;
  }

  > h2 {
    font-size: 30px;
    color:red;
    margin-left:20px;
    top: 10px;
    margin-bottom: -10px;
  }
  
  > h3 {
    font-size: 20px;
    color:black;
    margin-left:5%;
    margin-right:50%;
    top: 10px;
  }
  
  > div > iframe {
    height:350px;
    width:600px;
  }
  
  > div > h2 {
    font-size: 20px;
    color:red;
    margin-left:20px;
    top: 10px;
    text-align: center;
    margin-bottom: -2px;
  }
 
`
export const ListWrapper = styled.div`
      width: 100%;
      margin: 0%;

`;
