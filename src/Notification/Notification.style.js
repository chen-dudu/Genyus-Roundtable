import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 200px;
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

export const LogoutWrapper = styled.div` 
  width:50%;
  height: 80%;
  float:left;
  // >div>img {
  //   margin-left: 30%;
  //   margin-top:2%;
  //   height:80px;
`;

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
  left: 30%;
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
  `;

export const ProfileWrapper = styled.div`
    display: inline-block;
    width: 20%;
    height: 80%;

    // border-radius: 50%;

    position: absolute;
    left: 30%;
`


export const NotificationButton = styled.div`
  color: white;
  font-weight:bold;
  font-size:15px;
  background: #4682B4;
  width: 200px;
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 30%;
  top: 40%;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  :hover {
    background:#3399ff
  }
`

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
export const Body1Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  position: relative;

  background-image: linear-gradient(white,white,#ffce33);
  
  > h1 {
    font-size: 40px;
    font-weight: bold;
    color:#4682B4;
    margin-left:20px;
  }

  > h2 {
    margin:20px auto;
    color: red;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }


  > div {
    text-align: center;
  }

  > div > img {
    margin-left:-50px;
  }

  > div > p {
    color: red;
    font-size: 20px;
    font-weight: normal;
    margin-top:0px;
  }

  > div > iframe {
    height:400px;
    width:800px;
  }

  #SignUp {
    margin:20px auto;
    color: #4682B4;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
  }

  }
`

export const WelcomeWrapper = styled.div`
    margin:20px auto;
    color: #4682B4;
    font-size: 30px;
    font-weight: normal;
    text-align: center;

`

export const TitleWrapper = styled.div`
      > h1 {
    font-size: 40px;
    font-weight: bold;
    color:#4682B4;
    margin-left:20px;
  }
    
      > Button {
      position: absolute;
      right: 25%;
      top: 20px;
      
      } 
  `;

export const ListWrapper = styled.div`
      width: 50%;
      margin: auto;
      
      
  `;