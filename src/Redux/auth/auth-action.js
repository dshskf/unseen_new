import axios from 'axios'
import { API } from '../../Constants/link'

export const authType = {
    set_token: "SET_TOKEN",
    sign_in: "SIGN_IN",
    sign_up: "SIGN_UP",
    sign_out: "SIGN_OUT",
    send_email: "SEND_EMAIL",
    check_reset: "CHECK_RESET",
    edit_profile: "EDIT_PROFILE",
    set_io_connection: "SET_IO_CONNECTION"
}

const URL = API + "user"

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


export const sign_up = (data) => async (dispatch) => {
    const post = await Post('register', data)
    return post.data
}

export const sign_in = (data) => async (dispatch) => {
    const post = await Post('login', data.data)

    if (post.data.err) {
        return post.data
    }

    if (!post.data.err) {
        localStorage.setItem('login_data', JSON.stringify({ email: post.data.email, token: post.data.token }));
        dispatch({ type: authType.set_token, data: post.data.token })
        dispatch({ type: 'SET_USER', data: post.data.userData })
        return post.data
    }

    dispatch({ type: authType.sign_in, data: post.data })
}

export const sign_out = (data) => async (dispatch) => {
    localStorage.setItem('login_data', JSON.stringify({ token: "-" }));
    dispatch({ type: authType.sign_out, data: null })
    dispatch({ type: authType.set_token, data: "-" })
}

export const check_token = (data) => async (dispatch) => {
    const get = await Get('check-token', {
        headers:
        {
            "Authorization": `Bearer ${data}`
        }
    })

    if (get.data.err) {
        dispatch({ type: authType.sign_out, data: "-" })
        dispatch({ type: "RESPONSE", data: get.data })
        return
    }
    dispatch({ type: authType.set_token, data: data })
    dispatch({ type: authType.sign_in, data: get.data })
    dispatch({ type: "RESPONSE", data: get.data })
    dispatch({ type: 'SET_USER', data: get.data.user })

    return

}

export const send_email = (data) => async (dispatch) => {
    const post = await Post('reset', data)
    return post.data

}

export const check_email = (data) => async (dispatch) => {
    const post = await Post('check-reset', data)
    dispatch({ type: authType.check_reset, data: post.data })
}

export const get_edit_profile = (data) => async (dispatch) => {
    const get = await Get('edit', {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return get.data;
}

export const post_edit_profile = (data) => async (dispatch) => {
    const post = await Post('edit', data.user, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })

    dispatch({ type: authType.edit_profile, data: post.data })
    return post.data
}

export const set_io_connection = (data) => async (dispatch) => {
    dispatch({ type: authType.set_io_connection, data: data })
}


export const get_location_data = (data) => async (dispatch) => {
    const post = await Post('location', data)
    return post.data
}

export const get_track_user_data = (data) => async (dispatch) => {
    const post = await Post('track/user', { reqId: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })

    return post.data
}

export const update_track_user_location = (data) => async (dispatch) => {    
    const post = await Post('track/update', data.location, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })


    return post.data
}