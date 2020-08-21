import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { post_request, get_product_detail } from '../../../Redux/product/product-action'
import { pullProductId } from '../../../Redux/product/product-selector'
import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'


const RequestForm = props => {
    const [data, setData] = useState('')
    const [input, setInput] = useState({
        reason: "",
        price: ""//offer price
    })

    const sendRequest = async () => {
        const dataToSubmit = {
            product_id: props.product.id,
            sender_id: props.user.id,
            receiver_id: props.product.userId,
            reason: input.reason,
            offers_price: input.price,
            isApprove: 0,
            isPaying: 0,
            isActive: 0
        }

        const post = await props.postRequestForm({
            form: dataToSubmit,
            token: props.token
        })
        console.log(post)
    }

    const inputHandler = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    return (
        <React.Fragment>
            <input type="text" name="reason" value={input.reason} placeholder="reason" onChange={inputHandler} />
            <input type="text" name="price" value={input.price} placeholder="price" onChange={inputHandler} />
            <input type="submit" value="Send" onClick={sendRequest} />
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    postRequestForm: data => dispatch(post_request(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(RequestForm);