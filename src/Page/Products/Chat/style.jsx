import styled from "styled-components";

export const Container = styled.div`
width:100vw;
height:100vh;
overflow:hidden;
display:flex;
`

export const Friends = styled.div`
width:20%;
height:100vh;
border-right:1px solid rgba(0,0,0,0.1);
`
export const MessageBox = styled.div`
width:80%;
height:100vh;
`

export const MessageField = styled.div`
background:rgba(10,10,10,0.1);
overflow-y: auto;
height:90%;
width:100%;

`

export const Text = styled.p`
margin-left:${props => props.isUser ? '80%' : 0} ;
`

export const MessageInput = styled.div`
border-top:1px solid black;
height:10%;
width:100%;
display:flex;
align-items:center;
`

