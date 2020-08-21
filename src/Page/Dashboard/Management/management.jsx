import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { get_approval_management, update_approval_status, add_message } from '../../../Redux/product/product-action'

import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'


import {
    Container
} from './style'

const Management = props => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('approval')

    useEffect(() => {
        const req = async () => {
            const getData = await props.getApproval({
                action: 'receiver_id',
                token: props.token
            })
            console.log(getData.data)
            setData(getData.data)
        }

        req()
    }, [])

    const post_checker = (action, e) => {
        const checkPage = page === 'approval' ?
            'isApprove'
            :
            page === "payment" ? "isPaying" : "isActive"

        const dataToSubmit = {
            request_id: e.currentTarget.id,
            action: action,
            on: checkPage
        }

        return dataToSubmit
    }

    const updateHandler = async e => {

        const dataToSubmit = post_checker('update', e)

        const post = await props.updateStatus({
            form: dataToSubmit,
            token: props.token
        })
        const { id, name } = e.currentTarget

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[name].sender_id,
            content: `Cool! ${props.user.username} has approved your request, now you can go to payment!`,
            notification: data[name].product_id
        }

        const send = await props.addMsg({
            form: msgData,
            token: props.token
        })

        console.log(post)
        console.log(send)
    }

    const deleteHandler = async e => {
        const { id, name } = e.currentTarget
        const dataToSubmit = post_checker('delete', e)

        const post = await props.updateStatus({
            form: dataToSubmit,
            token: props.token
        })

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[name].sender_id,
            content: `${props.user.username} not approving your request on ${data[name].product_name}`,
            notification: null
        }

        const send = await props.addMsg({
            form: msgData,
            token: props.token
        })

        console.log(post)
        console.log(send)

    }

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h1 onClick={() => setPage('approval')}>Approval</h1>
                <h1 onClick={() => setPage('payment')} > Payment</h1>
                <h1 onClick={() => setPage('active')}> Active</h1>
            </div>
            <div style={{ marginTop: '10rem' }}>
                {
                    data ?
                        data.map((c, i) => {//c->content,i->index
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-around' }} key={c.sender_id}>
                                    <p>{c.username}</p>
                                    <p>{c.phone}</p>
                                    <p>{c.email}</p>
                                    <p>{c.product_name}</p>
                                    <p>{c.reason}</p>
                                    <p>{c.offers_price}</p>
                                    <input type="submit" id={c.id} name={i} value="Yes" onClick={updateHandler} />
                                    <input type="submit" id={c.id} name={i} value="No" onClick={deleteHandler} />
                                    <p>{c.isApprove === 0 ? 'Waiting...' : 'Approved'}</p>
                                </div>
                            )
                        })
                        :
                        null
                }

            </div>


        </Container>
    )
}


const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getApproval: data => dispatch(get_approval_management(data)),
    updateStatus: data => dispatch(update_approval_status(data)),
    addMsg: data => dispatch(add_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Management);