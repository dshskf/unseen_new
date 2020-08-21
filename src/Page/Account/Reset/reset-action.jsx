import React, { Component } from 'react'
import { Button } from 'antd';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { check_email } from '../../../Redux/auth/auth-action'
import { pullResponse } from '../../../Redux/auth/auth-selector'

class ResetAction extends Component {
    state = {
        isTokenValid: false
    }

    async componentDidMount() {
        const { token } = this.props.match.params
        await this.props.checkEmail({ token: token })

        if (!this.props.response.err) {
            this.setState({ isTokenValid: true })
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isTokenValid ?
                        <h1>Gotcha</h1>
                        :
                        <Button type="primary" loading />
                }

            </React.Fragment>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse
})

const mapDispatchToProps = (dispatch) => ({
    checkEmail: (data) => dispatch(check_email(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetAction)