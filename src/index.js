import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import restaurantReducer from './reducers/restaurantReducer'

const store = createStore(restaurantReducer)

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

renderApp()
store.subscribe(renderApp)