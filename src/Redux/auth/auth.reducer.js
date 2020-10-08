import { authType } from './auth.action'

const INITIAL_STATE = {
    response: null,
    token: null,
    isLogin: false,
    user_data: null,
    io: null
}

const authReducer = (state = INITIAL_STATE, action) => {

    if (action.type === authType.sign_in) {
        return {
            ...state,
            isLogin: true,
            response: action.data
        }
    }

    if (action.type === authType.set_token) {
        return {
            ...state,
            token: action.data
        }
    }

    if (action.type === authType.sign_out) {
        return {
            ...state,
            isLogin: false
        }
    }

    if (action.type === "SET_USER") {
        return {
            ...state,
            user_data: action.data
        }
    }

    if (action.type === authType.set_io_connection) {
        return {
            ...state,
            io: action.data
        }
    }    

    return state
}

export default authReducer