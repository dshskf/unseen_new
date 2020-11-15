import styled, { css } from "styled-components";

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
