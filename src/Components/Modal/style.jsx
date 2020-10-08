import styled from "styled-components";
import { color } from "../../Constants/color";

export const Smoke = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Content = styled.div`
  width: 20%;
  min-width: 25rem;
  background: white;
  border-radius: 8px;
  overflow-x: hidden;
  box-shadow: 0 0 10px gray;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Head = styled.div`
  width: 100%;
  height: 3rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: ${color.primary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  p {
    margin-right: 1rem;
    background: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: ${color.primary};
    text-align: center;
  }
`;

export const Body = styled.div`
  width: 90%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonBox = styled.div`
  margin: 1rem 0;
  width: 90%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 50%;
    height: 2rem;
    border: none;
    background: ${color.primary};
    color: white;
    border-radius: 4px;
  }
`;
