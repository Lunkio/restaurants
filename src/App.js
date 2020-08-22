import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeRestaurants } from './reducers/restaurantReducer'
import Login from './components/Login'
import Language from './components/Language'
import GoogleMap from './components/GoogleMap'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(initializeRestaurants())
        }
        fetchData();
    }, [dispatch])
    
    return (
        <div>
            <Router>
                <Route exact path='/' render={() => <Language />} />
                <Route exact path='/' render={() => <GoogleMap />} />
                <Route exact path='/login' render ={() => <Login />} />
            </Router>
            <div className='container disclaimer'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}

export default App