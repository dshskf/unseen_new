import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ReactStars from "react-rating-stars-component";
import Sidebar from '../../../../../Components/Sidebar/sidebar'

import { get_tours_agency_detail, post_user_booking } from '../../../../../Redux/tours/tours.action'
import { chats_send_message } from '../../../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../../../Redux/auth/auth.selector'
import { getImg } from '../../../../../Constants/get-img'

import { FiGitPullRequest } from 'react-icons/fi'
import { BsChatDots } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'



import { Body, Sub, Header } from '../../../style.route'

import {
    Container,
    Title,
    Detail,
    Left,
    Right,
    ProductTitle,
    ProductGuide,
    GuideImages,
    GuideData,
    ProductPrice,
    ProductAction,
    ActionItem,
    Description
} from './style'
import { storage } from '../../../../../Constants/request';

const AgencyToursDetail = props => {
    const [data, setData] = useState(null)
    const [comment, setComment] = useState(null)

    useEffect(() => {
        const req = async () => {
            const post = await props.get_tours_agency_detail({
                id: props.match.params.toursId
            })
            
            setComment(post.comment)
            setData(post.tours[0])
        }
        req()
    }, [])

    const sendBooking = async () => {
        const post = await props.post_user_booking({
            tours_id: data.id,
            sender_id: props.user.id,
            receiver_id: data.agencyId,
            is_payed: false,
            is_active: false,
            receiver_type: 'A'
        })

        if (!post.err) {
            await props.chats_send_message({
                sender_id: props.user.id,
                sender_type: 'U',
                receiver_id: data.agencyId,
                receiver_type: 'A',
                content: "Hey! you got new orders",
                tours_id: data.id,
                tours_type: 'A'
            })
        }
    }

    return (
        <Body>
            <Sidebar page="home" />

            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt="" />
                    <h1>UNSEEN</h1>
                </Header>
                {
                    data ?
                        <Container>
                            < Title >
                                <h1>{data.title}</h1>
                            </Title >
                            <Detail>
                                <Left>
                                    {/* <img src={api + data.image[0].replace('\\', '/')} alt="" /> */}
                                    <img src={data.image[0]} alt="" />
                                </Left>
                                <Right>
                                    <ProductTitle>
                                        <h1>{data.title}</h1>
                                        <p>{data.destination}</p>
                                    </ProductTitle>
                                    <ProductGuide>
                                        <GuideImages>
                                            <img src={data.agency_images} alt="" />
                                        </GuideImages>
                                        <GuideData>
                                            <h2>Guided By:</h2>
                                            <p>{data.username}</p>
                                            <p>{data.start_date.split('T')[0] + "-" + data.end_date.split('T')[0]}</p>
                                        </GuideData>
                                    </ProductGuide>
                                    <ProductPrice>
                                        <h2>${data.cost}</h2>
                                    </ProductPrice>
                                    <ProductAction>
                                        <ActionItem>
                                            <BsChatDots />
                                            <p> Chats</p>
                                        </ActionItem>
                                        <ActionItem onClick={sendBooking}>
                                            <FiGitPullRequest />
                                            <p> Books</p>
                                        </ActionItem>
                                    </ProductAction>
                                </Right>
                            </Detail>
                            <Description>
                                <p>{data.description}</p>
                            </Description>
                        </Container >
                        :
                        null
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
    get_tours_agency_detail: data => dispatch(get_tours_agency_detail(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    post_user_booking: data => dispatch(post_user_booking(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AgencyToursDetail);