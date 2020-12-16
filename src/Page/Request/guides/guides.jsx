import React, { useEffect, useRef, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import io from 'socket.io-client'

import Sidebar from '../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../Constants/get-img'

import { get_request, update_request } from '../../../Redux/management/management.action'
import { chats_send_message } from '../../../Redux/features/features.action'

import { storage } from '../../../Constants/request'
import { API } from '../../../Constants/link'
import Pagination from '../../../Components/Paginations/pagination'
import { default as ModalComponent } from '../../../Components/ModalBox/modal'

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
    ModalContent,
    ReasonButton,
    ReasonImage,
    Reason,
    ReasonItem,
    ReasonDescription
} from './style'
import { BsThreeDots } from 'react-icons/bs'

const AgencyRequestDashboard = props => {
    const header = ['No.', 'Username', 'Offers', 'Date', 'Description', 'Confirmation', 'Status']
    const [requestList, setRequestList] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState(null)

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
                        alert.error(b.customer_name + " has canceled the requests!")
                        return null
                    } else {
                        alert.success(b.customer_name + " has been payed!")
                        b.is_payed = true
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
        const request_data = get.data.map(r => {
            if (r.users_id) {
                r.customer_id = r.users_id
                r.customer_email = r.users_email
                r.customer_image = r.users_image
                r.customer_name = r.users_name
                r.customer_phone = r.users_phone
                r.customer_type = 'U'
            } else {
                r.customer_id = r.agency_id
                r.customer_email = r.agency_email
                r.customer_image = r.agency_image
                r.customer_name = r.agency_name
                r.customer_phone = r.agency_phone
                r.customer_type = 'A'
            }

            delete r.agency_email
            delete r.agency_id
            delete r.agency_image
            delete r.agency_name
            delete r.agency_phone
            delete r.users_email
            delete r.users_id
            delete r.users_image
            delete r.users_name
            delete r.users_phone

            return r
        })

        tempRequest.current = request_data
        convertPagetoArr(get.total_page)
        setRequestList(request_data)
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

        // set  active if not active
        if (!new_data.is_approve) {
            new_data.is_approve = true
        } else if (new_data.is_approve && !new_data.is_active) {
            new_data.is_active = true
        }

        const dataToSubmit = {
            request_id: id,
            action: 'update'
        }

        const post = await props.update_request({ ...dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully update ${new_data.customer_name}!`)
        } else {
            new_data.is_approve = false
            alert.error(post.err)
            return
        }

        const message = new_data.is_active ?
            `${storage.username} has approved your requests!`
            :
            `${storage.username} has activated your requests!`

        const msgData = {
            receiver_id: new_data.customer_id,
            receiver_type: new_data.customer_type,
            content: message,            
        }

        await props.chats_send_message({ ...msgData })
        socketIo.current.emit('update_request', {
            opposite_room: `${new_data.customer_id}-${new_data.customer_type}`,
            request_id: new_data.id
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
            alert.success(`Sucessfully reject ${new_data.customer_name}!`)
            const msgData = {
                receiver_id: new_data.customer_id,
                receiver_type: new_data.customer_type,
                content: `${storage.username} has rejected your requests!`,
                tours_id: new_data.id,
                tours_type: 'G'
            }

            await props.chats_send_message({ ...msgData })
            socketIo.current.emit('update_request', {
                opposite_room: `${new_data.customer_id}-${new_data.customer_type}`,
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
                    <p>{modalData.customer_name}</p>
                </ReasonItem>
                <ReasonItem>
                    <p>Email</p>
                    <p>:</p>
                    <p>{modalData.customer_email}</p>
                </ReasonItem>
                <ReasonItem>
                    <p>Phone</p>
                    <p>:</p>
                    <p>{modalData.customer_phone}</p>
                </ReasonItem>
                <ReasonDescription>
                    {modalData.description}
                </ReasonDescription>
            </Reason>
        </React.Fragment>
    )

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
                        <ModalComponent
                            component={reasonComponent}
                            handler={handleModalReason}
                            open={openModal}
                        />
                        {
                            requestList ?
                                requestList.map((request, index) => (
                                    <Row key={request.id}>
                                        <Content>
                                            <p>{index + 1}</p>
                                        </Content>
                                        <Content>
                                            <p>{request.customer_name}</p>
                                        </Content>
                                        <Content>
                                            <p>${request.offers_price}</p>
                                        </Content>
                                        <Content>
                                            <p>{`${request.start_date.split('T')[0]} ~ ${request.end_date.split('T')[0]}`}</p>
                                        </Content>
                                        <Content>
                                            <ReasonButton onClick={() => handleModalReason(request)}>
                                                <BsThreeDots size={24} />
                                            </ReasonButton>
                                        </Content>
                                        <Content>
                                            <ActionBox>
                                                {
                                                    !request.is_approve && !request.is_payed ?
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
                                                        :
                                                        request.is_payed && !request.is_active ?
                                                            <input
                                                                type="submit"
                                                                value="Activate"
                                                                onClick={() => updateHandler(request.id, index)}
                                                            />
                                                            :
                                                            null
                                                }
                                            </ActionBox>
                                        </Content>
                                        <Content>
                                            {
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
    chats_send_message: data => dispatch(chats_send_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AgencyRequestDashboard);