import styled from "styled-components";
import { Carousel,Input,Button } from "antd";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Left = styled.div`
  width: 60%;
  height: 100vh;
  position: relative;
`;

export const Right = styled.div`
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Carousels = styled(Carousel)`
  width: 100%;
  height: 100vh;

  img {
    height: 100vh;
    width: 100%;
  }
`;

export const InputField = styled.div`
  width: 70%;
  text-align: center;
  padding: 1rem;
  display:flex;
  flex-direction: column;
  justify-content:center;
`;

export const Inputs=styled(Input)`
    margin:10px 0;
`

export const Buttons= styled(Button)``