import React from 'react'
import {
    Smoke,
    Content,
    Head,
    Body,
    ButtonBox
} from './style'

export const Modal = (props) => {    
    return (
        <Smoke isOpen={props.isOpen}>
            <Content>
                <Head>
                    <p onClick={props.handleClose}>X</p>
                </Head>
                <Body>
                    {props.element()}
                </Body>
                <ButtonBox>
                    <button onClick={props.action}>Add Destination</button>
                </ButtonBox>
            </Content>
        </Smoke>
    )
}

export default Modal