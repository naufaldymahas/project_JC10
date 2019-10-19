import {combineReducers} from 'redux'
import productReducer from './productReducer'
import authReducer from './authReducer'

const reducer = combineReducers(
    {
        productReducer,
        authReducer
    }
)

export default reducer