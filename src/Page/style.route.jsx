import styled from "styled-components";

export const Body = styled.div`
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const Sub = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-bottom: 2rem;
`;

export const HeaderBox = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2e2e2e;
  cursor:pointer;

  img {
    width: 2rem;
    height: 2rem;
  }
`;
