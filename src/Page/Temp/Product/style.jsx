import styled from "styled-components";

export const Body = styled.div`
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const Header = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2e2e2e;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const Search = styled.div`
  margin-top: 3rem;
  width: 100%;
  text-align: center;

  input {
    height: 3rem;
    margin: 0;
    border: 1px solid #d9d9d9;
    outline: none;
  }

  input[type="text"] {
    width: 50%;
    padding-left: 1rem;
  }

  input[type="submit"] {
    background: #f37d1f;
    color: white;
    margin-left: -2rem;
    height: 3.25rem;
    width: 7%;
    border: none;
    cursor: pointer;
  }
`;
