import styled from "styled-components";
import { Row, Col, Progress } from 'antd'
import {color} from '../../../Constants/color'

export const Container = styled.div`
width:100vw;
height:20rem;
    padding:0 7%;
    display: flex;  
    justify-content:center;
    align-items:center;
    margin-top:15rem;
`

export const Left = styled.div`
    width:25%;        
    height:100%;
    border-right:3px solid ${color.primary};
    border-left:3px solid ${color.primary};
    border-radius:20px;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;

    h1{
        font-size:1.5rem;
        color:${color.primary};
        font-weight:bold;
        margin-right:5rem;
    }
`

export const Rows = styled(Row)``
export const Cols = styled(Col)``

export const Right=styled.div`
width:40%;
display:flex;
    flex-direction: column;
    justify-content:center;
    margin-left:10%;

    h1{
        font-size:1.5rem;
    }
`

export const Parameter=styled(Progress)``