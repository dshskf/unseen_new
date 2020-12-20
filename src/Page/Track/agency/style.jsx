import styled from "styled-components";
import { color } from "../../../Constants/color";

export const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const MapBox = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
`;

export const FocusBox = styled.div`
  width: 16rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  cursor: pointer;

  p {
    color: white;
    margin-left: 10px;
  }
`;
