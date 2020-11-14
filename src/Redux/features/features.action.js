import { Post, Get } from '../../Constants/request'

export const featuresType = {
    set_io_connection: "SET_IO_CONNECTION"
}

const link = endpoint => {
    return `features/${endpoint}`
}


export const get_user_location = (data) => async(dispatch) => {
    const post = await Post(link('track'), data)

    return post.data
}

export const update_user_location = (data) => async(dispatch) => {
    const post = await Post(link('track/update'), data)


    return post.data
}

export const chats_send_message = (data) => async dispatch => {
    const post = await Post(link('chats/send'), data)
    return post.data
}

export const chats_fetch_message = (data) => async dispatch => {
    const post = await Post(link('chats'), data)
    return post.data
}

export const chats_person_list = (data) => async dispatch => {
    const get = await Get(link('chats/list'))
    return get.data
}


export const get_location_data = (data) => async(dispatch) => {
    const post = await Post(link('location'), data)
    return post.data
}


export const set_io_connection = (data) => async(dispatch) => {
    dispatch({ type: featuresType.set_io_connection, data: data })
}