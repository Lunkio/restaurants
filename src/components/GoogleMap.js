import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const GoogleMap = (props) => {
    //shows restaurant-info when clicking marker or searching restaurant
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)
    //sets the specific restaurant-info for infowindow
    const [selectedPlace, setSelectedPlace] = useState(null)
    //sets the filter for the meat-buttons
    const [meatSelector, setMeatSelector] = useState('cow')
    //searchvalue for restaurant search
    const [searchValue, setSearchValue] = useState('')
    //when clicking the search result, only one restaurant is showing, however this is needed for showing all the restaurants again (see if -statement down)
    const [searchValueLength, setSearchValueLength] = useState(0)
    //this overrides allRestaurants variable when searching for restaurants
    const [searchResultRestaurant, setSearchResultRestaurant] = useState(null)
    //sets new coordinates for the searchResultRestaurant to center the map
    const [mapCoordinates, setMapCoordinates] = useState({lat: 60.169857, lng: 24.938379})

    // Without this, when you search the first time search for a restaurant, it won't show the infowindow
    useEffect(() => {
        setSelectedPlace(props.restaurants[0])
    }, [props.restaurants])

    const icons = ['/suomi.png', '/eu.png', '/nonEu.png', '/unknown.png']
    let icon = icons[0]

    //Closes the InfoWindow when clicking on the map
    const onMapClicked = () => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false)
        }
    }

    //Shows the InfoWindow when clicking on a marker
    const onMarkerClick = (r) => {
        setSelectedPlace(r)
        setShowingInfoWindow(true)
    }

    let allRestaurants = props.restaurants
    const filteredRestaurants = props.restaurants.filter(r => r.name.fi.toLowerCase().includes(searchValue))
    //console.log('filtered', filteredRestaurants.length)

    //function when clicking a specific restaurant in the search results
    const searchResult = (restaurant) => {
        setSelectedPlace(restaurant)
        setShowingInfoWindow(true)
        setSearchResultRestaurant(restaurant)
        setSearchValue(restaurant.name.fi)
        setSearchValueLength(restaurant.name.fi.length)
        setMapCoordinates({lat: restaurant.location.lat, lng: restaurant.location.lon})
    }

    //these two if-statements are needed when filtering what restaurants are shown on map
    if (searchResultRestaurant !== null) {
        allRestaurants = []
        allRestaurants.push(searchResultRestaurant)
    }
    if (searchValue.length < searchValueLength) {
        allRestaurants = []
        allRestaurants = props.restaurants
        setSearchResultRestaurant(null)
        setSearchValueLength(0)
    }

    //Sets all the restaurants for these variables, JSON-thingy makes them not as shallow copies
    let cowOrigin = JSON.parse(JSON.stringify(allRestaurants))
    let porkOrigin = JSON.parse(JSON.stringify(allRestaurants))
    let chickenOrigin = JSON.parse(JSON.stringify(allRestaurants))
    let lambOrigin = JSON.parse(JSON.stringify(allRestaurants))
    let goatOrigin = JSON.parse(JSON.stringify(allRestaurants))

    // When clicking which meat to show on the map, these will filter so that only specific meat are shown
    if (meatSelector === 'cow') {
        porkOrigin = []
        chickenOrigin = []
        lambOrigin = []
        goatOrigin = []
        cowOrigin = JSON.parse(JSON.stringify(allRestaurants))
    }
    if (meatSelector === 'pork') {
        cowOrigin = []
        chickenOrigin = []
        lambOrigin = []
        goatOrigin = []
        porkOrigin = JSON.parse(JSON.stringify(allRestaurants))
    }
    if (meatSelector === 'chicken') {
        cowOrigin = []
        porkOrigin = []
        lambOrigin = []
        goatOrigin = []
        chickenOrigin = JSON.parse(JSON.stringify(allRestaurants))
    }
    if (meatSelector === 'lamb') {
        cowOrigin = []
        porkOrigin = []
        chickenOrigin = []
        goatOrigin = []
        lambOrigin = JSON.parse(JSON.stringify(allRestaurants))
    }
    if (meatSelector === 'goat') {
        cowOrigin = []
        porkOrigin = []
        chickenOrigin = []
        lambOrigin = []
        goatOrigin = JSON.parse(JSON.stringify(allRestaurants))
    }

    //css classes for meat buttons
    const btnClassCow = meatSelector === 'cow' ? 'btn clickedBtn' : 'btn notClickedBtn'
    const btnClassPork = meatSelector === 'pork' ? 'btn clickedBtn' : 'btn notClickedBtn'
    const btnClassChicken = meatSelector === 'chicken' ? 'btn clickedBtn' : 'btn notClickedBtn'
    const btnClassLamb = meatSelector === 'lamb' ? 'btn clickedBtn' : 'btn notClickedBtn'
    const btnClassGoat = meatSelector === 'goat' ? 'btn clickedBtn' : 'btn notClickedBtn'

    return (
        <div className='container'>
            <div className='upper-part'>
                <div>
                    <h1 className='header'>Lihakartta</h1>
                </div>
                <hr />
                <div className='searchbar'>
                    <p style={{'marginBottom': '0rem', 'fontWeight': '1000'}}>Etsi ravintola:</p>
                    <input 
                        className='form-control'
                        type='text'
                        name='searchRestaurant'
                        value={searchValue.toLowerCase()}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    {filteredRestaurants.length !== 0 && filteredRestaurants.length < props.restaurants.length && 
                        <div className='found-restaurants-container'>{filteredRestaurants.map(r => {
                                return (
                                    <div className='found-restaurants' onClick={() => searchResult(r)} key={r.id}>
                                        <p>{r.name.fi}</p><hr className='divider' />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className='btn-icons-container row'>
                    <div className='description-button-container col-lg-6 col-md-12 col-sm-12'>
                        <div className='description'>
                            <p>Valitse näytettävä liha:</p>
                        </div>
                        <div className='buttons'>
                            <button className={btnClassCow} onClick={() => setMeatSelector('cow')}>Nauta <img src='/cow.svg' style={{width: '1rem'}} alt='cow'/></button>
                            <button className={btnClassPork} onClick={() => setMeatSelector('pork')}>Sika <img src='/pig.svg' style={{width: '1rem'}} alt='pig'/></button>
                            <button className={btnClassChicken} onClick={() => setMeatSelector('chicken')}>Kana <img src='/chicken.svg' style={{width: '1rem'}} alt='chicken'/></button>
                            <button className={btnClassLamb} onClick={() => setMeatSelector('lamb')}>Lammas <img src='/sheep.svg' style={{width: '1rem'}} alt='lamb'/></button>
                            <button className={btnClassGoat} onClick={() => setMeatSelector('goat')}>Vuohi <img src='/goat.svg' style={{width: '1rem'}} alt='goat'/></button>
                        </div>
                    </div>
                    <div className='origin-icons-container col-lg-6 col-md-12 col-sm-12'>
                        <div className='origin'>
                            <p>Lihan alkuperä:</p>
                        </div>
                        <div className='all-icons'>
                            <div className='icons'>
                                <img src={icons[0]} alt='suomi' /><span className='icon-text'>Kotimainen</span>
                            </div>
                            <div className='icons'>
                                <img src={icons[1]} alt='eu' /><span className='icon-text'>EU-alueella</span>
                            </div>
                            <div className='icons'>
                                <img src={icons[2]} alt='noneu' /><span className='icon-text'>EU:n ulkopuolella</span>
                            </div>
                            <div className='icons'>
                                <img src={icons[3]} alt='unknown' /><span className='icon-text'>Ei tiedossa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='map'>
                <Map
                    google={props.google}
                    center={mapCoordinates}
                    initialCenter={{lat: 60.169857, lng: 24.938379}}
                    zoom={15}
                    onClick={() => onMapClicked()}
                >
                    {cowOrigin.map(r => {
                        if (r.meat.cow.suomi === true) {icon = icons[0]}
                        if (r.meat.cow.eu === true) {icon = icons[1]}
                        if (r.meat.cow.nonEu === true) {icon = icons[2]}
                        if (r.meat.cow.unknown === true) {icon = icons[3]}
                        return (
                            <Marker
                                title={r.name.fi}
                                key={r.id} 
                                position={{lat: r.location.lat, lng: r.location.lon}}
                                icon={{url: icon, scaledSize: new window.google.maps.Size(20, 20)}}
                                onClick={() => onMarkerClick(r)}
                            />
                        )
                    })}
                    {porkOrigin.map(r => {
                        if (r.meat.pork.suomi === true) {icon = icons[0]}
                        if (r.meat.pork.eu === true) {icon = icons[1]}
                        if (r.meat.pork.nonEu === true) {icon = icons[2]}
                        if (r.meat.pork.unknown === true) {icon = icons[3]}
                        return (
                            <Marker
                                title={r.name.fi}
                                key={r.id} 
                                position={{lat: r.location.lat, lng: r.location.lon}}
                                icon={{url: icon, scaledSize: new window.google.maps.Size(20, 20)}}
                                onClick={() => onMarkerClick(r)}
                            />
                        )
                    })}
                    {chickenOrigin.map(r => {
                        if (r.meat.chicken.suomi === true) {icon = icons[0]}
                        if (r.meat.chicken.eu === true) {icon = icons[1]}
                        if (r.meat.chicken.nonEu === true) {icon = icons[2]}
                        if (r.meat.chicken.unknown === true) {icon = icons[3]}
                        return (
                            <Marker
                                title={r.name.fi}
                                key={r.id} 
                                position={{lat: r.location.lat, lng: r.location.lon}}
                                icon={{url: icon, scaledSize: new window.google.maps.Size(20, 20)}}
                                onClick={() => onMarkerClick(r)}
                            />
                        )
                    })}
                    {lambOrigin.map(r => {
                        if (r.meat.lamb.suomi === true) {icon = icons[0]}
                        if (r.meat.lamb.eu === true) {icon = icons[1]}
                        if (r.meat.lamb.nonEu === true) {icon = icons[2]}
                        if (r.meat.lamb.unknown === true) {icon = icons[3]}
                        return (
                            <Marker
                                title={r.name.fi}
                                key={r.id} 
                                position={{lat: r.location.lat, lng: r.location.lon}}
                                icon={{url: icon, scaledSize: new window.google.maps.Size(20, 20)}}
                                onClick={() => onMarkerClick(r)}
                            />
                        )
                    })}
                    {goatOrigin.map(r => {
                        if (r.meat.goat.suomi === true) {icon = icons[0]}
                        if (r.meat.goat.eu === true) {icon = icons[1]}
                        if (r.meat.goat.nonEu === true) {icon = icons[2]}
                        if (r.meat.goat.unknown === true) {icon = icons[3]}
                        return (
                            <Marker
                                title={r.name.fi}
                                key={r.id} 
                                position={{lat: r.location.lat, lng: r.location.lon}}
                                icon={{url: icon, scaledSize: new window.google.maps.Size(20, 20)}}
                                onClick={() => onMarkerClick(r)}
                            />
                        )
                    })}

                    {selectedPlace && (
                        <InfoWindow
                            position={{lat: selectedPlace.location.lat, lng: selectedPlace.location.lon}}
                            visible={showingInfoWindow}
                            onClose={() => { setShowingInfoWindow(false) }}
                        >
                            <div className='restaurant-info'>
                                <h5>{selectedPlace.name.fi}</h5>
                                {/* <p><i>{selectedPlace.description.body}</i></p> */}
                                <hr />
                                <p>Nauta, alkuperämaa: <strong>{selectedPlace.meat.cow.origin}</strong></p>
                                <p>Sika, alkuperämaa: <strong>{selectedPlace.meat.pork.origin}</strong></p>
                                <p>Kana, alkuperämaa: <strong>{selectedPlace.meat.chicken.origin}</strong></p>
                                <p>Lammas, alkuperämaa: <strong>{selectedPlace.meat.lamb.origin}</strong></p>
                                <p>Vuohi, alkuperämaa: <strong>{selectedPlace.meat.goat.origin}</strong></p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_KEY)
})(GoogleMap)