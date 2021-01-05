import styled from "styled-components";
import { color } from "../../../../Constants/color";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  text-transform: capitalize;
`;

export const Title = styled.div`
  margin-top: 2rem;
  width: 90%;
  height: 3rem;  
  margin-bottom: 3rem;      
  overflow:hidden;  
`;

export const TitleBox=styled.div`
  width:30%;
  min-width:20rem;
  transform:skewX(-45deg) translateX(-2rem);
  padding-left:2.5rem;
  background:${color.primary};
  color:white;

  h1 {
    transform:skewX(45deg);
    text-transform: capitalize;
    margin: 0;
  }
`

export const Detail = styled.div`
  width: 90%;
  display: flex;
  overflow: hidden;
`;

export const Left = styled.div`
  width: 35%;
  min-width: 40rem;
  margin-right: 2rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.div`
  h1 {
    margin: 0;
    font-weight: 400;
  }
  p {
    color: gray;
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

export const ProductGuide = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const GuideImages = styled.div`
  width: 6rem;
  height: 6rem;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const GuideData = styled.div`
  h2 {
    margin: 0;
    font-size: 1.4rem;
  }

  p {
    font-weight: 100;
    font-size: 2.5rem;
    margin-top: 2px;
    margin-bottom: 0;
    color: ${color.primary};

    :nth-child(3) {
      font-size: 0.9rem;
      font-weight: 300;
    }
  }
`;

export const ProductPrice = styled.div`
  h2 {
    font-weight: 300;
    margin-top: 2rem;
  }
`;

export const ProductAction = styled.div`
  display: flex;
`;
export const ActionItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4rem;
  margin: 0 1rem;
  margin-left: 0;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 1rem;

  :nth-child(1) {
    background: ${color.button_1};
    color: white;

    :hover {
      background-color: ${color.button_hover_1};
    }
  }

  :nth-child(2) {
    border: 1px solid ${color.primary};
    color: ${color.primary};
    margin-left: 8px;

    :hover {
      background-color: ${color.primary};
      color: white;
    }
  }

  p {
    margin-left: 8px;
  }
`;

export const Description = styled.div`
  width: 90%;
  overflow: hidden;
  color: #313131;
  min-height: 8rem;
  margin-top: 2rem;

  p {
    width: 100%;
    min-height: 10rem;
    background: rgba(200, 200, 200, 0.1);
    padding: 1rem;
  }
`;

export const Review = styled.div`
  width: 90%;
  min-height: 10rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  border-top: 1px solid silver;
  margin-bottom: 4rem;

  h1 {
    color: #414141;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 10rem;
  border: 1px solid #dedede;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const CommentsProfile = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-left: 1rem;
  background: #f5f5f5;
`;

export const ProfileImage = styled.div`
  height: 3rem;
  width: 3rem;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const ProfileData = styled.div`
  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

export const Text = styled.div`
  padding: 0 1rem;
  margin-bottom: 1.5rem;
`;

export const Modal = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(8, 8, 8, 0.3);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const ModalBox = styled.div`
  width: 40%;
  height: 15rem;
  background: white;
  padding-left: 1rem;
  position: relative;
  color: #272727;
  text-align: left;
`;

export const ModalTitle = styled.div``;

export const ModalInput = styled.div`
  input {
    border: 1px solid silver;
    outline: none;
  }
`;

export const ModalButton = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 2rem;
    width: 3rem;
    border: none;
    color: white;
    background: red;
    font-size: 1.5rem;
    margin: 0;
    margin-right: 1rem;
  }
`;
