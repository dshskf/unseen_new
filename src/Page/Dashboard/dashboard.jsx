import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import AddProduct from './AddProduct/add'
import EditProduct from './EditProduct/edit'
import Product from './Product/product'
import Management from './Management/management'

import { pullLoginStatus } from '../../Redux/auth/auth-selector'

const Dashboard = props => {
    return props.isLogin ?
        props.page === 'product' ?
            (<Product />)
            :
            props.page === 'add' ?
                (<AddProduct />)
                :
                props.page === 'edit' ?
                    (<EditProduct />)
                    :
                    (<Management />)
        :
        (
            <React.Fragment>
                {
                    props.history.push('/login')
                }
            </React.Fragment>
        )
}


const mapStateToProps = createStructuredSelector({
    isLogin: pullLoginStatus
})

const mapDispatchToProps = (dispatch) => ({
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);