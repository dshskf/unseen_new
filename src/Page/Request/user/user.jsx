import React, { useEffect, useRef, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import io from 'socket.io-client'
import ReactStars from "react-rating-stars-component";

import Sidebar from '../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../Constants/get-img'
import { send_comment_requests } from '../../../Redux/tours/tours.action'
import { get_request, update_request } from '../../../Redux/management/management.action'
import { chats_send_message } from '../../../Redux/features/features.action'

import { storage } from '../../../Constants/request'
import { API } from '../../../Constants/link'
import Pagination from '../../../Components/Paginations/pagination'
import { default as ModalComponent } from '../../../Components/ModalBox/modal'

import { FaMoneyCheck, FaMapMarkerAlt, FaGrinStars } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { useAlert } from "react-alert";


import {
    Container,
    Table,
    Row,
    Content,
    ActionBox,
    StatusBox,
    Modal,
    ModalContent,
    ReasonButton,
    ReasonImage,
    Reason,
    ReasonItem,
    ReasonDescription,
    RequestDimmer,
    RequestBox,
    RequestInput,
    RequestPanel,
    RequestSubmit
} from './style'
import { BsThreeDots } from 'react-icons/bs'

const AgencyRequestDashboard = props => {
    const header = ['No.', 'Username', 'Offers', 'Start Date', 'Description', 'Confirmation', 'Status']
    const [requestList, setRequestList] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [reviewForm, setReviewForm] = useState({
        isOpen: false,
        rating: 0,
        description: ''
    })

    const tempRequest = useRef()
    const socketIo = useRef()
    const alert = useAlert()

    useEffect(() => {
        let socket = io(API)
        socket.emit('join_room', {
            room_id: `${storage.id}-${storage.type_code}`
        })

        socket.on('new_request', res => {
            tempRequest.current = tempRequest.current.map(b => {
                if (res.request_id === b.id) {
                    if (res.is_delete) {
                        alert.error(b.guides_name + " has reject your requests!")
                        return null
                    } else {
                        if (!b.is_approve) {
                            alert.show(b.guides_name + " has approved your requests!")
                            b.is_approve = true
                        } else if (!b.is_active) {
                            alert.success(b.guides_name + " has activate your requests!")
                            b.is_active = true
                        }
                    }
                }
                return b
            }).filter(res => res !== null)

            setRequestList(tempRequest.current)


        })

        socketIo.current = socket

        return () => {
            if (socketIo.current) {
                socketIo.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        fetch()
    }, [currentPage])

    const fetch = async () => {
        const get = await props.get_request({
            page: currentPage,
            is_mobile: false,
            type: storage.type_code
        })
        console.log(get.data)

        tempRequest.current = get.data
        convertPagetoArr(get.total_page)
        setRequestList(get.data)
    }

    const convertPagetoArr = (total) => {
        const temp = []
        for (let i = 1; i <= total; i++) {
            if (i === currentPage) {
                temp.push({ index: i, isActive: true })
                continue
            }
            temp.push({ index: i, isActive: false })
        }

        setPage(temp)
    }

    const updateHandler = async (id, index) => {
        let new_data = requestList[index]
        new_data.is_payed = true

        const dataToSubmit = {
            request_id: id,
            action: 'update'
        }

        const post = await props.update_request({ ...dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully payed ${new_data.guides_name}!`)
        } else {
            new_data.is_payed = false
            alert.error(post.err)
            return
        }

        const message = new_data.is_active ?
            `${storage.username} has payed your requests!`
            :
            `${storage.username} has payed your requests!`

        const msgData = {
            receiver_id: new_data.guides_id,
            receiver_type: 'G',
            content: message
        }

        await props.chats_send_message({ ...msgData })
        socketIo.current.emit('update_request', {
            opposite_room: `${new_data.receiver_id}-G`,
            request_id: new_data.id,
        })

        let update = requestList.map(d => d)
        update[index] = new_data
        setRequestList(update)
    }

    const deleteHandler = async (id, index) => {
        let new_data = requestList[index]
        let filtered_data = requestList.filter(request => request.id !== id)

        const dataToSubmit = {
            request_id: id,
            action: 'delete'
        }
        const post = await props.update_request({ ...dataToSubmit })
        if (!post.err) {
            alert.success(`Sucessfully reject ${new_data.guides_name}!`)
            const msgData = {
                receiver_id: new_data.guides_id,
                receiver_type: 'G',
                content: `${storage.username} has canceled your requests!`,
                tours_id: new_data.id,
                tours_type: 'G'
            }
            await props.chats_send_message({ ...msgData })
            socketIo.current.emit('update_request', {
                opposite_room: `${new_data.receiver_id}-G`,
                request_id: new_data.id,
                is_delete: true,
            })

        } else {
            alert.error(post.err)
        }
        setRequestList(filtered_data)
    }

    const styles = {
        link: { textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }
    }


    const handleChangePage = (index) => {
        if (index > page.length || index < 1) {
            return 0
        }
        setCurrentPage(index)
    }

    const handleModalReason = (request) => {
        setModalData(request)
        setOpenModal(!openModal)
    }

    const reasonComponent = () => (
        <React.Fragment>
            <ReasonImage>
                <img alt="" src="https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78" />
            </ReasonImage>
            <Reason>
                <ReasonItem>
                    <p>Name</p>
                    <p>:</p>
                    <p>{modalData.guides_name}</p>
                </ReasonItem>
                <ReasonItem>
                    <p>Email</p>
                    <p>:</p>
                    <p>{modalData.guides_email}</p>
                </ReasonItem>
                <ReasonDescription>
                    {modalData.description}
                </ReasonDescription>
            </Reason>
        </React.Fragment>
    )

    const handleReviewModal = (request) => {
        if (request) {
            setSelectedRequest({
                request_id: request.id,
                receiver_id: request.guides_id
            })
        }
        setReviewForm({
            isOpen: !reviewForm.isOpen,
            rating: 0,
            description: ''
        })
    }

    const handleRatingInput = (val) => {
        setReviewForm({
            ...reviewForm,
            rating: val
        })
    }

    const handleInput = (e) => {
        setReviewForm({
            ...reviewForm,
            description: e.target.value
        })
    }

    const sendComment = async () => {
        const post = await props.send_comment_requests({
            sender_id: storage.id,
            request_id: selectedRequest.request_id,
            guides_id: selectedRequest.receiver_id,
            rating: reviewForm.rating,
            description: reviewForm.description
        })
        if (!post.err) {
            handleReviewModal()
            alert.success("Review has been sent!")
        } else {
            alert.error(post.err)
        }
    }

    return (
        <Body>
            <Sidebar page="request" />
            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
                    <Table>
                        <Row isHeader={true}>
                            {
                                header.map((data, index) => (
                                    <Content key={index} isHeader={true}>
                                        <p>{data}</p>
                                    </Content>
                                ))
                            }
                        </Row>
                        {
                            reviewForm.isOpen &&
                            <RequestDimmer>
                                <RequestBox>
                                    <RequestPanel>
                                        <p onClick={handleReviewModal}>X</p>
                                    </RequestPanel>
                                    <RequestInput>
                                        <label>Rating</label>
                                        <ReactStars
                                            count={5}
                                            onChange={handleRatingInput}
                                            value={reviewForm.rating}
                                            edit={true}
                                            size={40}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </RequestInput>
                                    <RequestInput>
                                        <label>Comments</label>
                                        <textarea
                                            placeholder="Type something here..."
                                            name="description"
                                            onChange={handleInput}
                                            value={reviewForm.description}
                                        ></textarea>
                                    </RequestInput>
                                    <RequestSubmit onClick={sendComment}>Send Comment</RequestSubmit>
                                </RequestBox>
                            </RequestDimmer>
                        }

                        <ModalComponent
                            component={reasonComponent}
                            handler={handleModalReason}
                            open={openModal}
                        />
                        {
                            requestList ?
                                requestList.map((request, index) => (
                                    !request.is_reviewed &&
                                    <Row key={request.id}>
                                        <Content>
                                            <p>{index + 1}</p>
                                        </Content>
                                        <Content>
                                            <p>{request.guides_name}</p>
                                        </Content>
                                        <Content>
                                            <p>${request.offers_price}</p>
                                        </Content>
                                        <Content>
                                            <p>{`${request.start_date.split('T')[0]}`}</p>
                                        </Content>
                                        <Content>
                                            <ReasonButton onClick={() => handleModalReason(request)}>
                                                <BsThreeDots size={24} />
                                            </ReasonButton>
                                        </Content>
                                        <Content>
                                            <ActionBox>
                                                {
                                                    request.is_approve && !request.is_payed &&
                                                    <React.Fragment>
                                                        <input
                                                            type="submit"
                                                            value="O"
                                                            onClick={() => updateHandler(request.id, index)}
                                                        />
                                                        <input
                                                            type="submit"
                                                            value="X"
                                                            onClick={() => deleteHandler(request.id, index)}
                                                        />
                                                    </React.Fragment>
                                                }
                                            </ActionBox>
                                        </Content>
                                        <Content>
                                            {
                                                new Date(request.end_date) < Date.now() ?
                                                    <StatusBox id={request.id} isPayed={true} onClick={() => handleReviewModal(request)}>
                                                        <FaGrinStars style={{ color: "white" }} />
                                                        <p>Review</p>
                                                    </StatusBox>
                                                    :
                                                    request.is_active ?
                                                        <Link to={`/tracks/requests/${request.id}`} style={styles.link}>
                                                            <StatusBox id={request.id} isActive={true}>
                                                                <FaMapMarkerAlt style={{ color: "white" }} />
                                                                <p>Track</p>
                                                            </StatusBox>
                                                        </Link>
                                                        :
                                                        request.is_payed ?
                                                            <StatusBox isPayed={true}>
                                                                <FaMoneyCheck style={{ color: "white" }} />
                                                                <p>Payed</p>
                                                            </StatusBox>
                                                            :
                                                            <StatusBox>
                                                                <GiSandsOfTime />
                                                                <p>Waiting</p>
                                                            </StatusBox>

                                            }
                                        </Content>
                                    </Row>
                                ))
                                :
                                null

                        }
                        <Pagination
                            current={currentPage}
                            page={page}
                            actions={handleChangePage}
                        />
                    </Table>

                </Container>
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    get_request: data => dispatch(get_request(data)),
    update_request: data => dispatch(update_request(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    send_comment_requests: data => dispatch(send_comment_requests(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AgencyRequestDashboard);