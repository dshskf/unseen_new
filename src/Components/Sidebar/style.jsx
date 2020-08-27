import styled, { css } from "styled-components";

export const icon = {
  color: "white",
  fontSize: "1.5rem",
  marginTop: "4px",
  cursor: "pointer",
};

export const open_icon = {
  color: "white",
  fontSize: "1.5rem",
  marginRight: "10px",
  cursor: "pointer",
};

export const nav_icon = {
  color: "color:#575757",
  fontSize: "1.5rem",
  marginRight: "10px",
  cursor: "pointer",
  margin: "0 1rem",
};

const onOpen = {
  container: css`
    width: 20vw;
    position: relative;
    min-width:15rem;
  `,
  top: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  item: css`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    border-bottom: 1px solid #5a5959;
  `,
  logout: css`
    position: absolute;
    left: 0;
    bottom: 0;
    border: none;
    color: #f37d1f;
  `,
};

export const Container = styled.div`
  width: 3rem;
  height: 100%;
  overflow: hidden;
  background: #2e2e2e;
  transition: all 0.5s;
  min-width:3rem;
  ${(props) => (props.isOpen ? onOpen.container : null)}
`;

export const Top = styled.div`
  width: 100%;
  background: #f37d1f;
  height: 2rem;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  align-items: center;

  ${(props) => (props.isOpen ? onOpen.top : null)}

  p {
    margin-left: 1rem;
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.isOpen ? "5vh" : "20vh")};
`;

export const Item = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: ${(props) => (props.isActive ? "#F37D1F" : "#575757")};
  transition: all 0.2s;

  ${(props) => (props.isOpen ? onOpen.item : null)}
  ${(props) => (props.isLogout ? onOpen.logout : null)}

  &:hover {
    color: ${(props) => (props.isOpen ? "white" : "#F37D1F")};
    background: ${(props) => (props.isOpen ? "#F37D1F" : "")};
    cursor: pointer;
  }
`;


export const User = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f37d1f;
  margin-top: 1.5rem;

  h1 {
    margin: 0;
    margin-top: 1rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: white;
  }

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }
`;
