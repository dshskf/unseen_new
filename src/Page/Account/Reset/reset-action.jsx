import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { check_email, update_password } from '../../../Redux/auth/auth.action'

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
        console.log(check.data)

        if (!check.err) {
            this.setState({ isTokenValid: true })
        }
    }

    inputHandler = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    submitForm = async e => {
        const update = await this.props.update_password({ userId: this.state.user.id, password: this.state.password })
        console.log(update)
        if (!update.err) {
            this.props.history.push('/login')
        }
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

})

const mapDispatchToProps = (dispatch) => ({
    check_email: (data) => dispatch(check_email(data)),
    update_password: (data) => dispatch(update_password(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ResetAction);