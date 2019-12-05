import React, { useState } from 'react'
import restaurantService from '../../services/restaurantService'

const RestaurantModify = ({ restaurants, token }) => {
    const [showEdit, setShowEdit] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [restaurant, setRestaurant] = useState(null)

    const selectRestaurant = (restaurant) => {
        setRestaurant(restaurant)
        setShowEdit(true)
    }

    const [cow, setCow] = useState('')
    const [pork, setPork] = useState('')
    const [chicken, setChicken] = useState('')
    const [lamb, setLamb] = useState('')
    const [goat, setGoat] = useState('')

    const searchedRestaurants = restaurants.filter(r => r.name.fi.toLowerCase().includes(searchValue))

    const searchRestaurant = () => {
        return (
            <div>
                <div>
                    <h1>Modify</h1>
                    <h5>Search restaurants:</h5>
                    <input 
                        id='search'
                        className='form-control'
                        type='text'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='do not use capital letters'
                    />
                </div>
                <div>
                    {searchedRestaurants.map(r =>
                        <div key={r.id}>
                            {r.name.fi}
                            <button className='btn btn-info edit-button' onClick={() => selectRestaurant(r)}>edit</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const editRestaurant = () => {
        const cowSelector = (value) => { setCow(value) }
        const porkSelector = (value) => { setPork(value) }
        const chickenSelector = (value) => { setChicken(value) }
        const lambSelector = (value) => { setLamb(value) }
        const goatSelector = (value) => { setGoat(value) }

        const modify = (e) => {
            e.preventDefault()

            let originCow = e.target.originCow.value
            let originPork = e.target.originPork.value
            let originChicken = e.target.originChicken.value
            let originLamb = e.target.originLamb.value
            let originGoat = e.target.originGoat.value

            const modifiedMeat = {
                cow: {
                    origin: originCow,
                    alue: cow
                },
                pork: {
                    origin: originPork,
                    alue: pork
                },
                chicken: {
                    origin: originChicken,
                    alue: chicken
                },
                lamb: {
                    origin: originLamb,
                    alue: lamb
                },
                goat: {
                    origin: originGoat,
                    alue: goat
                }
            }

            restaurantService.setToken(token)
            restaurantService.modify(modifiedMeat, restaurant.id)
                .then(result => {
                    //console.log('result', result)
                    if (result.status === 200) {
                        window.alert('Meat modified successfully!')
                        window.location.reload()
                    } else {
                        window.alert('OOOOPS something went wrong')
                    }
                })
        }

        const deleteRestaurant = async (id) => {
            if (window.confirm(`Delete ${restaurant.name.fi}?`)) {
                restaurantService.setToken(token)
                await restaurantService.remove(id)
                window.alert(`Deleted!`)
                window.location.reload()
            } else {
                return
            }            
        }

        return (
            <div className='container'>
                <div className='modifyHeader'>
                    <h2 style={{'display': 'inline'}}>Edit restaurant</h2> <button className='btn btn-danger close-button' onClick={() => setShowEdit(false)}>Close</button>
                </div><hr />
                <h3>{restaurant.name.fi}</h3><br />
                <form onSubmit={modify}>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <h4>Cow</h4>
                            Origin (jos tiedossa) <input id='cowOrigin' name='originCow' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                            Suomi <input id='cowSuomi' type='radio' name='cow' onChange={() => cowSelector('suomi')} /> <br />
                            EU <input id='cowEu' type='radio' name='cow' onChange={() => cowSelector('eu')}/> <br />
                            Non-EU <input id='cowNonEu' type='radio' name='cow' onChange={() => cowSelector('nonEu')}/> <br />
                            Unknown <input id='cowUnknown' type='radio' name='cow' onChange={() => cowSelector('unknown')}/> <br /> <hr />
                        </div>
                        <div className='col-lg-3'>
                            <h4>Pork</h4>
                            Origin (jos tiedossa) <input id='porkOrigin' name='originPork' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                            Suomi <input id='porkSuomi' type='radio' name='pork' onChange={() => porkSelector('suomi')} /> <br />
                            EU <input id='porkEu' type='radio' name='pork' onChange={() => porkSelector('eu')}/> <br />
                            Non-EU <input id='porkNonEu' type='radio' name='pork' onChange={() => porkSelector('nonEu')}/> <br />
                            Unknown <input id='porkUnknown' type='radio' name='pork' onChange={() => porkSelector('unknown')}/> <br /> <hr />
                        </div>
                        <div className='col-lg-3'>
                            <h4>Chicken</h4>
                            Origin (jos tiedossa) <input id='chickenOrigin' name='originChicken' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                            Suomi <input id='chickenSuomi' type='radio' name='chicken' onChange={() => chickenSelector('suomi')} /> <br />
                            EU <input id='chickenEu' type='radio' name='chicken' onChange={() => chickenSelector('eu')}/> <br />
                            Non-EU <input id='chickenNonEu' type='radio' name='chicken' onChange={() => chickenSelector('nonEu')}/> <br />
                            Unknown <input id='chickenUnknown' type='radio' name='chicken' onChange={() => chickenSelector('unknown')}/> <br /> <hr />
                        </div>
                        <div className='col-lg-3'>
                            <h4>Lamb</h4>
                            Origin (jos tiedossa) <input id='lambOrigin' name='originLamb' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                            Suomi <input id='lambSuomi' type='radio' name='lamb' onChange={() => lambSelector('suomi')} /> <br />
                            EU <input id='lambEu' type='radio' name='lamb' onChange={() => lambSelector('eu')}/> <br />
                            Non-EU <input id='lambNonEu' type='radio' name='lamb' onChange={() => lambSelector('nonEu')}/> <br />
                            Unknown <input id='lambUnknown' type='radio' name='lamb' onChange={() => lambSelector('unknown')}/> <br /> <hr />
                        </div>
                        <div className='col-lg-3'>
                            <h4>Goat</h4>
                            Origin (jos tiedossa) <input id='goatOrigin' name='originGoat' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                            Suomi <input id='goatSuomi' type='radio' name='goat' onChange={() => goatSelector('suomi')} /> <br />
                            EU <input id='goatEu' type='radio' name='goat' onChange={() => goatSelector('eu')}/> <br />
                            Non-EU <input id='goatNonEu' type='radio' name='goat' onChange={() => goatSelector('nonEu')}/> <br />
                            Unknown <input id='goatUnknown' type='radio' name='goat' onChange={() => goatSelector('unknown')}/> <br /> <hr />
                        </div>
                    </div>
                    <div className='modify-delete-buttons'>
                        <button id='modify' type='submit' className='btn btn-info'>Modify</button>
                        <button className='btn btn-danger delete-button' onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            {!showEdit && searchRestaurant()}
            {showEdit && editRestaurant()}
        </div>
    )
}

export default RestaurantModify