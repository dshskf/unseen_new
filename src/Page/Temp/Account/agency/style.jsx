import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Left = styled.div`
  width: 65%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  padding-top: 2rem;
  height: 100%;
  position: relative;
  min-width: 25rem;
  overflow-y: auto;

  h1 {
    color: #f37d1f;
    font-size: 3rem;
  }
`;

export const Title = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 400;
  }

  img {
    width: 4rem;
    height: 4rem;
  }
`;

export const Forms = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;

  input {
    margin: ${(props) => (props.page === "register" ? "12px 0" : "1rem 0")};
    height: ${(props) => (props.page === "register" ? "2.5rem" : "3rem")};
    padding-left: 1rem;
    border: 1px solid #d6d3d3;
    outline: none;
    border-radius: 5px;
    width: 19rem;
  }

  input[type="text"]:focus {
    border: 1px solid #f37d1f;
  }

  input[type="password"]:focus {
    border: 1px solid #f37d1f;
  }

  input[type="submit"] {
    height: ${(props) => (props.page === "register" ? "2.5rem" : "3rem")};
    background: linear-gradient(90deg, #f37d1f, #ff3b00);
    color: white;
    font-size: 1.4rem;
    margin-top: 2rem;
    cursor: pointer;
    width: 20rem;

    &:hover {
      background: white;
      color: #f37d1f;
      border: 1px solid #f37d1f;
    }
  }
  p {
    color: gray;
  }

  a {
    color: #f37d1f;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorBox = styled.div`
  width: 100%;  
  text-align: center;

  p{
    margin:0;
  }
`;

export const Nav = styled.div`
  position: absolute;
  bottom: 1rem;
  color: #f37d1f;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1) translateY(-8px);
  }
`;
