import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { send_email } from '../../../Redux/auth/auth-action'
import { pullResponse } from '../../../Redux/auth/auth-selector'

import { getImg } from '../../../Constants/get-img'
import {
    Container,
    Left,
    Right,
    Carousels,
    InputField,
    Inputs,
    Buttons
} from '../Register/style'


const Reset = props => {
    const [email, setEmail] = useState('')
    const inputHandler = e => setEmail(e.target.value)

    const formSubmit = () => {
        if (email.length > 0) {
            props.sendEmail({ email: email })
        }
        return
    }


    return (
        <Container>
            <Left>
                <Carousels autoplay>
                    <div>
                        <img src={getImg("Product", "b1.jpg")} />
                    </div>
                    <div>
                        <img src={getImg("Product", "b2.jpg")} />
                    </div>
                </Carousels>

            </Left>
            <Right>
                <InputField>
                    <Inputs type="text" placeholder="Email..." value={email} onChange={inputHandler} />
                    <Buttons type="primary" value="Submit" onClick={formSubmit}>Send Email</Buttons>
                </InputField>
            </Right>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse
})

const mapDispatchToProps = (dispatch) => ({
    sendEmail: (data) => dispatch(send_email(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Reset)