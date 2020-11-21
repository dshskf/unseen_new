import React from 'react'
import ChatPage from './chat/chat'
import Sidebar from '../../Components/Sidebar/sidebar'

import { Body } from '../style.route'
import { storage } from '../../Constants/request'
import { URI } from '../../Constants/link'

const Chats = props => {
    return storage ? (
        <Body>
            <Sidebar page={"chats"} />
            <ChatPage />
        </Body>
    )
        :
        window.location.href = URI
}

export default Chats