import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_booking_agency, update_booking_agency } from '../../../../Redux/management/management.action'
import { chats_send_message } from '../../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { storage } from '../../../../Constants/request'


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
    const [data, setData] = useState('')
    const alert = useAlert()

    useEffect(() => {
        const req = async () => {
            const get = await props.get_booking_agency({
                action: 'sender_id'
            })
            console.log(get.data)
            setData(get.data)
        }
        req()
    }, [])

    const updateHandler = async (id, index) => {
        let new_data = data[index]
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
        }

        const msgData = {
            receiver_id: data[index].receiver_id,
            receiver_type: 'A',
            content: `${new_data.agency_username} already activate for ${new_data.ads_title} tours!`,
            tours_id: data[index].tours_id,
            tours_type: 'A'
        }

        await props.chats_send_message({ ...msgData })


        let update = data.map(d => d)
        update[index] = new_data
        setData(update)
    }

    const deleteHandler = async (id, index) => {
        let new_data = data[index]
        let filtered_data = data.filter(booking => booking.id !== id)

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

        setData(filtered_data)
    }

    const styles = {
        link: { textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }
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
                            data ?
                                data.map((data, index) => (
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
                                                    <Link to={`/tracks/agency/${data.id}`} style={styles.link}>
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
                    </Table>
                </Container>
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
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