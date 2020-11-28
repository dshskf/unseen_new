import { Get, Post } from '../../Constants/request'

const link = endpoint => {
    return `management/${endpoint}`
}

export const get_request = (data) => async dispatch => {
    const post = await Post(link('guides'), data)
    return post.data
}

export const update_request = (data) => async dispatch => {
    const post = await Post(link('guides/update'), data)
    return post.data
}


export const get_booking_agency = (data) => async dispatch => {
    const post = await Post(link('agency'), data)
    return post.data
}

export const update_booking_agency = (data) => async dispatch => {
    const post = await Post(link('agency/update'), data.form)
    return post.data
}



export const get_booking_user = (data) => async dispatch => {
    const post = await Post(link('user'), data)
    return post.data
}

export const update_booking_user = (data) => async dispatch => {
    const post = await Post(link('user/update'), data.form)
    return post.data
}