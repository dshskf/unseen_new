import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ReactStars from "react-rating-stars-component";
import Sidebar from '../../../../Components/Sidebar/sidebar'

import { get_tours_agency_detail, post_user_booking } from '../../../../Redux/tours/tours.action'
import { chats_send_message } from '../../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { getImg, renameImg } from '../../../../Constants/get-img'

import { FiGitPullRequest } from 'react-icons/fi'
import { BsChatDots } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { useAlert } from "react-alert";
import { storage } from '../../../../Constants/request'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from 'react-elastic-carousel'

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
    Description,
    TitleBox
} from './style'

const AgencyToursDetail = props => {
    const [data, setData] = useState(null)
    const [comment, setComment] = useState(null)
    const alert = useAlert()

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
        if (storage) {
            if (storage.type_code !== 'U') {
                alert.error("User Only!")
                return
            }
        } else {
            props.history.push('/user/auth')
            return 0
        }

        const post = await props.post_user_booking({
            tours_id: data.id,
            sender_id: storage.id,
            receiver_id: data.agencyId,
            is_payed: false,
            is_active: false,
            receiver_type: 'A'
        })

        if (!post.err) {
            await props.chats_send_message({
                receiver_id: data.agencyId,
                receiver_type: 'A',
                content: "Hey! you got new orders",
                tours_id: data.id,
                tours_type: 'A'
            })
            alert.success(`Succesfully Booked!`)
        }
        else {
            alert.error(post.err)
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
                                <TitleBox>
                                    <h1>{data.title}</h1>
                                </TitleBox>
                            </Title >
                            <Detail>
                                <Left>
                                    <Carousel
                                        showEmptySlots={true}
                                        style={{ color: 'red' }}
                                    >
                                        {
                                            data.image.map((image, i) => (
                                                <div key={i}>
                                                    <img src={renameImg(image)} alt="" />
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                </Left>
                                <Right>
                                    <ProductTitle>
                                        <h1>{data.title}</h1>
                                        <p>{data.destination}</p>
                                    </ProductTitle>
                                    <ProductGuide>
                                        <GuideImages>
                                            <img src={renameImg(data.agency_images)} alt="" />
                                        </GuideImages>
                                        <GuideData>
                                            <h2>Guided By:</h2>
                                            <p>{data.username}</p>
                                            <p>{data.start_date.split('T')[0] + " ~ " + data.end_date.split('T')[0]}</p>
                                        </GuideData>
                                    </ProductGuide>
                                    <ProductPrice>
                                        <h2>${data.cost}</h2>
                                    </ProductPrice>
                                    <ProductAction>
                                        <ActionItem>
                                            <BsChatDots size={20} />
                                            <p>Send Message</p>
                                        </ActionItem>
                                        <ActionItem onClick={sendBooking}>
                                            <FiGitPullRequest size={20} />
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