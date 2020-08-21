import styled, { css } from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

export const Products = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Cards = styled.div`
  width: 20rem;
  height: 25rem;
  overflow: hidden;
  background: linear-gradient(rgba(39, 39, 39, 0.62), #262626);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  margin-bottom: 1rem;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px #404040;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  height: 80%;

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
`;

export const Text = styled.p`
  &:nth-child(2) {
    margin: 0;
    margin-top: 1rem;
    color: #b2b2b2;
  }

  &:nth-child(3) {
    font-size: 1.8rem;
    margin: 0;
  }
  &:nth-child(4) {
    color: #ff8000;
  }
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  color: white;
`;

export const InfoItem = styled.div`
  text-align: center;

  p:nth-child(2) {
    color: #ff8000;
  }
`;

const add = css`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddBox = styled.div`
  ${add};
  width: 20rem;
  height: 25rem;
  margin: 0 1rem;
  margin-bottom: 1rem;
  transition: all 0.5s;
  border: 2px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s;

  h1 {
    font-size: 4rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.02);
  }
`;
