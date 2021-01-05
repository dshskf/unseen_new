import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { check_email, update_password } from '../../../Redux/auth/auth.action'
import { Container, InputRow, Main, LogoBox, SubmitButton } from './style';
import { default as Loader } from "react-spinners/PropagateLoader";
import { withAlert } from 'react-alert'

class ResetAction extends Component {
    state = {
        password: '',
        re_password: '',
        isTokenValid: false,
        user: null
    }

    async componentDidMount() {
        const { token } = this.props.match.params
        const check = await this.props.check_email({ token: token })
        this.setState({ user: check.data })

        if (!check.err) {
            this.setState({ isTokenValid: true })
        }
    }

    inputHandler = e => {
        const { name, value } = e.target        
        this.setState({ [name]: value })
    }

    submitForm = async e => {
        if(this.state.password!==this.state.re_password){
            this.props.alert.error('Password not match!')
            return false
        }

        const update = await this.props.update_password({ userId: this.state.user.id, password: this.state.password })
        if (!update.err) {
            this.props.history.push('/login')
        }
    }


    render() {
        return (
            <Container>
                {
                    this.state.isTokenValid ?
                        <Main>
                            <LogoBox>
                                <img src={require('../../../Assets/Image/Account/logo.png')} />
                                <h1>UNSEEN</h1>
                            </LogoBox>
                            <InputRow>
                                <label>New Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.inputHandler} />
                            </InputRow>
                            <InputRow>
                                <label>Re-enter Pasword</label>
                                <input type="password" name="re_password" value={this.state.re_password} onChange={this.inputHandler} />
                            </InputRow>

                            <SubmitButton onClick={this.submitForm}>UPDATE</SubmitButton>
                        </Main>
                        :
                        <Main>
                            <LogoBox>
                                <img src={require('../../../Assets/Image/Account/logo.png')} />
                                <h1>UNSEEN</h1>
                            </LogoBox>
                            <p style={{ color: 'grey', fontSize: '18px', marginTop: '2rem', marginBottom: '5rem' }}>Request a new link to reset your password....</p>
                            <Loader color={'orange'} loading={true} css={''} size={20} />
                        </Main>
                }
            </Container>
        )
    }
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    check_email: (data) => dispatch(check_email(data)),
    update_password: (data) => dispatch(update_password(data))
})

export default compose(
    withAlert(),
    withRouter,    
    connect(mapStateToProps, mapDispatchToProps)
)(ResetAction);