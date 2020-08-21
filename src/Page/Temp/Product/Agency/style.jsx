import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Product = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Cards = styled.div`
  width: 35rem;
  height: 15rem;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  border: 1px solid #d8d8d8;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const CardImage = styled.div`
  width: 40%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const CardContent = styled.div`
  margin-left: 1rem;
`;

export const Content = styled.div`
  height: 70%;

  p:nth-child(1) {
    margin-bottom: 0;
    color: #ff8000;
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  p:nth-child(2) {
    margin: 0;
    color: gray;
  }

  p:nth-child(3) {
    margin-top: 1rem;
  }
`;

export const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #2e2e2e;
`;

export const Item = styled.div`
  text-align: center;
  width: 50%;
  color: #ff8000;
`;
