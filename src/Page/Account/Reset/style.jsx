import styled from "styled-components";
import { color } from "../../../Constants/color";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.primary};
`;

export const Main = styled.div`
  width: 30%;
  min-width: 35rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 10px ${color.border};
  border-radius: 8px;
`;

export const LogoBox = styled.div`
  height: 8rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;

  img {
    width: 3rem;
  }
`;

export const InputRow = styled.div`
  width: 90%;
  height: 5rem;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    color: ${color.grey_2};
    font-size: 14px;
    font-weight: bold;
  }

  input {
    height: 2.5rem;
    border: 1px solid ${color.border};
    padding: 0 10px;
    outline-color: ${color.primary};
    border-radius: 4px;
  }
`;

export const SubmitButton = styled.button`
background-color:white;
  border: 1px solid ${color.primary};
  color: ${color.primary};
  width: 70%;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 3rem;

  :hover {
    background-color: ${color.primary};
    color: white;
  }
`;
