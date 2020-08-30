import styled from "styled-components";
import { color } from "../../../Constants/color";

export const Container = styled.div`
  margin-top: 4rem;
  width: 100vw;
  height: 50rem;
  padding: 5rem 0;
  position: relative;
`;
export const Title = styled.div`
  width: 100vw;
  text-align: center;
`;
export const Sub = styled.div`
  display: flex;
  height: 70%;
  width: 100vw;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
`;

export const Download = styled.div`
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -20%;
  left: 50%;

  img:nth-child(1) {
    height: 6rem;
    width: 6rem;
  }

  img:nth-child(2) {
    width: 6rem;
    height: 4rem;
  }
`;

export const Platform = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 10%;
`;

export const Instruction = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  h1 {
    margin: 0;
  }

  p {
    font-size: 1.4rem;
    margin: 0;
  }
`;

export const ListHeader = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border: 3px solid ${color.primary};
  text-align: center;
  border-radius: 50%;
  margin-right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const PlatformImage = styled(Carousel)`
//   text-align: center;
//   width: 20rem;
//   height: 30rem;  
//   background: white;
//   overflow: hidden;

//   img {
//     width: 20rem;
//     height: 30rem;
//   }
// `;
