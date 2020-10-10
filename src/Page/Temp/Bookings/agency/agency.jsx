import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_booking_agency, update_booking_agency } from '../../../../Redux/management/management.action'
import { chats_send_message } from '../../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { storage } from '../../../../Constants/request'

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
    const header = ['Seller', 'Product', 'Price', 'Start Date', 'Confirmation', 'Status']
    const [data, setData] = useState('')
    const [refetch, setRefetch] = useState(false)
    const [tab, setTab] = useState('A')

    useEffect(() => {
        const req = async () => {
            const get = await props.get_booking_agency({
                action: 'sender_id',
                token: storage.token
            })
            console.log(get)
            setData(get.data)
        }
        req()
    }, [])

    const updateHandler = async (e, index) => {
        const { id } = e.currentTarget

        const dataToSubmit = {
            request_id: id,
            action: 'update'
        }

        const post = await props.update_booking_agency({
            form: dataToSubmit,
            token: storage.token
        })
        

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[index].receiver_id,
            content: `Cool! now you can go to payment process!`,
            notification: data[index].tours_id
        }

        // const send = await props.chats_send_message({
        //     form: msgData,
        //     token: storage.token
        // })

        // if (!post.err) {
        //     setRefetch(!refetch)
        // }
    }

    const deleteHandler = async (e, index) => {
        const { id, name } = e.currentTarget

        const dataToSubmit = {
            request_id: id,
            action: 'delete'
        }
        const post = await props.update_booking_agency({
            form: dataToSubmit,
            token: storage.token
        })

        // const msgData = {
        //     sender_id: props.user.id,
        //     receiver_id: data[index].receiver_id,
        //     content: `${props.user.username} cancelled ${data[index].product_name}`,
        //     notification: null
        // }

        // const send = await props.chats_send_message({
        //     form: msgData,
        //     token: storage.token
        // })

        // if (!post.err) {
        //     setRefetch(!refetch)
        // }

    }


    return (
        <Body>
            <Sidebar page="dashboard" />

            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                    <h1>CHANGE</h1>
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
                                            <p>{
                                                tab === 'A' ? data.user_username : data.guides.username
                                            }</p>
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
                                                    !data.is_active &&
                                                    <React.Fragment>
                                                        <input
                                                            id={data.id}
                                                            type="submit"
                                                            value="O"
                                                            onClick={e => updateHandler(e, index)}
                                                        />
                                                        <input
                                                            id={data.id}
                                                            type="submit"
                                                            value="X"
                                                            onClick={e => deleteHandler(e, index)}
                                                        />
                                                    </React.Fragment>

                                                }
                                            </ActionBox>
                                        </Content>
                                        <Content>
                                            {
                                                data.is_active ?
                                                    <StatusBox>
                                                        Active
                                                    </StatusBox>
                                                    :
                                                    data.is_payed ?
                                                        <StatusBox isPayed={true}>
                                                            Payed
                                                        </StatusBox>
                                                        :
                                                        <StatusBox>
                                                            Waiting
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