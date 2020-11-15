import styled from "styled-components";

export const Container = styled.select`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  line-height: 1;
  border: 0;
  border-radius: 5px;
  height: 2.5rem;
  background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png") no-repeat right #f2f6ff;
  -webkit-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-position-x: 95%;
  outline: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:disabled {
    background: #dddddd;
  }
`;
