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

  ${(props) => (props.isHeader ? header : null)};

  ${(props) => (props.isReason ? reason : null)};

  :nth-child(1) {
    width: 5%;
  }

  :nth-child(2) {
    width: 15%;
  }

  :nth-child(3) {
    width: 10%;
    font-weight: bold;
  }

  :nth-child(4) {
    width: 20%;
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

export const ReasonButton = styled.p`
  color: ${color.grey_3};
  background: ${color.border};
  border-radius: 20px;
  cursor: pointer;
  height: 1.5rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 8px 1.5rem;
  border-radius: 6px;
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

export const ReasonImage = styled.div`
  position: absolute;
  top: -3.5rem;

  img {
    width: 7rem;
    height: 7rem;
    border: 4px solid white;
    border-radius: 50%;
  }
`;

export const Reason = styled.div`
  width: 16rem;  
  margin-top: 1rem;  
`;

export const ReasonItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom:1px solid ${color.primary};
  padding:8px 0;
  text-align:left;

  p {
    font-weight: bold;
    color: ${color.grey_1};
    text-transform: capitalize;
    height: 1.5rem;
    margin: 8px 0;

    :nth-child(1) {
      width:30%;
    }

    :nth-child(2) {
      width:15%;
    }

    :nth-child(3) {
      width:55%;
      color:${color.grey_2};
      font-weight:400;
    }
  }
`;

export const ReasonDescription = styled.div`
width:100%;
display: flex;
flex-wrap:wrap;
margin-top:2rem;
color:${color.grey_2};
`

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
