import axios from 'axios'

const API = "http://localhost:1234/product"

export const add_product = (data) => (dispatch) => {

    return axios.post(`${API}/add`, data.form, {
        headers: {
            // 'content-type': `multipart/form-data; boundary=${data._boundary}`,
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const edit_product = (data) => dispatch => {
    return axios.post(`${API}/edit`, data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const get_product = (data) => dispatch => {
    return axios.get(`${API}/fetch`)
        .then(res => {
            return res.data
        })
}

export const get_product_detail = (data) => dispatch => {
    return axios.post(`${API}/details`, { id: data.id })
        .then(res => {
            return res.data
        })
}

export const get_product_dashboard = (data) => (dispatch) => {
    return axios.get(`${API}/dashboard`, {
        headers: {
            "Authorization": `Bearer ${data}`
        }
    })
        .then(res => {
            dispatch({ type: 'SET_PRODUCT_DASHBOARD', data: res.data })
            return res.data
        })
}

export const get_product_dashboard_detail = (data) => dispatch => {
    return axios.post(`${API}/detail`, { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const get_approval_management = (data) => dispatch => {
    return axios.post(`${API}/approval`, { action: data.action }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const delete_product = (data) => dispatch => {
    return axios.post(`${API}/delete`, { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const post_request = (data) => dispatch => {
    return axios.post(`${API}/request`, data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const add_message = (data) => dispatch => {
    return axios.post(`${API}/chats`, data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}


export const get_friend_list = (data) => dispatch => {
    return axios.post(`${API}/friends`, { id: data.id }, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}

export const get_msg = (data) => dispatch => {
    return axios.post(`${API}/message`, data.id, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}


export const update_approval_status = (data) => dispatch => {
    return axios.post(`${API}/approval-update`, data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
        .then(res => {
            return res.data
        })
}



export const set_id = (data) => (dispatch) => {
    dispatch({ type: 'SET_DASHBOARD_PRODUCT_ID', data: data })
}

export const set_product_id = (data) => (dispatch) => {
    dispatch({ type: 'SET_PRODUCT_ID', data: data })
}
