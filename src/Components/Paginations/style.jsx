import styled from "styled-components";
import { color } from "../../Constants/color";

export const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

export const Index = styled.div`
  width: 2rem;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? color.grey_1 : color.grey_3)};
  transform: ${(props) => (props.isActive ? "scale(1.1)" : "")};
  transition: 0.2s all;

  &:hover {
    transform: scale(1.1);
    color:${color.grey_2};
  }
`;
