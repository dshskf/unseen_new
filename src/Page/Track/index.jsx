import React from 'react'
import { storage } from '../../Constants/request'
import { default as Agency } from './agency/track'
import { default as User } from './users/track'
import { default as Guides } from './guides/track'
import { URI } from '../../Constants/link'

const TrackPage = props => {
    if (storage) {
        if (storage.type_code === 'A') {
            return (<Agency id={props.match.params.id} />)
        } else if (storage.type_code === 'U') {
            return (<User id={props.match.params.id} />)
        } else if (storage.type_code === 'G') {            
            return (<Guides />)
        } else {

        }
    } else {
        window.location.href = URI
    }
}

export default TrackPage