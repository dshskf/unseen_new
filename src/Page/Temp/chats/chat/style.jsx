import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
`;

export const Contacts = styled.div`
  width: 25%;
  height: 100vh;
  overflow: hidden;
  background: #2e3746;
`;

export const User = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background: #3c495c;
    border: none;
    outline: none;
    height: 2rem;
    border-radius: 5px;
    width: 80%;
    padding-left: 1rem;
    color: white;

    &::placeholder {
      color: #a6a5af;
    }
  }
`;

export const Friend = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
  overflow-y: auto;
  margin-top: 1rem;
`;

export const UserTitle = styled.div`
  padding: 0 1rem;

  img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const FriendTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: white;
  height: 4rem;
  font-size: 1.1rem;
  background: ${(props) => (props.isActive ? "#384355" : "")};

  img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  &:hover {
    background: #384355;
    cursor: pointer;
  }

  img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    margin-right: 10px;
  }

  p {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Chat = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatTitle = styled.div`
  height: 3rem;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  color: #464646;
  position: relative;
  overflow: hidden;
  font-size: 1.5rem;

  span {
    position: absolute;
    background: #2e3746;
    width: 5rem;
    height: 5rem;
    transform: rotate(45deg);
    right: 0;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 3px solid #faed26;
    margin-right: 1rem;
  }
`;

export const Box = styled.div`
  height: 87%;
  width: 100%;
  padding: 8px 1rem;
  background: #e5e5e5;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const calculateLength = (word) => {
  let width = word.length * 1.5;
  let height = 2.5;
  width = width < 7 ? 7 : width;

  if (width > 55) {
    const temp = Math.round(width / 55);
    height += temp - 1;
    width = 55;
  }

  return {
    h: height,
    w: width,
  };
};

const defaultMsg = css`
  display: flex;
  align-items: center;
  position: relative;
  margin: 1.5rem 0;
  width: 100%;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    z-index: 1;
  }
`;

export const BoxRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const LeftText = styled.div`
  ${defaultMsg};
  max-width: 50%;
`;

export const RightText = styled.div`
  ${defaultMsg};
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;  
  max-width: 50%;

  span {
    left: 5%;
  }
`;

const rightTxt = css`
  margin-right: 10px;
  color: #2e3746;
  background: white;
`;

export const Text = styled.div`
  background: #2e3746;
  border-radius: 20px;
  display: flex;
  flex-direction:column;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 10px;
  align-items: center;
  padding:0 10px;
  color: white;
  position: relative;
  min-width:3rem;  
  word-break:break-all;
  max-width:100%;    
  ${(props) => (props.isRight ? rightTxt : null)};

  span {
    position: absolute;
    font-size: 0.7rem;
    bottom: -1.2rem;
    left: ${(props) => (props.isRight ? "1rem" : null)};
    right: ${(props) => (props.isRight ? null : "1rem")};

    color: gray;
  }
`;

export const InputBox = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  background: #2e3746;
  cursor: pointer;

  input[type="text"] {
    width: 94%;
    height: 100%;
    padding-left: 1rem;
    border: none;
    background: white;
    outline: none;
    margin-right: 10px;
  }
`;
