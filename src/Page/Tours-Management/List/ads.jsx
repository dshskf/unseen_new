import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ReactStars from "react-rating-stars-component";

import { get_dashboard } from '../../../Redux/tours/tours.action'
import { API } from '../../../Constants/link'

import Sidebar from '../../../Components/Sidebar/sidebar'
import { storage } from '../../../Constants/request'
import { renameImg } from '../../../Constants/get-img'

import { Body, Sub } from '../../style.route'

import {
    Container,
    Products,
    Cards,
    Content,
    Info,
    InfoItem,
    Text,
    AddBox,
    AddSub
} from './style'

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
                <Container>
                    <Products>
                        {
                            data ?
                                data.map(data => {
                                    const image = data.image.length > 0 && renameImg(data.image[0])
                                    return (
                                        <Cards key={data.id} id={data.id} onClick={() => props.history.push(`/ads/edit/${data.id}`)}>
                                            <Content>
                                                <img src={image} alt="" />
                                                <Text>{data.destination}</Text>
                                                <Text>{data.title}</Text>
                                                <Text>Find your best <b>guide</b> for real</Text>
                                            </Content>

                                            <Info>
                                                <InfoItem>
                                                    <p>Rating</p>
                                                    <ReactStars
                                                        count={5}
                                                        // onChange={ratingChanged}
                                                        value={data.rating ? data.rating : 0}
                                                        edit={false}
                                                        size={24}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                    />
                                                </InfoItem>
                                                <InfoItem>
                                                    <p>Cost</p>
                                                    <p>${data.cost}/h</p>
                                                </InfoItem>
                                            </Info>
                                        </Cards>
                                    )
                                })
                                :
                                null
                        }
                        <AddBox onClick={() => props.history.push('/ads/add/0')}>
                            <h1>+</h1>
                        </AddBox>
                    </Products>
                </Container>
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({    
})

const mapDispatchToProps = (dispatch) => ({
    get_dashboard: data => dispatch(get_dashboard(data)),    
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AdsList);