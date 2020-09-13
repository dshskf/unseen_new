import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { check_email, update_password } from '../../../Redux/auth/auth-action'
import { pullResponse } from '../../../Redux/auth/auth-selector'

class ResetAction extends Component {
    state = {
        password: '',
        re_password: '',
        isTokenValid: false,
        user: null
    }

    async componentDidMount() {
        const { token } = this.props.match.params
        const check = await this.props.checkEmail({ token: token })
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
        const update = await this.props.updatePassword({ userId: this.state.user.id, password: this.state.password })
        console.log(update)

    }


    render() {
        return (
            <React.Fragment>
                {
                    this.state.isTokenValid ?
                        <div>
                            <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.inputHandler} />
                            <input type="text" name="re_password" placeholder="confirm-password" value={this.state.re_password} onChange={this.inputHandler} />
                            <input type="submit" value="Save Password" onClick={this.submitForm} />
                        </div>
                        :
                        <h1>Token expired...</h1>
                }

            </React.Fragment>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse
})

const mapDispatchToProps = (dispatch) => ({
    checkEmail: (data) => dispatch(check_email(data)),
    updatePassword: (data) => dispatch(update_password(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetAction)