import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { get_product_dashboard, set_id } from '../../../Redux/product/product-action'
import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'

import Guides from './Guides/guide'
import Sidebar from '../../../Components/Sidebar/sidebar'
import Edit from './Edit/edit'
import Add from './Add/add'

import { Body, Sub } from '../style.route'

const AdsList = props => {
    const [data, setData] = useState('')
    const [pages, setPages] = useState('ads')

    const api = 'http://localhost:1234/'

    useEffect(() => {
        const req = async () => {
            await axios.get(`${api}product/dashboard`, {
                headers:
                {
                    "Authorization": `Bearer ${props.token}`
                }
            })
                .then(res => {
                    setData(res.data.product)
                })
        }
        req()
    }, [pages])

    const navHandler = async (e, p) => {
        if (e) {
            await props.setId(e.currentTarget.id)
        }

        let update_page = pages === "ads" ? "edit" : "ads"
        if (p === 'add') {
            update_page = 'add'
        }

        setPages(update_page)
    }

    return (
        <Body>
            <Sidebar page="ads" />
            <Sub>
                {
                    pages === "ads" ?
                        <Guides product={data} nav={navHandler} navAdd={() => setPages('add')} />
                        :
                        pages === "edit" ?
                            <Edit nav={navHandler} />
                            :
                            <Add nav={navHandler} />


                }
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: data => dispatch(get_product_dashboard(data)),
    setId: data => dispatch(set_id(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AdsList);