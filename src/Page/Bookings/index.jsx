import React from 'react'
import { URI } from '../../Constants/link'
import { storage } from '../../Constants/request'
import { default as Agency } from './agency/agency'
import { default as User } from './user/user'


const Bookings = () => {
    if (storage) {
        if (storage.type_code === 'A') {
            return (<Agency />)
        } else if (storage.type_code === 'U') {
            return (<User />)
        }
        else {

        }
    } else {
        window.location.href = URI
    }
}

export default Bookings