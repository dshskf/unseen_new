import axios from 'axios'
import { API } from '../../Constants/link'

const URL = API + "product"

const Get = async (link, header = null) => {
    if (header) {
        return await axios.get(`${URL}/${link}`, header)
    }
    return await axios.get(`${URL}/${link}`)
}

const Post = async (link, data, header = null) => {
    if (header) {
        return await axios.post(`${URL}/${link}`, data, header)
    }
    return await axios.post(`${URL}/${link}`, data)
}



export const add_product = (data) => async (dispatch) => {
    const post = await Post("add", data.form, {
        headers: {            
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const edit_product = (data) => async dispatch => {
    const post = await Post("edit", data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const get_product = (data) => async dispatch => {
    const get = await Get('fetch')
    return get.data
}

export const get_product_detail = (data) => async dispatch => {
    const post = await Post('details', { id: data.id })
    return post.data
}

export const get_product_dashboard = (data) => async (dispatch) => {
    const get = await Get('dashboard', {
        headers: {
            "Authorization": `Bearer ${data}`
        }
    })

    dispatch({ type: 'SET_PRODUCT_DASHBOARD', data: get.data })
    return get.data
}

export const get_product_dashboard_detail = (data) => async dispatch => {
    const post = await Post("detail", { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const get_approval_management = (data) => async dispatch => {
    const post = await Post('approval', { action: data.action }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const delete_product = (data) => async dispatch => {
    const post = await Post('delete', { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const post_request = (data) => async dispatch => {
    const post = await Post('request', data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const add_message = (data) => async dispatch => {
    const post = await Post('chats', data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}


export const get_friend_list = (data) => async dispatch => {
    const post = await Post('friends', { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const get_msg = (data) => async dispatch => {
    const post = await Post('message', data.id, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}


export const update_approval_status = (data) => async dispatch => {
    const post = await Post('approval-update', data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}



export const set_id = (data) => async (dispatch) => {
    dispatch({ type: 'SET_DASHBOARD_PRODUCT_ID', data: data })
}

export const set_product_id = (data) => async (dispatch) => {
    dispatch({ type: 'SET_PRODUCT_ID', data: data })
}
