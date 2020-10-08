import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { chats_person_list, chats_fetch_message, chats_send_message } from '../../../../Redux/features/features.action'
// import { get_tours_detail } from '../../../../Redux/tours/tours.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { pullSocket } from '../../../../Redux/features/features.selector'

import { getImg } from '../../../../Constants/get-img'
import { AiOutlineSend, AiOutlineClose } from 'react-icons/ai'
import { API } from '../../../../Constants/link'

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
    let [lastMessage, setLastMessage] = useState(false)
    const [activeId, setActiveId] = useState({
        receiver: '',
        friendName: ''
    })

    const messageEnd = useRef(null)
    const isScroll = useRef(false)

    useEffect(() => {
        if (!props.socket) {
            props.history.push('/')
        }

        props.socket.on('msg_response', async data => {
            const d = new Date()
            const dateNow = `T${d.getHours()}:${d.getMinutes()}`

            await req()

            await setMessage(lastData => [
                ...lastData,
                {
                    ...data,
                    createdAt: dateNow
                }
            ])

            if (isScroll.current) {
                messageEnd.current.scrollIntoView({ behavior: "smooth", block: 'start' });
            }
        })

        const req = async () => {
            const post = await props.chats_person_list({
                id: props.user.id,
                token: props.token
            })

            post.last_message.map(last_msg => {
                last_msg.content = checkMessageLength(last_msg.content)
                return last_msg
            })

            setLastMessage(post.last_message)
            setFriendList(post.data)
        }

        if (props.user) {
            req()
        }
    }, [])

    const checkMessageLength = msg => {
        return msg.length > 30 ? msg.substr(0, 30) + "..." : msg
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

        const req = await props.chats_fetch_message({
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

        isScroll.current = true
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


        lastMessage = await lastMessage.map(msg => {
            console.log("Receiver :")
            console.log([msg.receiver_id, userData.receiver_id])
            console.log("Sender :")
            console.log([msg.sender_id, userData.sender_id])
            if (msg.receiver_id.toString() === userData.receiver_id.toString() || msg.receiver_id.toString() === userData.sender_id.toString()) {
                msg.content = checkMessageLength(input)
            }
            return msg
        })

        await setLastMessage(lastMessage)
        await setMessage(lastData => [...lastData, { ...dataToSubmit, createdAt: dateNow }])
        setInput('')

        const req = await props.chats_send_message({
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
                            <p>{activeId.friendName}</p>
                        </ChatTitle>
                        <Box>
                            {
                                message ?
                                    message.map((data, index) => {
                                        let img = data.notification ?
                                            API + data.prod_data.image[0].replace('\\', '/')
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

                                                        <img src={userData.friend_image ? API + userData.friend_image : getImg("Account", "guest.png")} />
                                                    </RightText>
                                                </BoxRight>
                                                :
                                                <LeftText key={index} ref={index === message.length - 1 ? messageEnd : null}>
                                                    <img src={userData.user_image ? API + userData.user_image : getImg("Account", "guest.png")} />
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
    chats_person_list: data => dispatch(chats_person_list(data)),
    chats_fetch_message: data => dispatch(chats_fetch_message(data)),
    chats_send_message: data => dispatch(chats_send_message(data)),
    // get_tours_detail: data => dispatch(get_tours_detail(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatPage);