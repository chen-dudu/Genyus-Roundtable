import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 150px;
`;

export const BodyBG = styled.div`
  height: 120%;
  padding-bottom: 10%;
  background-image: linear-gradient(white,white,#ffce33);
`

export const BodyWrapper = styled.div`
  width: 30%;
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
    margin:20px auto;
    color: red;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }

  > form > div {
    display: inline-block;
    width: 140px;
    margin-left: 20px;
  }
`;

export const FooterWrapper = styled.div`
  height: 100%;
  background: #141414;
  display: flex;
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
  /* background:blue; */
  background-image: linear-gradient(white, #4682B4);
`;

export const Input = styled.input`
  height: 30px;
`

export const SubmitButton = styled.div`
  color: white;
  font-weight:bold;
  font-size:20px;
  background: #4682B4;
  width: 80%;
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
export const LeftWrapper = styled.div`
  width:33.3%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  `
export const MidWrapper = styled.div`
  width:33.3%;
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
  >div {
    margin:0 auto;
    width:50%;
    // height:60%;
  }
  >div>img {
    height:150px;
  }
`

export const Title = styled.div`
  color:white;
  font-size:20px;
  font-weight:bold;
  text-align:center;
  margin: 10px auto;
`
export const Text = styled.div`
  color:yellow;
  font-size:20px;
  text-align:center;
  margin: 3px auto;
`