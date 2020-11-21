import React from 'react'
import { storage } from '../../Constants/request'

import { default as Agency } from './agency/agency'
import { default as User } from './user/user'
import { default as Guides } from './guides/guide'
import { URI } from '../../Constants/link'

const EditProfilePage = props => {
    if (storage) {
        if (storage.type_code === 'A') {
            return (<Agency />)
        } else if (storage.type_code === 'U') {
            return (<User />)
        } else if (storage.type_code === 'G') {
            return (<Guides />)
        } else {

        }
    } else {
        window.location.href = URI
    }
}

export default EditProfilePage