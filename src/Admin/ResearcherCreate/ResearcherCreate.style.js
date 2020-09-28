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

export const ProfileWrapper = styled.div`
    

    position: absolute;
    left: 25%;
    top: 15%;

   
`;

export const BodyWrapper = styled.div`
  width: 70%;
  height: 100%;
  // top right down
  margin: 100px auto 0px;
  border: 1px solid;
  border-color: red;
  border-radius: 5px;
  position: relative;

  // priority
  z-index:10;
  background-image: linear-gradient(white,white,#ffce33);
  /* background-image: linear-gradient(white, yellow); */
  .cal {
    position: absolute;
    left:-10px;
    transform: translateX(-100%);
    >img {
      width:300px;
    }
  }
  .title {
    position: absolute;
    left:20px;
    top:20px;  
    color: red;
    font-size: 30px;
    
  }
  .cancelButton{
    position: absolute;
    bottom: 30px;
    left:30px;    
  }
  .confirmButton{
    position: absolute;
    bottom: 30px;
    right:30px;    
  }

  > form > div {
    display: inline-block;
    width: 140px;
    margin-left: 20px;
  }
`;

export const ImageWrapper = styled.div`
  margin-left: 0;
  > img {
    height: 130px;
  }
  > p {
    font-size: 40px;
    font-weight: bold;
    color:#4682B4;
    margin-left:20px;
  }
  > Button {
    position: absolute;
    right:25px;
    top: 25px;
    
  }
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
  cursor: hand;


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
export const TitleWrapper = styled.div`
      > h1 {
      position: absolute;
      left:20px;
      top:10px;
      color: #4682B4;
      font-size: 40px;
      font-weight: normal;
      text-align: center;
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



export const Body1Wrapper = styled.div`
      width: 100%;
      position: relative;
      background-image: linear-gradient(white,white,#ffce33);
      
      #editButton {
      position: absolute;
      right: 15%;
      top: 10px;
      color: white;
      font-weight:bold;
      font-size:20px;
      background: #4682B4;
      width: 250px;
      height: 50px;
      cursor: hand;
  
  
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
      :hover {
        background:#3399ff
      }
      border-radius: 5px;
      outline: 0px;
      }
      
  
`

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