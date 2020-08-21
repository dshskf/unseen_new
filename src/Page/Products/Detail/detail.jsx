import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_product_detail, add_message } from '../../../Redux/product/product-action'
import { pullProductId } from '../../../Redux/product/product-selector'
import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'
import RequestForm from '../Request/request'

const ProductDetail = props => {
    const [data, setData] = useState('')
    const [reqForm, setReqForm] = useState(false)

    const api = 'http://localhost:1234/'

    useEffect(() => {
        const req = async () => {
            const post = await props.getProduct({
                id: props.productId
            })
            setData(post.product)
        }
        req()
    }, [])

    const chatButtonHandler = async () => {
        const dataToSubmit = {
            sender_id: props.user.id,
            receiver_id: data.userId,
            content: "Hai, Im interested with your ads!",
            notification: null
        }
        const req = await props.addMsg({
            form: dataToSubmit,
            token: props.token
        })
        console.log(req)
    }

    return (
        <React.Fragment>
            {
                data ?
                    <div>
                        <p>{data.title}</p>
                        <p>{data.cost}</p>
                        {
                            data.image.map((data, index) => {
                                const image = api + data.replace('\\', '/')
                                return (
                                    <img src={image} key={index} />
                                )
                            })
                        }
                        <input type="submit" value="Chat" onClick={chatButtonHandler} />
                        <input type="submit" value="Request" onClick={() => setReqForm(true)} />
                        {
                            reqForm ?
                                <RequestForm product={data} />
                                :
                                null
                        }
                    </div>
                    :
                    <h1>HEllo</h1>
            }

        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData,
    productId: pullProductId
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: data => dispatch(get_product_detail(data)),
    addMsg: data => dispatch(add_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProductDetail);