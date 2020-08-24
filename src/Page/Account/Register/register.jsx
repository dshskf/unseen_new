import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { sign_up } from '../../../Redux/auth/auth-action'
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
} from './style'

class Register extends Component {
    state = {
        username: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        isFetch: 0,
        err: null
    }



    inputHandler = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    submitForm = async () => {
        const { name, email, password, phone } = this.state
        const dataToSubmit = {
            username: name,
            email: email,
            phone: phone,
            password: password
        }

        this.setState({ isFetch: 1 })
        const req = await this.props.signUp(dataToSubmit)        

        if (req.err) {
            
            this.setState({
                err: req.err
            })
        } else {
            this.setState({ isFetch: 2 })
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <Container>
                {/* <Left>
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
                        <Inputs name="email" placeholder="email" onChange={this.inputHandler} />
                        <Inputs name="phone" placeholder="phone" onChange={this.inputHandler} />
                        <Inputs name="password" placeholder="password" onChange={this.inputHandler} />
                        <Buttons type="primary" value="Submit" onClick={this.submitForm}>Sign-up</Buttons>
                        {
                            this.state.isFetch === 0 ?
                                null
                                :
                                this.state.isFetch === 1 ?
                                    <Buttons type="primary" loading />
                                    :
                                    <p>DONEE</p>
                        }
                        {
                            this.state.err ?
                                <p>{this.state.err}</p>
                                :
                                null
                        }
                    </InputField>
                </Right> */}
            </Container>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse
})

const mapDispatchToProps = (dispatch) => ({
    signUp: data => dispatch(sign_up(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Register);