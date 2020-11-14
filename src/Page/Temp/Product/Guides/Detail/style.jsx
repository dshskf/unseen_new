import styled from "styled-components";
import { color } from '../../../../../Constants/color'
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100vw;
  overflow-x: hidden;
  padding-bottom:10rem;

  *{
    box-sizing: border-box;
  }
`;

export const Headers = styled.div`
  height: 20rem;
  position: relative;
`;

export const Background = styled.div`
  height: 60%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Logo = styled.div`
  position: absolute;
  background: ${color.primary};
  top: 0;
  right: 10%;
  padding: 10px 30px;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Profile = styled.div`
  width: 100%;
  height: 40%;
  position: relative;
  display: flex;
`;
export const AvatarBox = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
`;

export const Avatar = styled.div`
  width: 80%;
  height: 100%;
  position: absolute;
  top: -3.5rem;
  left: 5%;
  display: flex;
  align-items: center;
  z-index: 1;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 8px solid #ffffff;
    /*    box-shadow:1px -8px 10px #6f6f6f; */
  }
`;

export const NameBox = styled.div`
  margin-top: -1.5rem;
  margin-left: 1rem;

  & :nth-child(1) {
    color: ${color.primary};
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  & :nth-child(2) {
    margin: 0;
    color: ${color.border};
  }
`;

export const ActionBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 5%;
`;

export const ActionButton = styled.div`
  width: 7rem;
  height: 2.5rem;
  color: ${color.primary};
  border: none;
  background: white;
  border: 1px solid ${color.primary};
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;

  * {
    background: none;
    border: none;
    color: white;
  }
  &:nth-child(1) button {
    color: ${color.primary};
  }

  &:nth-child(2) {
    background: blue;
    color: white;
    border: 1px solid blue;
  }
`;

export const Details = styled.div`
  width: 100%;
  margin-top: 2rem;
  min-height: 20rem;
  padding: 2rem 4%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background:#f7f7f7;
`;
export const Description = styled.div`
  width: 45%;
  min-width: 20rem;
  text-align: justify;
  color: ${color.border};
`;

export const Splitter = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;

  div {
    width: 1px;
    height: 100%;
    background: ${color.border};
  }
`;

export const Information = styled.div`
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InformationItem = styled.div`
  width: 45%;

  & :nth-child(1) {
    border-bottom: 1px solid silver;
    padding-bottom: 4px;
    width: 100%;
    color: ${color.primary};
    margin-top: 0;
    font-weight: bold;
  }

  & :nth-child(2) {
    color: ${color.border};
  }
`;

export const Photo = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

export const PhotoAction = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoBox = styled.div`
  width: 90%;
  overflow: hidden;
  display: flex;
`;

export const PhotoCard = styled.div`
  width: 35%;
  height: 100%;
  margin: 0 1rem;

  img {
    width: 100%;
    min-width: 15rem;
    max-width: 20rem;
    height: 100%;
  }
`;

export const ReviewBox = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: space-between;
  padding: 0 4%;
  margin-top: 4rem;
`;

export const SkillBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Skill = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: white;
  border: 1px solid ${color.primary};
  margin: 10px;
  margin-top: 0;
`;

export const CommentsBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;  
  background:${color.primary};
`;

export const Comments = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const C_Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid gray;
  color:white;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  p{
    font-size:1.4rem;
  }
`;

export const Message = styled.div`
  margin-top: 1rem;
  color: white;
`;
