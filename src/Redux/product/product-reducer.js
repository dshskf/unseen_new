const INITIAL_STATE = {
    product: null,
    product_dashboard: null,
    fetch_id: null
}


const product_reducer = (state = INITIAL_STATE, action) => {
    if (action.type === "SET_PRODUCT_DASHBOARD") {
        return {
            ...state,
            product_dashboard: action.data
        }
    }

    if (action.type === "SET_DASHBOARD_PRODUCT_ID") {
        return {
            ...state,
            fetch_id: action.data
        }
    }
    
    return state
}

export default product_reducer



