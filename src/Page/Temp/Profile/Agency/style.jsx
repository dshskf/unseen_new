import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;  
  height:60%;
  min-height:30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;  
  overflow: hidden;
`;

export const Form = styled.div`
  width: 70%;
  min-width:30rem;
  border: 1px solid #e6e6e6;
  box-shadow: 0 0 10px #e6e6e6;
  height:100%;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 5rem;
  padding-top: 6rem;
  border-radius: 6px;
`;

export const FormInput = styled.div`
width:100%;
display: flex;
justify-content:center;
align-items:center;
overflow: hidden;
`

const inputDivDefault = css`
width:50%;
display: flex;
flex-direction: column;
align-items:center;
`

export const Left = styled.div`
${inputDivDefault}
border-right: 1px solid rgba(0,0,0,0.2);
`

export const Right = styled.div`
${inputDivDefault}
`

export const ImageBox = styled.div`
  position: absolute;
  left:-4rem;
  top: -4rem;
  cursor:pointer;

  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    border: 4px solid #ff8900;
  }
`;

const inputBoxDefault = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 4rem;
  margin: 10px 0;
`;

const inputDefault = css`
  height: 2.5rem;
  border: 1px solid #e0e0e0;
  outline: none;
  color: #4e4e4e;
  padding-left: 10px;
`;

export const InputBox = styled.div`
  ${inputBoxDefault}

  label {
    font-size: 0.8rem;
    margin-bottom: 4px;
    color: #3c3c3c;
  }

  input {
    ${inputDefault};
  }

  select {
    ${inputDefault};
    max-height: 3rem;
  }
`;

export const SubmitBox = styled.div`
  ${inputBoxDefault};
  margin-top: 2rem;
  width:40%;

  input {
    ${inputDefault};
    background: #ff8900;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background: #ff7600;
    }
  }
`;
