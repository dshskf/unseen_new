import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { post_edit_profile } from '../../../Redux/auth/auth-action'
import { pullResponse, pullToken, pullLoginStatus } from '../../../Redux/auth/auth-selector'
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


class EditProfile extends Component {
    state = {
        username: undefined,
        email: undefined,
        phone: undefined,
        isFetch: false,
        err: null,
        userData: {
            id: "",
            username: "",
            email: "",
            phone: ""
        },
    }

    async componentWillMount() {
        if (!this.props.isReady && this.props.isLogin) {
            await axios.get("http://localhost:1234/user/edit", {
                headers:
                {
                    "Authorization": `Bearer ${this.props.token}`
                }
            })
                .then(res => {
                    const { data } = res.data
                    this.setState({
                        userData: {
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            phone: data.phone
                        }
                    })
                })
        }
    }



    inputHandler = e => {
        const { name, value } = e.target
        this.setState({
            userData: { ...this.state.userData, [name]: value }
        })
    }

    submitForm = async () => {
        const { username, email, phone } = this.state.userData
        const dataUser = {
            username: username,
            email: email,
            phone: phone,
        }
        const dataToSubmit = {
            user: dataUser,
            token: this.props.token
        }
        this.props.postEdit(dataToSubmit)
        if (!this.props.response.err) {
            window.location.reload();
        }
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
                    {
                        this.props.isReady ?
                            <h1>Wait...</h1>
                            :
                            this.props.isLogin ?
                                this.state.userData.id ?
                                    <InputField>
                                        <Inputs type="text" name="username" placeholder="username" value={this.state.userData.username} onChange={this.inputHandler} />
                                        <Inputs type="email" name="email" placeholder="email" value={this.state.userData.email} onChange={this.inputHandler} />
                                        <Inputs type="tel" name="phone" placeholder="phone" value={this.state.userData.phone} onChange={this.inputHandler} />
                                        <Buttons type="primary" value="Submit" onClick={this.submitForm}>Update</Buttons>
                                    </InputField>
                                    :
                                    <h1>User data...</h1>
                                :
                                this.props.history.push('/login')
                    }
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
    postEdit: data => dispatch(post_edit_profile(data)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditProfile);