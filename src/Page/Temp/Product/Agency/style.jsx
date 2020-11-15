import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;
  width: 100%;
  text-transform: capitalize;
  margin-bottom: 3rem;
`;

export const Product = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Cards = styled.div`
  width: 28rem;
  height: 12rem;
  margin: 14px 1.2rem;
  overflow: hidden;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
  background: white;
  box-shadow: 2px -2px 8px rgba(0,0,0,0.2);

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
  width: 55%;
  margin-left: 1rem;
`;

export const Content = styled.div`
  height: 75%;
  width: 100%;
  margin: 0;

  p:nth-child(1) {
    margin-bottom: 0;
    color: #ff8000;
    font-size: 1.2rem;
    margin-top: 4px;
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
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #2e2e2e;
`;

export const Item = styled.div`
  text-align: center;
  width: 100%;
  color: #ff8000;
`;
