import React, { useEffect, useState, useRef } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../Components/Sidebar/sidebar'
import { getImg } from '../../../Constants/get-img'
import { send_comment_booking } from '../../../Redux/tours/tours.action'
import { get_booking_user, update_booking_user } from '../../../Redux/management/management.action'
import { chats_send_message } from '../../../Redux/features/features.action'
import ReactStars from "react-rating-stars-component";

import { pullUserData } from '../../../Redux/auth/auth.selector'
import { storage } from '../../../Constants/request'
import { API } from '../../../Constants/link'
import Pagination from '../../../Components/Paginations/pagination'
import io from 'socket.io-client'

import { FaMoneyCheck, FaMapMarkerAlt, FaGrinStars } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { useAlert } from "react-alert";

import { Body, Sub, Header } from '../../style.route'

import {
    Container,
    Table,
    Row,
    Content,
    ActionBox,
    StatusBox,
    RequestDimmer,
    RequestBox,
    RequestPanel,
    RequestInput,
    RequestSubmit,
} from './style'
import Modal from '../../../Components/Modal/modal'

const UserBookingDashboard = props => {
    const header = ['No.', 'Agency', 'Tours', 'Price', 'Start Date', 'Confirmation', 'Status']
    const [bookingList, setBookingList] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])
    const [selectedTours, setSelectedTours] = useState(null)
    const [reviewForm, setReviewForm] = useState({
        isOpen: false,
        rating: 0,
        description: ''
    })

    const tempBooking = useRef()
    const socketIo = useRef()
    const alert = useAlert()

    useEffect(() => {
        let socket = io(API)
        socket.emit('join_room', {
            room_id: `${storage.id}-${storage.type_code}`
        })
        socket.on('new_booking', res => {

            tempBooking.current = tempBooking.current.map(b => {
                if (res.booking_id === b.id) {
                    alert.show(b.ads_title + " has been activated!")
                    b.is_active = true
                    return b
                }
                return b
            })

            setBookingList(tempBooking.current)
        })

        socketIo.current = socket

        return () => socketIo.current.disconnect()
    }, [])

    useEffect(() => {
        fetch()
    }, [currentPage])

    const fetch = async () => {
        const get = await props.get_booking_user({
            page: currentPage,
            is_mobile: false
        })
        tempBooking.current = get.data
        console.log(get.data)
        convertPagetoArr(get.total_page)
        setBookingList(get.data)
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

    const updateHandler = async (id, tours_id, index) => {
        let new_data = bookingList[index]
        new_data.is_payed = true

        const dataToSubmit = {
            booking_id: id,
            tours_id: tours_id,
            action: 'update'
        }

        const post = await props.update_booking_user({ form: dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully update ${new_data.ads_title}!`)
        } else {
            new_data.is_payed = false
            alert.error(post.err)
        }

        const msgData = {
            receiver_id: new_data.receiver_id,
            receiver_type: 'A',
            content: `${new_data.user_username} has been paid for ${new_data.ads_title} tours!`,
            tours_id: new_data.tours_id,
            tours_type: 'A'
        }

        await props.chats_send_message({ ...msgData })
        socketIo.current.emit('update_booking', {
            opposite_room: `${new_data.receiver_id}-A`,
            booking_id: new_data.id
        })

        let update = bookingList.map(d => d)
        update[index] = new_data
        setBookingList(update)
    }

    const deleteHandler = async (id, index) => {
        let new_data = bookingList[index]
        let filtered_data = bookingList.filter(booking => booking.id !== id)

        const dataToSubmit = {
            booking_id: id,
            action: 'delete'
        }
        const post = await props.update_booking_user({ form: dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully Reject ${new_data.ads_title}!`)
        } else {
            alert.error(post.err)
        }
        setBookingList(filtered_data)
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

    const handleReviewModal = (bookingData) => {
        if (bookingData) {
            setSelectedTours({
                booking_id: bookingData.id,
                tours_id: bookingData.tours_id,
                receiver_id: bookingData.receiver_id
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
        const post = await props.send_comment_booking({
            sender_id: storage.id,
            booking_id: selectedTours.booking_id,
            tours_id: selectedTours.tours_id,
            agency_id: selectedTours.receiver_id,
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
            <Sidebar page="dashboard" />

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

                        {
                            bookingList ?
                                bookingList.map((data, index) => (
                                    !data.is_reviewed &&
                                    <Row key={data.id}>
                                        <Content>
                                            <p>{index + 1}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.agency_username}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.ads_title}</p>
                                        </Content>
                                        <Content>
                                            <p>${data.ads_price}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.ads_start_date.split('T')[0]}</p>
                                        </Content>
                                        <Content>
                                            <ActionBox>
                                                {
                                                    !data.is_payed &&
                                                    <React.Fragment>
                                                        <input
                                                            type="submit"
                                                            value="O"
                                                            onClick={e => updateHandler(data.id, data.tours_id, index)}
                                                        />
                                                        <input
                                                            type="submit"
                                                            value="X"
                                                            onClick={() => deleteHandler(data.id, index)}
                                                        />
                                                    </React.Fragment>

                                                }
                                            </ActionBox>
                                        </Content>
                                        <Content>
                                            {
                                                new Date(data.ads_end_date) < Date.now() ?
                                                    <StatusBox id={data.id} isPayed={true} onClick={() => handleReviewModal(data)}>
                                                        <FaGrinStars style={{ color: "white" }} />
                                                        <p>Review</p>
                                                    </StatusBox>
                                                    :
                                                    data.is_active ?
                                                        <Link to={`/tracks/bookings/${data.id}`} style={styles.link}>
                                                            <StatusBox id={data.id} isActive={true}>
                                                                <FaMapMarkerAlt style={{ color: "white" }} />
                                                                <p>Track</p>
                                                            </StatusBox>
                                                        </Link>
                                                        :
                                                        data.is_payed ?
                                                            <StatusBox isPayed={true}>
                                                                <FaMoneyCheck style={{ color: "white" }} />
                                                                <p>In Process</p>
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
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    get_booking_user: data => dispatch(get_booking_user(data)),
    update_booking_user: data => dispatch(update_booking_user(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    send_comment_booking: data => dispatch(send_comment_booking(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserBookingDashboard);