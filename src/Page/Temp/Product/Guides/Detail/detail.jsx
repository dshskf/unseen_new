import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ReactStars from "react-rating-stars-component";
import Sidebar from '../../../../../Components/Sidebar/sidebar'

import { get_tours_guides_detail, post_user_request } from '../../../../../Redux/tours/tours.action'
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
    Description,
    Review,
    Comments,
    CommentsProfile,
    ProfileImage,
    ProfileData,
    Text,
    Modal,
    ModalBox,
    ModalTitle,
    ModalInput,
    ModalButton
} from './style'

const GuidesToursDetail = props => {
    const [data, setData] = useState(null)
    const [comment, setComment] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    const [input, setInput] = useState({
        reason: "",
        price: ""
    })

    const api = 'http://localhost:1234/'

    const inputHandler = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    useEffect(() => {
        const req = async () => {
            const post = await props.get_tours_guides_detail({
                id: props.match.params.toursId
            })
            
            setComment(post.comment)
            setData(post.tours[0])
        }
        req()
    }, [])

    const sendRequest = async () => {
        const dataToSubmit = {
            tours_id: data.id,
            sender_id: props.user.id,
            receiver_id: data.agencyId,
            reason: input.reason,
            offers_price: input.price,
            start_date: data.start_date,
            end_date: data.end_date,
            is_approve: 0,
            is_paying: 0,
            is_active: 0,
            receiver_type: 'A',
            sender_type: 'U'
        }
        console.log(dataToSubmit)

        const post = await props.post_user_request({
            form: dataToSubmit,
            token: props.token
        })

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
                            <Modal isOpen={openModal}>
                                <ModalBox>
                                    <ModalTitle>
                                        <p>Request</p>
                                    </ModalTitle>
                                    <ModalInput>
                                        <input type="text" name='reason' value={input.reason} placeholder="Reason" onChange={inputHandler} />
                                        <input type="number" name='price' value={input.price} placeholder="Your offers" onChange={inputHandler} />
                                    </ModalInput>
                                    <ModalButton>
                                        <input type="submit" value="X" onClick={() => setOpenModal(false)} />
                                        <AiOutlineSend style={{
                                            color: 'white',
                                            background: '#00a7ff',
                                            height: '2rem',
                                            width: '3rem'
                                        }}
                                            onClick={sendRequest}
                                        />
                                    </ModalButton>
                                </ModalBox>
                            </Modal>
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
                                        <ActionItem onClick={() => setOpenModal(true)}>
                                            <FiGitPullRequest />
                                            <p> Request</p>
                                        </ActionItem>
                                    </ProductAction>
                                </Right>
                            </Detail>
                            <Description>
                                <p>{data.description}</p>
                            </Description>
                            {/* <Review>
                                <h1>Ulasan({comment.length})</h1>
                                {
                                    comment.length > 0 ?
                                        comment.map((c, i) => (
                                            <Comments>
                                                <CommentsProfile>
                                                    <ProfileImage>
                                                        <img src={c.image ? api + data.image[0].replace('\\', '/') : getImg('Account', 'guest.png')} />
                                                    </ProfileImage>
                                                    <ProfileData>
                                                        <p>{c.username}</p>
                                                        <ReactStars
                                                            count={5}
                                                            // onChange={ratingChanged}
                                                            value={c.rating ? c.rating : 0}
                                                            edit={false}
                                                            size={24}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                            style={{
                                                                margin: 0,
                                                                marginBottom: '4px'
                                                            }}
                                                        />
                                                    </ProfileData>
                                                </CommentsProfile>
                                                <Text>
                                                    <p>Yeah that's a nice trip bro, hope we weill meet again soon!!! yeahhh....</p>
                                                </Text>
                                            </Comments>
                                        ))
                                        :
                                        null
                                }

                            </Review> */}
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
    get_tours_guides_detail: data => dispatch(get_tours_guides_detail(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    post_user_request: data => dispatch(post_user_request(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GuidesToursDetail);