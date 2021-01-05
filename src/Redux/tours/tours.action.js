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
    const post = await Post(link('guides'), data)

    dispatch({ type: toursType.set_tours_guides, data: post.data })
    return post.data
}

export const get_tours_agency = (data) => async dispatch => {
    const post = await Post(link('agency'), data)

    dispatch({ type: toursType.set_tours_agency, data: post.data })
    return post.data
}

export const get_filter_tours = (data) => async dispatch => {
    const post = await Post(link('/agency/filter'), data)
    return post.data
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
    const post = await Post(link('request'), data)
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

export const get_booking_list = (data) => async dispatch => {
    const get = await Get(link("booking-list"))
    return get.data
}


export const post_agency_request = (data) => async dispatch => {
    const post = await Post(link("request/agency"), data)
    return post.data
}

export const send_comment_booking = (data) => async dispatch => {
    const post = await Post(link('comments/bookings'), data)
    return post.data
}

export const send_comment_requests = (data) => async dispatch => {
    const post = await Post(link('comments/requests'), data)
    return post.data
}