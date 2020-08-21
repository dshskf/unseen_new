import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { sign_in, check_token } from '../../../Redux/auth/auth-action'
import { pullResponse, pullToken, pullLoginStatus } from '../../../Redux/auth/auth-selector'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

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

class Login extends Component {
    state = {
        username: null,
        password: null,
        isFetch: false
    }

    inputHandler = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    submitForm = async () => {
        const { name, password } = this.state
        const dataToSubmit = {
            username: name,
            password: password
        }
        await this.props.signIn({
            data: dataToSubmit,
            history: this.props.history
        });
    }

    render() {
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
                        <Inputs name="name" placeholder="name" onChange={this.inputHandler} />
                        <Inputs name="password" placeholder="password" onChange={this.inputHandler} />
                        <Buttons type="primary" value="Submit" onClick={this.submitForm}>Sign-In</Buttons>
                    </InputField>
                </Right>
            </Container>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse,
    token: pullToken,
    isLogin: pullLoginStatus
})

const mapDispatchToProps = (dispatch) => ({
    signIn: (data) => dispatch(sign_in(data)),
    checkToken: (data) => dispatch(check_token(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Login);