import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import restaurantReducer from './reducers/restaurantReducer'
import languageReducer from './reducers/languageReducer'

const reducer = combineReducers({
    restaurants: restaurantReducer,
    language: languageReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))