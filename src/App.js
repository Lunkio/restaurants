import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeRestaurants } from './reducers/restaurantReducer'
import restaurantService from './services/restaurantService'
import Login from './components/Login'
import GoogleMap from './components/GoogleMap'
import GoogleMapEnglish from './components/GoogleMapEnglish'
import finnishFlag from './images/finnish_flag.png'
import ukFlag from './images/uk_flag.png'

const Language = (props) => {
    return (
        <div className='container language'>
            <div className='country-name'>
                <Link className='link' to='/'>
                    Suomeksi <img className='flag' src={finnishFlag} alt='flag of Finland' />
                </Link>
                
            </div>
            <div className='country-name'>
                <Link className='link' to='/en'>
                    In English <img className='flag' src={ukFlag} alt='flag of UK' />
                </Link>
            </div>
        </div>
    )
}

const App = (props) => {

    useEffect(() => {
        restaurantService.getAll()
            .then(restaurants => {
                props.initializeRestaurants(restaurants)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //console.log(props)
    
    return (
        <div>
            <Router>
                <Route exact path='/' render={() => <Language />} />
                <Route exact path='/en' render={() => <Language />} />
                <Route exact path='/' render={() => <GoogleMap restaurants={props.restaurants} />} />
                <Route exact path='/en' render={() => <GoogleMapEnglish restaurants={props.restaurants} />} />
                <Route exact path='/login' render ={() => <Login restaurants={props.restaurants} />} />
            </Router>
            {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        restaurants: state
    }
}

const mapDispatchToProps = {
    initializeRestaurants
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)