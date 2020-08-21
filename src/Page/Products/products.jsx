import React, { useEffect, useState } from 'react'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_product, set_product_id } from '../../Redux/product/product-action'
import { pullToken, pullUserData } from '../../Redux/auth/auth-selector'
import { pullProduct } from '../../Redux/product/product-selector'


// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import {
    Cards,
    ImageBox,
    TitleBox,
    Container
} from './style'

const Products = props => {
    const [data, setData] = useState('')
    const api = 'http://localhost:1234/'

    useEffect(() => {
        const req = async () => {
            const post = await props.getProduct()
            setData(post.product)
        }

        req()
    }, [])

    const navigateToDetail = async e => {
        await props.setProductId(e.currentTarget.id)
        props.history.push('/products/detail')
    }


    return (
        <Container>
            {
                data ?
                    data.map((data, index) => {
                        const image = api + data.image[0].replace('\\', '/')
                        return (
                            <Cards key={data.id} id={data.id} onClick={navigateToDetail}>
                                <ImageBox>
                                    <img src={image} />
                                </ImageBox>
                                <TitleBox>
                                    <h1>{data.title}</h1>
                                    <p>${data.cost}</p>
                                </TitleBox>
                            </Cards>
                        )
                    })
                    :
                    null
            }
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: () => dispatch(get_product()),
    setProductId: (data) => dispatch(set_product_id(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Products);