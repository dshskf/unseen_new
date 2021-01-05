import styled, { css } from "styled-components";
import { color } from "../../../../Constants/color";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 10rem;

  * {
    box-sizing: border-box;
  }
`;

export const RequestDimmer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RequestBox = styled.div`
  width: 50%;  
  min-height:15rem;
  padding-bottom:5rem;
  background: white;
  border-radius: 4px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

export const RequestPanel = styled.div`
  width: 100%;
  height: 3rem;  
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 1rem;
    border: 1px solid ${color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${color.primary};
    cursor: pointer;

    :hover {
      background: ${color.primary};
      color: white;
    }
  }
`;

export const RequestInput = styled.div`
  width: 90%;
  margin: 1rem 0;
  
  * {
    width: 95%;
  }

  label {
    color: ${color.grey_1};
    font-weight: bold;
    /* font-size: 12px; */    
  }

  input,
  textarea {
    height: 2.5rem;
    outline: none;
    border: 1px solid ${color.border};
    border-radius: 4px;
    padding: 4px 2%;
    margin-top: 10px;
  }

  textarea {
    resize: none;
    height: 100px;
    padding: 10px 2%;
  }
`;

export const RequestSubmit = styled.div`
  width: 100%;
  height: 3rem;
  position: absolute;
  background: ${color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  bottom: 0;
  cursor:pointer;

`;

export const Item = styled.div`
  margin: ${(props) => (props.isSelect ? "0" : "1rem 0")};
  width: ${(props) => (props.isSelect ? "100%" : null)};

  p {
    margin-bottom: 8px;
    color: ${color.grey_1};
    font-weight: bold;
  }
  input {
    width: 90%;
    height: 2rem;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const Headers = styled.div`
  height: 30rem;
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
  top: -5.5rem;
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

export const ProfileList = styled.div`
  margin-left: 1rem;
  height: 100%;
`;

export const ProfileItem = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-left: 8px;
  }

  :nth-child(1) {
    color: ${color.primary};
    margin-top: 2.5rem;
    font-size: 2.2rem;
    text-transform: capitalize;
    margin-bottom: 10px;
    p {
      font-weight: bold;
      margin: 0;
    }
  }

  :nth-child(2) {
    margin: 0;
    font-size: 1.2rem;
    color: ${color.grey_1};
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
  height: 3rem;
  color: ${color.primary};
  border: none;
  background: white;
  border: 1px solid ${color.primary};
  margin-top: 1rem;
  margin-left: 2rem;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  p {
    margin-left: 6px;
  }

  &:nth-child(1) {
    color: ${color.primary};

    :hover {
      color: white;
      background: ${color.primary};
      transform: scale(1.1);
    }
  }

  &:nth-child(2) {
    background: ${color.button_1};
    color: white;
    border: 1px solid ${color.button_1};

    :hover {
      background: ${color.button_hover_1};
      transform: scale(1.1);
    }
  }
`;

export const Details = styled.div`
  width: 100%;
  margin-top: 2rem;
  min-height: 25rem;
  padding: 2rem 4%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f7f7f7;
`;
export const Description = styled.div`
  width: 45%;
  min-width: 20rem;
  text-align: justify;
  color: ${color.grey_2};
`;

export const Splitter = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;

  div {
    width: 1px;
    height: 100%;
    background: ${color.grey_3};
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
    color: ${color.grey_2};
  }
`;

export const Photo = styled.div`
  width: 100%;
  height: 18rem;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

const defaultAction = css`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoAction = styled.div`
  ${defaultAction};

  * {
    font-size: 24px;
    color: ${color.grey_2};
  }
`;

export const CommentAction = styled.div`
  ${defaultAction};

  * {
    font-size: 24px;
    color: white;
  }
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
  height: 25rem;
  display: flex;
  justify-content: space-between;
  padding: 0 4%;
  margin-top: 4rem;
`;

export const SkillBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Skill = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 8px;
  background: white;
  border: 1px solid ${color.primary};
  margin: 10px;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
  cursor: pointer;

  :hover {
    background: ${color.primary};
    color: white;
    transform: scale(1.1);
  }
`;

export const CommentsBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${color.primary};
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
  color: white;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  p {
    font-size: 1.4rem;
  }
`;

export const Message = styled.div`
  margin-top: 1rem;
  color: white;
`;
