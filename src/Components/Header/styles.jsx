import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { color } from "../../Constants/color";
import { Avatar, Dropdown, Menu } from "antd";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  align-items: center;
  height: 4rem;
  margin: 0;

  h1 {
    font-weight: bold;
    color: ${color.primary};
  }
`;

export const Sub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const registerButton = css`
  width: 7rem;
  background: ${color.primary};
  border-radius: 9px;
  padding: 5px 10px;

  &:hover {
    background: white;
    border: 1px solid ${color.primary};
  }
`;

export const Item = styled.div`
  width: 5rem;
  text-align: center;
  transition: 0.2s all;
  ${(props) => (props.isRegister ? registerButton : null)}
  overflow: hidden;
`;

export const Links = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: ${(props) =>
    props.isRegister
      ? props.isHover
        ? color.primary
        : "white"
      : color.primary};
  transition: 0.2s all;
`;

export const User = styled.div`
  width: 14vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Avatars = styled(Avatar)`
  border: 3px solid ${color.primary};
`;

export const Dropdowns = styled(Dropdown)`
  margin-top: 1rem;
  margin-right: 0.5rem;
`;
export const Menus = styled(Menu)``;

export const UserItem = styled.p`
  color:${props => props.isLogout ? "white" : null};
  background:${props => props.isLogout ? "red" : null};
  padding:10px;
`

export const UserText = styled.p`
  font-size: 1.5;
  font-weight: bold;
  color: gray;
  cursor: pointer !important;

  &:hover{
    color:${color.primary};
  }
`;
