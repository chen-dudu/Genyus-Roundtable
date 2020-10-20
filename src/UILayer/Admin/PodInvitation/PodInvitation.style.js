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

export const Seperator = styled.div`
  display:inline-block;
  height: 10%;
  width:100%;
  margin-bottom: 10%;
  background-image: linear-gradient(white, #4682B4);
  `;

export const ProfilePhotoWrapper = styled.div`
  height: 100px;
`

export const ProfileWrapper = styled.div`
    position: absolute;
    left: 25%;
    top: 15%;   
`;

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


export const BodyWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin: 10% auto 10%;
  border: 2px solid;
  border-color: red;
  border-radius: 5px;
  position: relative;


  // priority
  background-image: linear-gradient(white,white,#ffce33);
  /* background-image: linear-gradient(white, yellow); */
  > div {
    display: flex;
    justify-content: center;
  }

`;


export const Body1Wrapper = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  background-image: linear-gradient(white,white,#ffce33);

`
export const TitleWrapper = styled.div` 
  display:inline-block;
  > h2 {
  position: absolute;
  display: inline-block;
  left:20%;
  color: #4682B4;
  font-size: 40px;
  }
  `;

export const Body2Wrapper = styled.div`
  width: 100%;
  background: #4682B4;


  > h1 {
    color:white;
    font-weight:bold;
    font-size:40px;
    text-align:center;
  }

  > p {
    color:white;
    font-weight:normal;
    font-size:20px;
    margin-left:50px;
  }

`


export const WelcomeWrapper = styled.div`
    margin:20px auto;
    color: #4682B4;
    font-size: 30px;
    font-weight: normal;
    text-align: center;

`

export const ImageUploader = styled.div`
    display: inline-block;
    width: 200px;
    height: 200px;
    border: solid 3px;
    border-color: red;
    border-radius: 50%;

    position: absolute;
    left: 35%;
`