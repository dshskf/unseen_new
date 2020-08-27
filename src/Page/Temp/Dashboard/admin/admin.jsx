import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_approval_management, update_approval_status, add_message } from '../../../../Redux/product/product-action'
import { pullToken, pullUserData } from '../../../../Redux/auth/auth-selector'

import { FaMoneyCheck, FaMapMarkerAlt } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'


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

const AdminDashboard = props => {
    const header = ['Name', 'Phone', 'Item', 'Reason', 'Price', 'Action', 'Status']

    const [refetch, setRefetch] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState(null)
    const [reason, setReason] = useState('')

    useEffect(() => {
        const req = async () => {
            const getData = await props.getApproval({
                action: 'receiver_id',
                token: props.token
            })

            setData(getData.data)
        }
        req()
    }, [refetch])

    const openModalHandler = e => {
        setOpenModal(true)
        setReason(e.currentTarget.id)
    }

    const updateHandler = async (e, index) => {

        const { id, name } = e.currentTarget

        const dataToSubmit = {
            request_id: e.currentTarget.id,
            action: 'update',
            on: name
        }

        const post = await props.updateStatus({
            form: dataToSubmit,
            token: props.token
        })        

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[index].sender_id,
            content: name === "isActive" ?
                `${props.user.username} has activated your trip!`
                :
                `Cool! ${props.user.username} has approved your request, now you can go to payment!`,
            ads_id: data[index].product_id
        }

        const send = await props.addMsg({
            form: msgData,
            token: props.token
        })

        if (!post.err) {
            setRefetch(!refetch)
        }
    }

    const deleteHandler = async (e, index) => {
        const { id, name } = e.currentTarget

        const dataToSubmit = {
            request_id: e.currentTarget.id,
            action: 'delete',
            on: name
        }
        const post = await props.updateStatus({
            form: dataToSubmit,
            token: props.token
        })

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[index].sender_id,
            content: `${props.user.username} not approving your request on ${data[index].product_name}`,
            ads_id: data[index].product_id
        }

        const send = await props.addMsg({
            form: msgData,
            token: props.token
        })

        if (!post.err) {
            setRefetch(!refetch)
        }

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
                                            <Modal isOpen={openModal}>
                                                <ModalContent>
                                                    <h1>Reason</h1>
                                                    <p>{reason}</p>
                                                    <label onClick={() => setOpenModal(false)}>X</label>
                                                </ModalContent>
                                            </Modal>
                                            <p>{data.username}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.phone}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.product_name}</p>
                                        </Content>
                                        <Content id={data.reason} isReason={true} onClick={openModalHandler}>
                                            <p>...</p>
                                        </Content>
                                        <Content>
                                            <p>${data.offers_price}</p>
                                        </Content>
                                        <Content>
                                            <ActionBox>
                                                {
                                                    data.isApprove && !data.isPaying ?
                                                        null
                                                        :
                                                        data.isActive ?
                                                            null
                                                            :
                                                            <React.Fragment>
                                                                <input
                                                                    id={data.id}
                                                                    name={data.isApprove ? data.isPaying ? 'isActive' : 'isPaying' : 'isApprove'}
                                                                    type="submit"
                                                                    value="O"
                                                                    onClick={e => updateHandler(e, index)}
                                                                />
                                                                <input
                                                                    id={data.id}
                                                                    name={data.isApprove ? data.isPaying ? 'isActive' : 'isPaying' : 'isApprove'}
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
                                                data.isActive ?
                                                    <Link to={`/tracks/${data.id}`} style={styles.link}>
                                                        <StatusBox id={data.id} isActive={true}>
                                                            <FaMapMarkerAlt style={{ color: "white" }} />
                                                            <p>Track</p>
                                                        </StatusBox>
                                                    </Link>
                                                    :
                                                    data.isPaying ?
                                                        <StatusBox isPayed={true}>
                                                            <p>Payed</p>
                                                        </StatusBox>
                                                        :
                                                        data.isApprove ?
                                                            <StatusBox isPayed={true}>
                                                                <FaMoneyCheck style={{ color: "white" }} />
                                                                <p>Paying</p>
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
    getApproval: data => dispatch(get_approval_management(data)),
    updateStatus: data => dispatch(update_approval_status(data)),
    addMsg: data => dispatch(add_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AdminDashboard);