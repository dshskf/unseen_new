import React from 'react'
import { URI } from '../../Constants/link'
import { storage } from '../../Constants/request'
import { default as Guides } from './guides/guides'
import { default as Agency } from './agency/agency'
import { default as User } from './user/user'


const Request = () => {
    if (storage) {
        if (storage.type_code === 'A') {
            return (<Agency />)
        } else if (storage.type_code === 'U') {
            return (<User />)
        } else if (storage.type_code === 'G') {
            return (<Guides />)
        }
        else {
        }
    } else {
        window.location.href = URI
    }
}

export default Request