import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_friend_list, get_msg, add_message, get_product_detail } from '../../../Redux/product/product-action'
import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'

import {
    Container,
    Friends,
    MessageBox,
    MessageField,
    MessageInput,
    Text
} from './style'

let socket

const ChatsRoom = props => {
    const [input, setInput] = useState('')

    const [userData, setUserData] = useState('')
    const [friendList, setFriendList] = useState('')
    const [message, setMessage] = useState('')

    const API = "localhost:1234"

    useEffect(() => {
        socket = io(API)
        socket.emit('join_room', {
            room_id: props.user.id
        })

        socket.on('msg_response', data => {
            setMessage(lastData => [...lastData, data])
        })

        const req = async () => {
            const post = await props.getFriend({
                id: props.user.id,
                token: props.token
            })
            setFriendList(post.data)
        }

        if (props.user) {
            req()
        }

    }, [API])


    const fetchMsg = async e => {
        const dataToSubmit = {
            sender_id: props.user.id,
            receiver_id: e.currentTarget.id
        }
        const req = await props.getMsg({
            id: dataToSubmit,
            token: props.token
        })
        console.log(req)

        setUserData(dataToSubmit)
        setMessage(req.data)
    }

    const send_message = async () => {
        const dataToSubmit = {
            sender_id: userData.sender_id,
            receiver_id: userData.receiver_id,
            content: input,
            notification: null
        }
        setMessage(lastData => [...lastData, { content: input, sender_id: userData.sender_id }])
        setInput('')

        console.log(userData.receiver_id)

        socket.emit('msg', {
            msg: input,
            to: userData.receiver_id
        })

        const req = await props.addMsg({
            form: dataToSubmit,
            token: props.token
        })
    }

    return (
        <Container>
            <Friends>
                {
                    friendList ?
                        friendList.map((data, index) => {
                            return (
                                <p id={data.id} key={index} onClick={fetchMsg}>{data.username}</p>
                            )
                        })
                        :
                        null
                }

            </Friends>
            <MessageBox>
                <MessageField>
                    {
                        message ?
                            message.map((data, index) => {
                                let img
                                if (data.notification) {
                                    img = 'http://localhost:1234/' + data.prod_data.image[0].replace('\\', '/')
                                }
                                return (
                                    data.notification ?
                                        <div>
                                            <Text key={index} isUser={data.sender_id === userData.sender_id}>{data.content}</Text>
                                            <Text isUser={data.sender_id === userData.sender_id}>{data.prod_data.title}</Text>
                                            <Text isUser={data.sender_id === userData.sender_id}>{data.prod_data.cost}</Text>
                                            <img src={img} style={{ width: '4rem', height: '4rem' }} />
                                        </div>
                                        :
                                        <Text key={index} isUser={data.sender_id === userData.sender_id}>{data.content}</Text>

                                )
                            })
                            :
                            null
                    }
                </MessageField>

                <MessageInput>
                    <input type="text" name="msg" value={input} placeholder="Enter something..." onChange={e => setInput(e.target.value)} />
                    <input type="submit" value="Send" onClick={send_message} />
                </MessageInput>
            </MessageBox>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getFriend: data => dispatch(get_friend_list(data)),
    getMsg: data => dispatch(get_msg(data)),
    addMsg: data => dispatch(add_message(data)),
    getDetail: data => dispatch(get_product_detail(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatsRoom);