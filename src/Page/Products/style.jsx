import styled from "styled-components";
import { color } from '../../Constants/color'


export const Container = styled.div`
width:100vw;
overflow-x:hidden;
display:flex;
flex-wrap: wrap;

`

export const Cards = styled.div`
  width: 20vw;
  height: 20rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow:hidden;
  margin:1rem;
`;

export const ImageBox = styled.div`
  height: 50%;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TitleBox = styled.div`
    position:relative;
    margin-top:8px;

    h1{
        margin:0;
    }
    p{

    }
`

export const Actions=styled.div`
    width:100%;
    height:4rem;
    display: flex;
    justify-content:space-around;
    align-items:center;  
    font-size: 1.5rem;
    border-top:1px solid rgba(0,0,0,0.1);    
    
    &:nth-child(3) {        
        color: red !important;
    }

`
