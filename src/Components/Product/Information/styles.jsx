import styled from "styled-components";
import { getImg } from "../../../Constants/get-img";
import { Avatar, Rate, Button } from "antd";

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`;

export const ImgBox = styled.div`
  width: 100vw;
  height: 15rem;
  background: linear-gradient(rgba(18, 18, 18, 0.3), rgba(18, 18, 18, 0.3)),
    url(${getImg("Product", "b1.jpg")});
  background-position: right 90% top 200%;
  background-size: cover;
  background-attachment: fixed;
`;

export const DataBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 33rem;
  top: -7rem;
  left: 4rem;
`;

export const DataDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 0;
  }
`;

export const Avatars = styled(Avatar)`
  width: 15rem;
  height: 15rem;
  border: 10px solid white;
`;

export const RatingBox = styled.div`
  position: absolute;
  left: 40rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: gray;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
`;

export const Rates = styled(Rate)``;

export const ButtonBox = styled.div`
position: absolute;
right:5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled(Button)`
    width:12rem;  
    height:3rem;
    margin: 5px 0;
`;
