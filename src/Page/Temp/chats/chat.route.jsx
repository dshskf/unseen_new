import React from 'react'
import ChatPage from './chat/chat'
import Sidebar from '../../../Components/Sidebar/sidebar'

import { Body } from '../style.route'

const Chats = props => {
    return (
        <Body>
            <Sidebar page={"chats"} />
            <ChatPage />
        </Body>
    )
}

export default Chats