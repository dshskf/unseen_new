import { featuresType } from './features.action'

const INITIAL_STATE = {
    io: null
}

const featuresReducer = (state = INITIAL_STATE, action) => {
    if (action.type === featuresType.set_io_connection) {
        return {
            ...state,
            io: action.data
        }
    }

    return state
}

export default featuresReducer