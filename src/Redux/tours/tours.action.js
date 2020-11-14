import { Get, Post } from '../../Constants/request'

export const toursType = {
    set_tours_agency: 'SET_TOURS_AGENCY',
    set_tours_guides: 'SET_TOURS_GUIDES',
    set_tours_dashboard: 'SET_TOURS_DASHBOARD',
}

const link = endpoint => {
    return `tours/${endpoint}`
}

export const get_tours_guides = (data) => async dispatch => {
    const get = await Get(link('guides'))

    dispatch({ type: toursType.set_tours_guides, data: get.data })
    return get.data
}

export const get_tours_agency = (data) => async dispatch => {
    const get = await Get(link('agency'))

    dispatch({ type: toursType.set_tours_agency, data: get.data })
    return get.data
}


export const get_tours_guides_detail = (data) => async dispatch => {
    const post = await Post(link('guides/details'), { id: data.id })
    return post.data
}

export const get_tours_agency_detail = (data) => async dispatch => {
    const post = await Post(link('agency/details'), { id: data.id })
    return post.data
}

export const post_user_request = (data) => async dispatch => {
    const post = await Post(link('request'), data.form)
    return post.data
}

export const post_user_booking = (data) => async dispatch => {
    const post = await Post(link('booking'), data)
    return post.data
}

export const add_tours = (data) => async (dispatch) => {
    const post = await Post(link("dashboard/add"), data)
    return post.data
}

export const edit_tours = (data) => async dispatch => {
    const post = await Post(link("dashboard/edit"), data)
    return post.data
}

export const delete_tours = (data) => async dispatch => {
    const post = await Post(link('dashboard/delete'), data)
    return post.data
}

export const get_dashboard = (data) => async (dispatch) => {
    const get = await Get(link('dashboard'))

    dispatch({ type: toursType.set_tours_dashboard, data: get.data })
    return get.data
}

export const get_dashboard_detail = (data) => async dispatch => {
    const post = await Post(link("dashboard/details"), data)
    return post.data
}