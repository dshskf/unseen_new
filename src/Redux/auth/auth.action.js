import { Get, Post } from '../../Constants/request'
// import { encrypt, decrypt } from '../../Constants/aes'

export const authType = {
    set_token: "SET_TOKEN",
    sign_in: "SIGN_IN",
    sign_out: "SIGN_OUT",
}

const link = endpoint => {
    return `auth/${endpoint}`
}


export const sign_in = (data) => async (dispatch) => {
    const post = await Post(link('login'), data.data)

    if (post.data.err) {
        return post.data
    }

    if (!post.data.err) {
        // localStorage.setItem('login_data', JSON.stringify({
        //     id: encrypt(post.data.userData.id),
        //     email: encrypt(post.data.userData.email),
        //     token: encrypt(post.data.token),
        //     type: post.data.type
        // }));
        localStorage.setItem('login_data', JSON.stringify({
            email: post.data.userData.email,
            token: post.data.token,
            type: post.data.type
        }));
        dispatch({ type: authType.set_token, data: post.data.token })
        dispatch({
            type: 'SET_USER',
            data: {
                ...post.data.userData,
                password: null,
                type: data.type
            }
        })
    }

    dispatch({ type: authType.sign_in, data: post.data })
    return post.data
}

export const sign_out = (data) => async (dispatch) => {
    localStorage.removeItem('login_data')
    dispatch({ type: authType.sign_out, data: null })
    dispatch({ type: authType.set_token, data: null })
}

export const check_token = (data) => async (dispatch) => {
    const post = await Post(link('check-token'), { type: data.type })

    if (post.data.err) {        
        localStorage.removeItem('login_data')
        dispatch({ type: authType.sign_out, data: null })
        dispatch({ type: authType.set_token, data: null })
        return
    }

    // dispatch({ type: authType.set_token, data: data })
    dispatch({ type: authType.sign_in, data: post.data })
    dispatch({ type: 'SET_USER', data: post.data.user })

    return

}

export const send_email = (data) => async (dispatch) => {
    const post = await Post(link('reset'), data)
    return post.data

}

export const check_email = (data) => async (dispatch) => {
    const post = await Post(link('reset/check'), data)
    return post.data
}

export const update_password = (data) => async (dispatch) => {
    const post = await Post(link('reset/confirm'), data)
    return post.data
}