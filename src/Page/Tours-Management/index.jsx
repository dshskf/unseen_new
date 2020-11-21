import React from 'react'
import { URI } from '../../Constants/link'
import { storage } from '../../Constants/request'
import { default as AddTours } from './Add/add'
import { default as EditTours } from './Edit/edit'
import { default as ListTours } from './List/ads'

const EditProfilePage = props => {
    const { method, adsId } = props.match.params

    if (storage) {
        if (method === 'add') {
            return (<AddTours />)
        } else if (method === 'edit') {
            return (<EditTours adsId={adsId} />)
        } else if (method === 'list') {
            return (<ListTours />)
        } else {

        }
    } else {
        window.location.href = URI
    }
}

export default EditProfilePage