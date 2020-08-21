import styled from "styled-components";
import { color } from "../../../Constants/color";
import { Link } from "react-router-dom";

const image = require("../../../Assets/Image/Home/b2.jpg")

export const Container = styled.div`
  background-image: linear-gradient(
      90deg,
      rgba(67, 67, 67, 0.46),
      rgba(77, 77, 77, 0.12)
    ),
    url(${image});
  background-position: right 10% top 90%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 33rem;
  position: relative;
  margin: 0;
`;

export const Sub = styled.div`
  position: absolute;
  left: 8%;
  top: 25%;
  text-align:left;

  h1 {
    color: ${color.primary};
    font-weight: bold;
    font-size: 2.5rem;
    text-shadow: 0px 0px 15px ${color.primary};
  }

  h3 {
    color: white;
  }

  input {
    margin-right: -0.5rem;
    padding: 1.4rem 1rem;
    width: 40vw;
    outline: none;
    border: none;
  }
`;

export const SearchBox = styled.div`
  height: 3.5rem;
  margin-top: 2rem;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Links = styled(Link)`
  background: ${color.primary};
  color: white;
  padding: 1.5rem;
  text-decoration: none;

  &:hover{
    color:white;
    background: ${color.primary_hover};
  }
`;
