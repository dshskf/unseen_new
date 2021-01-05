import styled, { css } from "styled-components";
import { color } from "../../../Constants/color";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  margin-top: 10%;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70%;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.isHeader ? null : "rgba(0,0,0,0.05)")};
  }
`;

const header = css`
  background: #d3ebff;
  color: #5f5f5f;
`;

const reason = css`
  cursor: pointer;
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin: 0;
  color: #5f5f5f;
  margin: 5px 0;
  cursor: cell;
  ${(props) => (props.isHeader ? header : null)};

  ${(props) => (props.isReason ? reason : null)};

  :nth-child(1) {
    width: 5%;
  }

  :nth-child(2) {
    width: 15%;
  }

  :nth-child(3) {
    width: 20%;
  }

  :nth-child(4) {
    width: 10%;
    font-weight: bold;
  }

  :nth-child(5) {
    width: 20%;
  }

  :nth-child(6) {
    width: 15%;
  }

  :nth-child(7) {
    width: 15%;
  }
`;

export const ActionBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  input {
    width: 3rem !important;
    border: none;
    color: white;
    height: 2rem;
    margin: 0 5%;
    border-radius: 5px;
    cursor: pointer;

    :nth-child(1) {
      background: #0093ff;

      &:hover {
        background: white;
        border: 1px solid #0093ff;
        color: #0093ff;
      }
    }
    :nth-child(2) {
      background: rgba(242, 99, 99, 0.92);

      &:hover {
        background: white;
        border: 1px solid rgba(242, 99, 99, 0.92);
        color: rgba(242, 99, 99, 0.92);
      }
    }
  }
`;

const onPayed = css`
  color: white;
  background: #0093ff;
`;

const onActive = css`
  color: white;
  background: #f37d1f;
  cursor: pointer;
`;

export const StatusBox = styled.div`
  background: #d1d1d1;
  height: 2rem;
  width: 70%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) => (props.isPayed ? onPayed : null)};
  ${(props) => (props.isActive ? onActive : null)};

  p {
    margin: 0;
    margin-left: 6px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(8, 8, 8, 0.3);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const ModalContent = styled.div`
  width: 40%;
  min-height: 10rem;
  background: white;
  padding-left: 1rem;
  position: relative;
  color: #272727;
  text-align: left;
  h1 {
    width: 90%;
    border-bottom: 1px solid #d4d4d4;
    margin-bottom: 0;
    padding-bottom: 10px;
  }

  label {
    position: absolute;
    color: gray;
    right: 1rem;
    top: 10px;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

export const RequestDimmer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RequestBox = styled.div`
  width: 50%;
  min-height: 15rem;
  padding-bottom: 5rem;
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
    outline: none;
  }
  label {
    color: ${color.grey_1};
    font-weight: bold;
    width: 95%;
    /* font-size: 12px; */
  }

  textarea {
    height: 2.5rem;
    outline: none;
    border: 1px solid ${color.border};
    border-radius: 4px;
    padding: 4px 2%;
    margin-top: 10px;
    resize: none;
    height: 100px;
    padding: 10px 2%;
    width: 95%;
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
  cursor: pointer;
`;
