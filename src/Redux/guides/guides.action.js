import { Get, Post } from '../../Constants/request'

const link = endpoint => {
    return `guides/${endpoint}`
}

export const sign_up = (data) => async (dispatch) => {
    const post = await Post(link('register'), data)
    return post.data
}

export const get_edit_profile = (data) => async (dispatch) => {
    const get = await Get(link('edit'), {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return get.data;
}

export const post_edit_profile = (data) => async (dispatch) => {
    const post = await Post(link('edit'), data.user, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    
    return post.data
}

