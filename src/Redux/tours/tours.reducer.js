import { toursType } from './tours.action'

const INITIAL_STATE = {
    tours_agency: null,
    tours_guides: null,
    tours_dashboard: null,
}


const tours_reducer = (state = INITIAL_STATE, action) => {
    if (action.type === toursType.set_tours_agency) {
        return {
            ...state,
            tours_agency: action.data
        }
    }
    if (action.type === toursType.set_tours_guides) {
        return {
            ...state,
            tours_guides: action.data
        }
    }
    if (action.type === toursType.set_tours_dashboard) {
        return {
            ...state,
            tours_dashboard: action.data
        }
    }

    return state
}

export default tours_reducer



