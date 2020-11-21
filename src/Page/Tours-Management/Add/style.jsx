import styled, { css } from "styled-components";
import { color } from "../../../Constants/color";

export const Container = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 5rem;
  justify-content: center;
  position: relative;
`;

export const Header = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2e2e2e;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const Left = styled.div`
  width: 40%;
  height: 100%;
`;

export const Right = styled.div`
  width: 40%;
  height: 100%;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;  

  input[type="submit"] {
    width: 95%;
    height: 2.5rem;
    border: none;
    background: #ff994f;
    color: white;
    border-radius: 3px;
    margin: 10px 0;

    :nth-child(2) {
      background: white;
      border: 1px solid red;
      color: red;

      &:hover {
        background: white;
        border: 1px solid red;
        color: red;
        cursor: pointer;
      }
    }

    &:hover {
      background: white;
      border: 1px solid #ff994f;
      color: #ff994f;
      cursor: pointer;
    }
  }
`;

export const Item = styled.div`
  margin: ${(props) => (props.isSelect ? "0" : "1rem 0")};
  width: ${(props) => (props.isSelect ? "100%" : null)};

  p {
    margin-bottom: 8px;
    color: #383838;
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

export const DestinationBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const DestinationItem = styled.div`
  height: 2rem;
  padding-right: ${(props) => (props.isAdd ? 0 : "8px")};
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: white;
  border-radius: 4px;
  border: 1px solid ${color.primary};

  label {
    background: ${color.primary};
    height: 100%;
    width: 2rem;
    display: flex;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  p {
    margin: 0;
    margin-left: 8px;
    color: ${color.primary};
    text-transform: capitalize;
    font-weight: normal;
  }
`;

export const Description = styled.textarea`
  resize: none;
  width: 90%;
  height: 15rem;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 1rem;
`;

export const Dropdown = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 15rem;
  outline: none;
  padding: 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

export const Box = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
  box-sizing: border-box;
`;

export const Sub = styled.div`
  width: 7rem;
  height: 7rem;
  margin: 6px 0;
  margin-right: 8px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  img {
    position: absolute;
    width: 6.5rem;
    height: 6.5rem;
  }
  span {
    position: absolute;
    height: 2rem;
    background: #ff994f;
    cursor: pointer;
    bottom: -2rem;
    width: 102%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }
`;

const onHover = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.42);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-size: 1.5rem;
    color: white;
    border: 2px solid white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Image = styled.div`
  width: 5rem;
  height: 5rem;
  border: 2px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-size: 2.5rem;
    color: #d9d9d9;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.42);
  display: ${(props) => (props.isShow ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-size: 1.5rem;
    color: white;
    border: 2px solid white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
