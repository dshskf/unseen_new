import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter, useHistory } from 'react-router-dom'

import { get_friend_list, get_msg, add_message, get_product_detail } from '../../../../Redux/product/product-action'
import { pullToken, pullUserData, pullSocket } from '../../../../Redux/auth/auth-selector'

import { getImg } from '../../../../Constants/get-img'
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai'

import {
    Container,
    Contacts,
    User,
    Friend,
    FriendTitle,
    Chat,
    ChatTitle,
    Box,
    BoxRight,
    LeftText,
    RightText,
    Text,
    InputBox
} from './style'

// let socket

const ChatPage = props => {
    const [input, setInput] = useState('')
    const [userData, setUserData] = useState('')
    const [friendList, setFriendList] = useState([])
    const [message, setMessage] = useState('')
    const [chatting, setChatting] = useState(false)
    const [activeId, setActiveId] = useState({
        receiver: '',
        friendName: ''
    })

    let friends = []
    const messageEnd = useRef(null)

    const API = "localhost:1234"

    useEffect(async () => {
        let socket = props.socket

        if (!socket) {
            props.history.push('/')
        }

        socket.on('msg_response', data => {
            const d = new Date()
            const dateNow = `T${d.getHours()}:${d.getMinutes()}`
            const isReFetchFriendList = isFetchNewFriend(data)

            if (isReFetchFriendList) {
                console.log("Fetch")
                req()
            }

            setMessage(lastData => [
                ...lastData,
                {
                    ...data,
                    createdAt: dateNow
                }
            ])
            messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        })

        const req = async () => {
            const post = await props.getFriend({
                id: props.user.id,
                token: props.token
            })
            friends = post.data
            setFriendList(post.data)
        }

        if (props.user) {
            req()
        }
    }, [API])

    const isFetchNewFriend = (msg) => {
        let isFetch = true
        friends.map(friend => {
            if (friend.id.toString() === msg.sender_id.toString()) {
                isFetch = false
            }
        })
        return isFetch
    }

    const fetchMsg = async e => {
        const filterFriends = friendList.filter(friend => friend.id.toString() === e.currentTarget.id)
        const receiver = e.currentTarget.id

        const dataToSubmit = {
            sender_id: props.user.id,
            receiver_id: receiver,
            user_image: props.user.image,
            friend_image: filterFriends[0].image
        }

        const req = await props.getMsg({
            id: dataToSubmit,
            token: props.token
        })

        setUserData(dataToSubmit)
        setActiveId({
            receiver: receiver,
            friendName: filterFriends[0].username
        })
        setMessage(req.data)
        setChatting(true)
        messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
    }

    const send_message = async () => {
        const d = new Date()
        const dateNow = `T${d.getHours()}:${d.getMinutes()}`

        const dataToSubmit = {
            sender_id: userData.sender_id,
            receiver_id: userData.receiver_id,
            content: input,
            notification: null
        }
        setMessage(lastData => [...lastData, { ...dataToSubmit, createdAt: dateNow }])
        setInput('')

        const req = await props.addMsg({
            form: dataToSubmit,
            token: props.token
        })

        messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        props.socket.emit('msg', dataToSubmit)
    }

    const onEnterHandler = e => {
        return e.key === 'Enter' ? send_message() : null
    }

    return (
        <Container>
            <Contacts>
                <User>
                    <input type="text" placeholder="Search..." />
                </User>

                <Friend>
                    {
                        friendList ?
                            friendList.map((data, index) => {
                                return (
                                    <FriendTitle
                                        id={data.id}
                                        key={index}
                                        isActive={data.id.toString() === activeId.receiver.toString()}
                                        onClick={fetchMsg}
                                    >
                                        <img src={getImg("Account", "guest.png")} />
                                        <p>{data.username}</p>
                                    </FriendTitle>
                                )
                            })
                            :
                            null
                    }
                </Friend>
            </Contacts>
            {
                chatting ?
                    <Chat>
                        <ChatTitle>
                            <AiOutlineClose
                                style={{ position: 'absolute', color: '#384355', fontSize: '1.5rem', right: '5%', cursor: 'pointer' }}
                                onClick={() => setChatting(false)}
                            />
                            <p>{activeId.friendName}</p>
                        </ChatTitle>
                        <Box>
                            {
                                message ?
                                    message.map((data, index) => {
                                        let img = data.notification ?
                                            'http://localhost:1234/' + data.prod_data.image[0].replace('\\', '/')
                                            :
                                            null
                                        const date = data.createdAt.split('T')[1].substring(0, 5)

                                        return (
                                            data.sender_id.toString() === userData.sender_id.toString() ?
                                                <BoxRight key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <RightText>
                                                        <Text isRight={true} length={data.content}>
                                                            <p>{data.content}</p>
                                                            <span>{date} pm</span>
                                                        </Text>

                                                        <img src={userData.friend_image ? userData.friend_image : getImg("Account", "guest.png")} />
                                                    </RightText>
                                                </BoxRight>
                                                :
                                                <LeftText key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <img src={userData.user_image ? userData.user_image : getImg("Account", "guest.png")} />
                                                    <Text length={data.content}>
                                                        <p>{data.content}</p>
                                                        <span>{date} pm</span>
                                                    </Text>

                                                </LeftText>
                                        )
                                    })
                                    :
                                    null
                            }
                        </Box>
                        <InputBox>
                            <input type="text" placeholder="Enter something here..." onChange={e => setInput(e.target.value)} onKeyDown={onEnterHandler} value={input} />
                            <AiOutlineSend style={{ color: 'white', fontSize: '1.5rem' }} onClick={send_message} />
                        </InputBox>
                    </Chat>
                    :
                    null
            }

        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData,
    socket: pullSocket
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
)(ChatPage);