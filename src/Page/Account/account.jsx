import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import Register from './Register/register'
import Login from './Login/login'
import Reset from './Reset/reset'

import { pullLoginStatus } from '../../Redux/auth/auth-selector'

const Accounts = props => {
    return props.isLogin ?
        (
            <React.Fragment>
                {
                    props.history.push('/')
                }
            </React.Fragment>
        )
        :
        props.page === 'register' ?
            (<Register />)
            :
            props.page === 'login' ?
                (<Login />)
                :
                (<Reset />)
}


const mapStateToProps = createStructuredSelector({
    isLogin: pullLoginStatus
})

const mapDispatchToProps = (dispatch) => ({
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Accounts);