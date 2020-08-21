import styled, { css } from "styled-components";
import { Form, Input, Button, DatePicker } from "antd";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Forms = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 100vw;
  height: 80vh;
`;

const defaultPosition = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  height: 100%;

`

export const Left = styled.div`
${defaultPosition}
`;

export const Right = styled.div`
 ${defaultPosition}
`;

const input_default = css`
  width: 70%;
  margin: 1rem 0;
`;

export const Inputs = styled(Input)`
  ${input_default}
`;
export const TextArea = styled(Input.TextArea)`
  ${input_default}
`;

export const Buttons = styled(Button)`
  ${input_default}
`;


export const DatePickers = styled(DatePicker.RangePicker)`
${input_default}
`