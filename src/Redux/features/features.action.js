import { Post } from '../../Constants/request'


export const featuresType = {
    set_io_connection: "SET_IO_CONNECTION"
}

const link = endpoint => {
    return `features/${endpoint}`
}


export const get_user_location = (data) => async (dispatch) => {
    const post = await Post(link('track'), { reqId: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })

    return post.data
}

export const update_user_location = (data) => async (dispatch) => {
    const post = await Post(link('track/update'), data.location, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })


    return post.data
}

export const chats_send_message = (data) => async dispatch => {
    const post = await Post(link('chats/send'), data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const chats_fetch_message = (data) => async dispatch => {
    const post = await Post(link('chats'), data.id, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const chats_person_list = (data) => async dispatch => {
    const post = await Post(link('chats/list'), { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}


export const get_location_data = (data) => async (dispatch) => {
    const post = await Post(link('location'), data)
    return post.data
}


export const set_io_connection = (data) => async (dispatch) => {
    dispatch({ type: featuresType.set_io_connection, data: data })
}

