import React, { useEffect, useState } from 'react'

import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { get_approval_management, update_approval_status } from '../../../Redux/product/product-action'

import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'


export const Management = props => {
    const [data, setData] = useState('')

    useEffect(() => {
        const req = async () => {
            const get = await props.getApproval({
                action: 'sender_id',
                token: props.token
            })
            console.log(get.data)
            setData(get.data)
        }

        req()
    }, [])


    const updateHandler = async e => {
        const dataToSubmit = {
            request_id: e.currentTarget.id,
            action: 'update',
            on: 'isPaying'
        }

        const post = await props.updateStatus({
            form: dataToSubmit,
            token: props.token
        })
        console.log(post)

    }

    return (
        <React.Fragment>
            {
                data ?
                    data.map((c, index) => {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <p>{c.username}</p>
                                <p>{c.product_name}</p>
                                <p>How many time left from start</p>
                                <p>{c.price}</p>
                                {/* if wait for request
                                <p>waiting...</p>
                                if confirm payment
                                <input type="submit" value="PAY" />
                                if active
                                <p>Active</p> */}
                                <input type="submit" value="PAY" id={c.id} onClick={updateHandler} />
                                <input type="submit" value="Cancel" />
                            </div>
                        )
                    })
                    :
                    null

            }
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getApproval: data => dispatch(get_approval_management(data)),
    updateStatus: data => dispatch(update_approval_status(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Management);