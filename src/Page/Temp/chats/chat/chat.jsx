import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

import { chats_person_list, chats_fetch_message, chats_send_message } from '../../../../Redux/features/features.action'
// import { get_tours_detail } from '../../../../Redux/tours/tours.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'

import { getImg } from '../../../../Constants/get-img'
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai'
import { API } from '../../../../Constants/link'
import { storage } from '../../../../Constants/request'

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
    const [friendList, setFriendList] = useState([])
    const [message, setMessage] = useState('')
    const [chatting, setChatting] = useState(false)

    let [lastMessage, setLastMessage] = useState(false)
    const [activeChats, setActiveChats] = useState({
        index: '',
        receiver: '',
        friendName: '',
        type: ''
    })

    const messageEnd = useRef(null)
    const isScroll = useRef(false)
    const socketIo = useRef()
    const activeList = useRef({
        index: '',
        receiver: '',
        friendName: '',
        type: ''
    })

    useEffect(() => {
        let socket = io(API)
        socket.emit('join_room', {
            room_id: `${storage.id}-${storage.type_code}`
        })

        socket.on('msg_response', async data => {
            const d = new Date()
            const dateNow = `T${d.getHours()}:${d.getMinutes()}`
            await fetchFriend()

            if (data.sender_id.toString() === activeList.current.receiver.toString() && data.sender_type === activeList.current.type) {

                await setMessage(lastData => [
                    ...lastData,
                    {
                        ...data,
                        createdAt: dateNow
                    }
                ])

                if (isScroll.current && messageEnd.current) {
                    messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
                }
            }
        })

        socketIo.current = socket
        fetchFriend()


        return () => socketIo.current.disconnect()
    }, [])



    const fetchFriend = async () => {
        let get = await props.chats_person_list()
        get.last_message.map((last_msg, i) => {
            last_msg.content = checkMessageLength(last_msg.content)

            // set index
            last_msg.index = i
            get.data[i].index = i

            return last_msg
        })

        setLastMessage(get.last_message)
        setFriendList(get.data)
    }

    const checkMessageLength = msg => {
        return msg.length > 30 ? msg.substr(0, 30) + "..." : msg
    }

    const fetchMsg = async e => {
        let filterFriends = friendList.filter(friend => friend.index.toString() === e.currentTarget.id)
        filterFriends = filterFriends[0]

        const receiver_id = filterFriends.id
        const receiver_type = filterFriends.type
        const tours_type = storage.type[0].toUpperCase() === 'U' ? receiver_type : storage.type[0].toUpperCase()

        const dataToSubmit = {
            sender_id: props.user.id,
            sender_type: storage.type[0].toUpperCase(),
            receiver_id: receiver_id,
            receiver_type: receiver_type,
            tours_type: tours_type
        }
        const req = await props.chats_fetch_message(dataToSubmit)

        const active_data = {
            index: filterFriends.index,
            receiver: receiver_id,
            friendName: filterFriends.username,
            type: receiver_type
        }

        setUserData({
            ...dataToSubmit,
            user_image: props.user.image,
            friend_image: filterFriends.image
        })

        activeList.current = active_data
        setActiveChats(active_data)
        setMessage(req.data)
        setChatting(true)

        isScroll.current = true
        messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
    }

    const send_message = async () => {
        const d = new Date()
        const dateNow = `T${d.getHours()}:${d.getMinutes()}`

        const dataToSubmit = {
            sender_id: userData.sender_id,
            sender_type: storage.type[0].toUpperCase(),
            receiver_id: userData.receiver_id,
            receiver_type: userData.receiver_type,
            content: input,
        }


        lastMessage = await lastMessage.map(msg => {
            if (msg.index === activeChats.index) {
                msg.content = checkMessageLength(input)
            }
            return msg
        })


        await setLastMessage(lastMessage)
        await setMessage(lastData => [...lastData, { ...dataToSubmit, createdAt: dateNow }])
        await props.chats_send_message(dataToSubmit)

        setInput('')
        messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
        socketIo.current.emit('msg', dataToSubmit)
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
                                        id={data.index}
                                        key={index}
                                        isActive={data.id.toString() === activeChats.receiver.toString()}
                                        onClick={fetchMsg}
                                    >
                                        <img src={data.image ? API + data.image.replace('\\', '/') : getImg("Account", "guest.png")} />
                                        <FriendData>
                                            <p>{data.username}</p>
                                            <p>{lastMessage[index].content}</p>
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
                            <p>{activeChats.friendName}</p>
                        </ChatTitle>
                        <Box>
                            {
                                message ?
                                    message.map((data, index) => {
                                        let img = data.tours_id ?
                                            API + data.tours_image[0].replace('\\', '/')
                                            :
                                            null
                                        const date = data.createdAt.split('T')[1].substring(0, 5)

                                        return (
                                            data.sender_id.toString() === userData.sender_id.toString() && data.sender_type !== userData.receiver_type ?
                                                <BoxRight key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <RightText>
                                                        <MessageBox isRight={true} length={data.content}>
                                                            {
                                                                data.tours_id && <ToursBox>
                                                                    <img src={img} />
                                                                    <ToursDetail>
                                                                        <p>{data.tours_title}</p>
                                                                        <p>${data.tours_cost}</p>
                                                                    </ToursDetail>
                                                                </ToursBox>
                                                            }
                                                            <p>{data.content}</p>
                                                            <span>{date} pm</span>
                                                        </MessageBox>
                                                        <img src={userData.friend_image ? API + userData.friend_image : getImg("Account", "guest.png")} />
                                                    </RightText>
                                                </BoxRight>
                                                :

                                                <LeftText key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <img src={userData.user_image ? API + userData.user_image : getImg("Account", "guest.png")} />
                                                    <MessageBox length={data.content}>
                                                        {
                                                            data.tours_id && <ToursBox>
                                                                <img src={img} />
                                                                <ToursDetail>
                                                                    <p>{data.tours_title}</p>
                                                                    <p>${data.tours_cost}</p>
                                                                </ToursDetail>
                                                            </ToursBox>
                                                        }

                                                        <p>{data.content}</p>
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
    // get_tours_detail: data => dispatch(get_tours_detail(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatPage);