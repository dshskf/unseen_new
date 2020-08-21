import styled from "styled-components";
import { color } from "../../../Constants/color";
import { Link } from "react-router-dom";
import { Avatar, Carousel } from "antd";

export const Container = styled.div`
  margin-top: 3rem;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Switch = styled.div`
  width: 30vw;
  border: 2px solid ${color.primary};
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
`;

export const SwitchItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.isActive ? color.primary : undefined)};
`;

export const Links = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "white" : color.primary)};
`;

export const Sub = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  width: 45vw;
  height: 15rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(128, 128, 128, 0.33);
  box-shadow: 2px -2px 10px rgba(128, 128, 128, 0.42);
  min-width:40rem;
`;

export const ImageContainer = styled.div`
  width: 30%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const DataContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 1rem;
`;

export const Personal = styled.div`
  position: relative;
  height: 25%;
  display: flex;
  align-items: center;
`;

export const PersonalData = styled.div`
  width: 75%;
  height: 100%;
  text-align: left;

  * {
    margin: 0;
  }

  p:nth-child(1) {
    margin: 0;
    font-size: 1.2rem;
  }
`;

export const PersonalPrice = styled.div`
  width: 20%;
  text-align: center;
  font-size: 1.2rem;
  color: ${color.primary};
  font-weight: bold;
`;

export const Review = styled(Carousel)`
  height: 7rem;
  width: 100%;  
  overflow: hidden;
  background:silver;
  text-align: center;
`;

export const ReviewList = styled.div`
  margin-top: 2rem;
`;

export const Avatars = styled(Avatar)`
  width:3rem;
  height:3rem;
  margin-right: 10%;
`

export const ReviewData = styled.div`
  display: flex;
  align-items: center;
  width: 70%;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 3px solid #ed4d6e;
    margin-right: 1rem;
  }
`;

export const Perfomance = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  justify-content: space-around;
  align-items: center;
`;

export const PerfomanceItem = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  p {
    margin: 0;
  }
`;

export const Title = styled.div`
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
`;
