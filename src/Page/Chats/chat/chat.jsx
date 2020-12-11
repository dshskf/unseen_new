import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

import { chats_person_list, chats_fetch_message, chats_send_message } from '../../../Redux/features/features.action'
import { get_edit_profile as get_agency_profile } from '../../../Redux/agency/agency.action'
import { get_edit_profile as get_guides_profile } from '../../../Redux/guides/guides.action'
import { get_edit_profile as get_user_profile } from '../../../Redux/user/user.action'


import { pullToken, pullUserData } from '../../../Redux/auth/auth.selector'

import { getImg, renameImg } from '../../../Constants/get-img'
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai'
import { API } from '../../../Constants/link'
import { storage } from '../../../Constants/request'

import {
    Container,
    Contacts,
    User,
    Friend,
    FriendTitle,
    FriendData,
    Chat,
    ChatTitle,
    Box,
    BoxRight,
    ToursBox,
    ToursDetail,
    LeftText,
    RightText,
    MessageBox,
    InputBox
} from './style'

// let socket

const ChatPage = props => {
    const [input, setInput] = useState('')
    const [userData, setUserData] = useState('')
    const [friendData, setFriendData] = useState('')
    const [friendList, setFriendList] = useState([])
    const [message, setMessage] = useState('')
    const [chatting, setChatting] = useState(false)

    const messageEnd = useRef(null)
    const friendListRef = useRef(null)
    const friendDataRef = useRef(null)
    const messageRef = useRef(null)
    const socketIo = useRef()


    useEffect(() => {
        let socket = io(API)
        socket.emit('join_room', {
            room_id: `${storage.id}-${storage.type_code}`
        })

        socket.on('msg_response', async data => {
            const d = new Date()
            const dateNow = `T${d.getHours()}:${d.getMinutes()}`
            const updateFriendlist = friendListRef.current.map(friend => {
                if (data.sender_id === friend.id && data.sender_type === friend.type) {
                    friend.content = checkMessageLength(data.content)
                }
                return friend
            })

            if (messageRef.current && friendDataRef.current.id === data.sender_id && friendDataRef.current.type === data.sender_type) {
                const updateMessage = [...messageRef.current, {
                    ...data,
                    createdAt: dateNow
                }]

                messageRef.current = updateMessage
                setMessage(updateMessage)
            }


            setFriendList(updateFriendlist)
            if (messageEnd.current) {
                messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
            }

        })

        socketIo.current = socket
        fetchFriend()


        return () => {
            if (socketIo.current) {
                socketIo.current.disconnect()
            }
        }
    }, [])

    const fetchFriend = async () => {
        let user

        // Why using "request" instead of using "local storage" is because when user update the profile, need a new data
        if (storage.type_code === 'A') {
            user = await props.get_agency_profile()
        } else if (storage.type_code === 'G') {
            user = await props.get_guides_profile()
        } else {
            user = await props.get_user_profile()
        }

        let friend = await props.chats_person_list()

        // check message length
        friend = friend.data.map(f => {
            f.content = checkMessageLength(f.content)
            return f
        })

        friendListRef.current = friend
        setUserData(user.data)
        setFriendList(friend)
    }

    const checkMessageLength = msg => {
        return msg.length > 30 ? msg.substr(0, 30) + "..." : msg
    }

    const fetchMsg = async (id, type) => {
        let filterFriends = friendList.filter(friend => friend.id === id && friend.type === type);
        filterFriends = filterFriends[0]

        const receiver_id = filterFriends.id
        const receiver_type = filterFriends.type

        const dataToSubmit = {
            sender_type: storage.type_code,
            receiver_id: receiver_id,
            receiver_type: receiver_type,
            tours_type: receiver_type
        }
        const msg = await props.chats_fetch_message(dataToSubmit)

        messageRef.current = msg.data
        friendDataRef.current = filterFriends

        setFriendData(filterFriends)
        setMessage(msg.data)
        setChatting(true)

        if (messageEnd.current) {
            messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        }

    }

    const send_message = async () => {
        const d = new Date()
        const dateNow = `T${d.getHours()}:${d.getMinutes()}`

        const dataToSubmit = {
            sender_id: storage.id,
            sender_type: storage.type_code,
            receiver_id: friendData.id,
            receiver_type: friendData.type,
            content: input,
        }

        const sendMsg = await props.chats_send_message(dataToSubmit)

        if (!sendMsg.err) {
            const updateFriendlist = friendList.map(friend => {
                if (friend.id === dataToSubmit.receiver_id && friend.type === dataToSubmit.receiver_type) {
                    friend.content = checkMessageLength(input)
                }
                return friend

            })

            messageRef.current = [...messageRef.current, { ...dataToSubmit, createdAt: dateNow }]

            await setFriendList(updateFriendlist)
            await setMessage(lastData => [...lastData, { ...dataToSubmit, createdAt: dateNow }])
        }

        setInput('')
        socketIo.current.emit('msg', dataToSubmit)

        if (messageEnd.current) {
            messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        }
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
                            friendList.map((friend, index) => {
                                return (
                                    <FriendTitle
                                        key={index}
                                        isActive={friendData && (friend.id === friendData.id && friend.type === friendData.type)}
                                        onClick={() => fetchMsg(friend.id, friend.type)}
                                    >
                                        <img alt="" src={friend.image ? renameImg(friend.image) : getImg("Account", "guest.png")} />
                                        <FriendData>
                                            <p>{friend.username}</p>
                                            <p>{friend.content}</p>
                                        </FriendData>

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
                            <p>{friendData && friendData.username}</p>
                        </ChatTitle>
                        <Box>
                            {
                                message ?
                                    message.map((msg, index) => {
                                        let img = msg.tours_id ? renameImg(msg.tours_image[0]) : null
                                        const date = msg.createdAt.split('T')[1].substring(0, 5)
                                        return (
                                            storage.type_code === msg.sender_type ?
                                                <BoxRight key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <RightText>
                                                        <MessageBox isRight={true} length={msg.content}>
                                                            {
                                                                msg.tours_id && <ToursBox>
                                                                    <img alt="" src={img} />
                                                                    <ToursDetail>
                                                                        <p>{msg.tours_title}</p>
                                                                        <p>${msg.tours_cost}</p>
                                                                    </ToursDetail>
                                                                </ToursBox>
                                                            }
                                                            <p>{msg.content}</p>
                                                            <span>{date} pm</span>
                                                        </MessageBox>
                                                        <img alt="" src={userData.image ? renameImg(userData.image) : getImg("Account", "guest.png")} />
                                                    </RightText>
                                                </BoxRight>
                                                :
                                                <LeftText key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <img alt="" src={friendData.image ? renameImg(friendData.image) : getImg("Account", "guest.png")} />
                                                    <MessageBox length={msg.content}>
                                                        {
                                                            msg.tours_id && <ToursBox>
                                                                <img alt="" src={img} />
                                                                <ToursDetail>
                                                                    <p>{msg.tours_title}</p>
                                                                    <p>${msg.tours_cost}</p>
                                                                </ToursDetail>
                                                            </ToursBox>
                                                        }

                                                        <p>{msg.content}</p>
                                                        <span>{date} pm</span>
                                                    </MessageBox>
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
})

const mapDispatchToProps = (dispatch) => ({
    chats_person_list: data => dispatch(chats_person_list(data)),
    chats_fetch_message: data => dispatch(chats_fetch_message(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    get_agency_profile: (data) => dispatch(get_agency_profile(data)),
    get_guides_profile: (data) => dispatch(get_guides_profile(data)),
    get_user_profile: (data) => dispatch(get_user_profile(data)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatPage);