import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/auth.reducer'
import toursReducer from './tours/tours.reducer'
import featuresReducer from './features/features.reducer'

const persistConfig = {
    key: "toor",
    storage: storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    tours: toursReducer,
    features: featuresReducer,
})

export default persistReducer(persistConfig, rootReducer)