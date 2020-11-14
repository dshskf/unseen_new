import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { get_dashboard } from '../../../Redux/tours/tours.action'
import { pullToken, pullUserData } from '../../../Redux/auth/auth.selector'
import { API } from '../../../Constants/link'

import Guides from './Guides/guide'
import Sidebar from '../../../Components/Sidebar/sidebar'
import { storage } from '../../../Constants/request'

import { Body, Sub } from '../style.route'

const AdsList = props => {
    const [data, setData] = useState('')
    const [pages, setPages] = useState('ads')

    useEffect(() => {
        const req = async () => {
            await axios.get(`${API}tours/dashboard`, {
                headers: {
                    "Authorization": `Bearer ${storage.token}`
                }
            })
                .then(res => {
                    setData(res.data.tours)
                })
        }
        req()
    }, [])


    return (
        <Body>
            <Sidebar page="ads" />
            <Sub>
                <Guides product={data} />
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    get_dashboard: data => dispatch(get_dashboard(data)),
    // setId: data => dispatch(set_id(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AdsList);