import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/auth-reducer'
import productReducer from './product/product-reducer'

const persistConfig = {
    key: "toor",
    storage: storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
})

export default persistReducer(persistConfig, rootReducer)