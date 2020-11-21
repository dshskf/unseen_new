import React, { useEffect, useRef, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../Constants/get-img'

import { get_booking_agency, update_booking_agency } from '../../../Redux/management/management.action'
import { chats_send_message } from '../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../Redux/auth/auth.selector'
import { storage } from '../../../Constants/request'
import { API } from '../../../Constants/link'
import Pagination from '../../../Components/Paginations/pagination'
import io from 'socket.io-client'

import { FaMoneyCheck, FaMapMarkerAlt } from 'react-icons/fa'
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
    ModalContent
} from './style'

const AgencyBookingDashboard = props => {
    const header = ['No.', 'Username', 'Tours', 'Price', 'Start Date', 'Confirmation', 'Status']
    const [bookingList, setBookingList] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])

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
                    b.is_payed = true
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
        const get = await props.get_booking_agency({
            page: currentPage,
            is_mobile: false
        })
        tempBooking.current = get.data
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

    const updateHandler = async (id, index) => {
        let new_data = bookingList[index]
        new_data.is_active = true
        const dataToSubmit = {
            booking_id: id,
            action: 'update'
        }

        const post = await props.update_booking_agency({ form: dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully update ${new_data.ads_title}!`)
        } else {
            new_data.is_active = false
            alert.error(post.err)
            return
        }

        const msgData = {
            receiver_id: new_data.receiver_id,
            receiver_type: 'U',
            content: `${new_data.agency_username} already activate for ${new_data.ads_title} tours!`,
            tours_id: new_data.tours_id,
            tours_type: 'A'
        }

        await props.chats_send_message({ ...msgData })
        socketIo.current.emit('update_booking', {
            opposite_room: `${new_data.sender_id}-U`,
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
        const post = await props.update_booking_agency({ form: dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully reject ${new_data.ads_title}!`)
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
                            bookingList ?
                                bookingList.map((data, index) => (
                                    <Row key={data.id}>
                                        <Content>
                                            <p>{index + 1}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.user_username}</p>
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
                                                    (data.is_payed && !data.is_active) &&
                                                    <React.Fragment>
                                                        <input
                                                            type="submit"
                                                            value="O"
                                                            onClick={() => updateHandler(data.id, index)}
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
                                                data.is_active ?
                                                    <Link to={`/tracks/${data.id}`} style={styles.link}>
                                                        <StatusBox id={data.id} isActive={true}>
                                                            <FaMapMarkerAlt style={{ color: "white" }} />
                                                            <p>Track</p>
                                                        </StatusBox>
                                                    </Link>
                                                    :
                                                    data.is_payed ?
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
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    get_booking_agency: data => dispatch(get_booking_agency(data)),
    update_booking_agency: data => dispatch(update_booking_agency(data)),
    chats_send_message: data => dispatch(chats_send_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AgencyBookingDashboard);