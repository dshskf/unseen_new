import { Post } from '../../Constants/request'
import { storage } from '../../Constants/request'

const link = endpoint => {
    return `management/${endpoint}`
}


export const get_approval = (data) => async dispatch => {
    const post = await Post(link('approval'), { action: data.action }, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}

export const get_booking_guides = (data) => async dispatch => {
    const post = await Post(link('approval'), { action: data.action }, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}

export const update_booking_guides = (data) => async dispatch => {
    const post = await Post(link('approval/update'), data.form, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}


export const get_booking_agency = (data) => async dispatch => {
    const post = await Post(link('agency'), { action: data.action }, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}

export const update_booking_agency = (data) => async dispatch => {
    const post = await Post(link('agency/update'), data.form, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}



export const get_booking_user = (data) => async dispatch => {
    const post = await Post(link('user'), data, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}

export const update_booking_user = (data) => async dispatch => {
    const post = await Post(link('user/update'), data.form, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}



export const update_approval = (data) => async dispatch => {
    const post = await Post(link('approval/update'), data.form, {
        headers: {
            "Authorization": `Bearer ${storage.token}`
        }
    })
    return post.data
}
