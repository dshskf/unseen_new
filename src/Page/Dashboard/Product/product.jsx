import React, { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_product_dashboard, set_id, delete_product } from '../../../Redux/product/product-action'
import { pullToken } from '../../../Redux/auth/auth-selector'
import { pullDashboardProduct } from '../../../Redux/product/product-selector'

// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import {
    Cards,
    ImageBox,
    TitleBox,
    Actions
} from './style'

const Product = props => {
    const [data, setData] = useState('')
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
    }, [])

    const onEdit = e => {
        props.setId(e.currentTarget.id)
        props.history.push('/dashboard/edit')
    }

    const onDelete = async e => {
        e.persist();
        const dataToSubmit = {
            id: e.currentTarget.id,
            token: props.token
        }

        const req = await props.deleteProduct(dataToSubmit)
        console.log(req)
        const filterData = data.filter(x => x.id.toString() !== dataToSubmit.id)
        setData(filterData)
    }

    return (
        <React.Fragment>
            {
                data ?
                    data.map((data, index) => {
                        const image = api + data.image[0].replace('\\', '/')
                        return (
                            <Cards key={index}>
                                <ImageBox>
                                    <img src={image} />
                                </ImageBox>
                                <TitleBox>
                                    <h1>{data.title}</h1>
                                    <p>${data.cost}</p>
                                </TitleBox>
                                <Actions>
                                    <p id={data.id} onClick={(e) => onEdit(e)}>Edit</p>
                                    {/* <DeleteOutlined id={data.id} onClick={onDelete} /> */}
                                </Actions>
                            </Cards>
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
    products: pullDashboardProduct
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: data => dispatch(get_product_dashboard(data)),
    deleteProduct: data => dispatch(delete_product(data)),
    setId: data => dispatch(set_id(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Product);