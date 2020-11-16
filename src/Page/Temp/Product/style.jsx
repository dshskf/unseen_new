import styled, { css } from "styled-components";
import { color } from "../../../Constants/color";

export const Body = styled.div`
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 32rem;
  overflow-x: hidden;
  box-sizing: border-box;
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

export const Search = styled.div`
  margin-top: 3rem;
  width: 100%;
  text-align: center;

  input {
    height: 3rem;
    margin: 0;
    border: 1px solid #d9d9d9;
    outline: none;
  }

  input[type="text"] {
    width: 50%;
    padding-left: 1rem;

    &:focus {
      border: 1px solid ${color.primary};
    }
  }

  input[type="submit"] {
    background: ${color.primary_hover};
    color: white;
    margin-left: -2rem;
    height: 3.22rem;
    width: 7%;
    border: none;
    cursor: pointer;
    min-width: 4rem;

    &:hover {
      background: ${color.primary};
    }
  }
`;

export const Switch = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const OptionBox = styled.div`
  width: 30%;
  height: 3rem;
  display: flex;
  border: 1px solid ${color.primary};
  overflow: hidden;
  border-radius: 4px;
`;

const selected = css`
  background-color: ${color.primary};
  color: white;
`;

export const Option = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.primary};
  cursor: pointer;

  ${(props) => props.selected && selected}
`;
