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
  height: 800px;

  
  
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