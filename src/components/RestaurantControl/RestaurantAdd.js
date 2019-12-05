import React, { useState } from 'react'
import restaurantService from '../../services/restaurantService'
// import dataBase from '../../db.json'

const RestaurantAdd = (props) => {
    const [cow, setCow] = useState('unknown')
    const [pork, setPork] = useState('unknown')
    const [chicken, setChicken] = useState('unknown')
    const [lamb, setLamb] = useState('unknown')
    const [goat, setGoat] = useState('unknown')

    const cowSelector = (value) => { setCow(value) }
    const porkSelector = (value) => { setPork(value) }
    const chickenSelector = (value) => { setChicken(value) }
    const lambSelector = (value) => { setLamb(value) }
    const goatSelector = (value) => { setGoat(value) }

    const addRestaurant = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const url = e.target.url.value
        const latitude = Number(e.target.latitude.value)
        const longitude = Number(e.target.longitude.value)
        const address = e.target.address.value
        const zip = e.target.zip.value
        const city = e.target.city.value
        const description = e.target.description.value
        let originCow = e.target.originCow.value
        let originPork = e.target.originPork.value
        let originChicken = e.target.originChicken.value
        let originLamb = e.target.originLamb.value
        let originGoat = e.target.originGoat.value

        if (originCow === '' && cow !== 'suomi') { originCow = 'tuntematon' }
        if (originPork === '' && pork !== 'suomi') { originPork = 'tuntematon' }
        if (originChicken === '' && chicken !== 'suomi') { originChicken = 'tuntematon' }
        if (originLamb === '' && lamb !== 'suomi') { originLamb = 'tuntematon' }
        if (originGoat === '' && goat !== 'suomi') { originGoat = 'tuntematon' }
        if (originCow === '' && cow === 'suomi') { originCow = 'Suomi'}
        if (originPork === '' && pork === 'suomi') { originPork = 'Suomi'}
        if (originChicken === '' && chicken === 'suomi') { originChicken = 'Suomi'}
        if (originLamb === '' && lamb === 'suomi') { originLamb = 'Suomi'}
        if (originGoat === '' && goat === 'suomi') { originGoat = 'Suomi'}

        const newRestaurant = {
            name: {
                fi: name
            },
            location: {
                lat: latitude,
                lon: longitude,
                address: {
                    street_address: address,
                    postal_code: zip,
                    locality: city
                }
            },
            description: {
                body: description
            },
            info_url: url,
            cow: {
                origin: originCow,
                suomi: cow === 'suomi',
                eu: cow === 'eu',
                nonEu: cow === 'nonEu',
                unknown: cow === 'unknown'
            },
            pork: {
                origin: originPork,
                suomi: pork === 'suomi',
                eu: pork === 'eu',
                nonEu: pork === 'nonEu',
                unknown: pork === 'unknown'
            },
            chicken: {
                origin: originChicken,
                suomi: chicken === 'suomi',
                eu: chicken === 'eu',
                nonEu: chicken === 'nonEu',
                unknown: chicken === 'unknown'
            },
            lamb: {
                origin: originLamb,
                suomi: lamb === 'suomi',
                eu: lamb === 'eu',
                nonEu: lamb === 'nonEu',
                unknown: lamb === 'unknown'
            },
            goat: {
                origin: originGoat,
                suomi: goat === 'suomi',
                eu: goat === 'eu',
                nonEu: goat === 'nonEu',
                unknown: goat === 'unknown'
            }
        }
        
        restaurantService.setToken(props.token)
        restaurantService.add(newRestaurant)
            .then(result => {
                //console.log('thenin result', result)
                if (result.status === 200) {
                    window.alert('Restaurant added successfully!')
                    window.location.reload()
                } else {
                    window.alert('OOOOPS something went wrong')
                }
            })
    }

    //Adds all restaurants from db.json -file
    // const addAll = async () => {
    //     for (let i = 0; i < dataBase.data.length; i++) {
    //         dataBase.data[i].cow = {
    //             origin: 'tuntematon',
    //             suomi: false,
    //             eu: false,
    //             nonEu: false,
    //             unknown: true
    //         }
    //         dataBase.data[i].pork = {
    //             origin: 'tuntematon',
    //             suomi: false,
    //             eu: false,
    //             nonEu: false,
    //             unknown: true
    //         }
    //         dataBase.data[i].chicken = {
    //             origin: 'tuntematon',
    //             suomi: false,
    //             eu: false,
    //             nonEu: false,
    //             unknown: true
    //         }
    //         dataBase.data[i].lamb = {
    //             origin: 'tuntematon',
    //             suomi: false,
    //             eu: false,
    //             nonEu: false,
    //             unknown: true
    //         }
    //         dataBase.data[i].goat = {
    //             origin: 'tuntematon',
    //             suomi: false,
    //             eu: false,
    //             nonEu: false,
    //             unknown: true
    //         }
    //         await restaurantService.add(dataBase.data[i])
    //     }
    //     window.alert('ready')
    // }

    return (
        <div className='container'>
            <div className='addHeader'>
                <h1 style={{'display': 'inline'}}>Add restaurant</h1> <p style={{'fontWeight': 200, 'display': 'inline'}}>(* = pakollinen kenttä)</p>
            </div><br />
            <form onSubmit={addRestaurant}>
                <div className='form-row'>
                    <div className='form-group col-md-3'>
                        <label>Name*</label>
                        <input id='name' name='name' className='form-control' placeholder='Name*' required />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>Url</label>
                        <input id='url' name='url' className='form-control' placeholder='Url' />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>Latitude*</label>
                        <input id='latitude' name='latitude' className='form-control' placeholder='Latitude*' required />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>Longitude*</label>
                        <input id='longitude' name='longitude' className='form-control' placeholder='Longitude*' required />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-3'>
                        <label>Address</label>
                        <input name='address' className='form-control' placeholder='Address' />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>Zip</label>
                        <input name='zip' className='form-control' placeholder='Zip' />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>City</label>
                        <input name='city' className='form-control' placeholder='City' />
                    </div>
                    <div className='form-group col-md-3'>
                        <label>Description</label>
                        <input name='description' className='form-control' placeholder='Description' />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-lg-3'>
                        <h4>Cow</h4>
                        Origin (jos tiedossa) <input id='cowOrigin' name='originCow' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                        Suomi <input id='cowSuomi' type='radio' name='cow' onChange={() => cowSelector('suomi')} /> <br />
                        EU <input id='cowEu' type='radio' name='cow' onChange={() => cowSelector('eu')}/> <br />
                        Non-EU <input id='cowNonEu' type='radio' name='cow' onChange={() => cowSelector('nonEu')}/> <br />
                        Unknown <input id='cowUnknown' defaultChecked type='radio' name='cow' onChange={() => cowSelector('unknown')}/> <br /> <hr />
                    </div>
                    <div className='col-lg-3'>
                        <h4>Pork</h4>
                        Origin (jos tiedossa) <input id='porkOrigin' name='originPork' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                        Suomi <input id='porkSuomi' type='radio' name='pork' onChange={() => porkSelector('suomi')} /> <br />
                        EU <input id='porkEu' type='radio' name='pork' onChange={() => porkSelector('eu')}/> <br />
                        Non-EU <input id='porkNonEu' type='radio' name='pork' onChange={() => porkSelector('nonEu')}/> <br />
                        Unknown <input id='porkUnknown' defaultChecked type='radio' name='pork' onChange={() => porkSelector('unknown')}/> <br /> <hr />
                    </div>
                    <div className='col-lg-3'>
                        <h4>Chicken</h4>
                        Origin (jos tiedossa) <input id='chickenOrigin' name='originChicken' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                        Suomi <input id='chickenSuomi' type='radio' name='chicken' onChange={() => chickenSelector('suomi')} /> <br />
                        EU <input id='chickenEu' type='radio' name='chicken' onChange={() => chickenSelector('eu')}/> <br />
                        Non-EU <input id='chickenNonEu' type='radio' name='chicken' onChange={() => chickenSelector('nonEu')}/> <br />
                        Unknown <input id='chickenUnknown' defaultChecked type='radio' name='chicken' onChange={() => chickenSelector('unknown')}/> <br /> <hr />
                    </div>
                    <div className='col-lg-3'>
                        <h4>Lamb</h4>
                        Origin (jos tiedossa) <input id='lambOrigin' name='originLamb' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                        Suomi <input id='lambSuomi' type='radio' name='lamb' onChange={() => lambSelector('suomi')} /> <br />
                        EU <input id='lambEu' type='radio' name='lamb' onChange={() => lambSelector('eu')}/> <br />
                        Non-EU <input id='lambNonEu' type='radio' name='lamb' onChange={() => lambSelector('nonEu')}/> <br />
                        Unknown <input id='lambUnknown' defaultChecked type='radio' name='lamb' onChange={() => lambSelector('unknown')}/> <br /> <hr />
                    </div>
                    <div className='col-lg-3'>
                        <h4>Goat</h4>
                        Origin (jos tiedossa) <input id='goatOrigin' name='originGoat' placeholder='jos Suomi, jätä tyhjäksi' /> <br />
                        Suomi <input id='goatSuomi' type='radio' name='goat' onChange={() => goatSelector('suomi')} /> <br />
                        EU <input id='goatEu' type='radio' name='goat' onChange={() => goatSelector('eu')}/> <br />
                        Non-EU <input id='goatNonEu' type='radio' name='goat' onChange={() => goatSelector('nonEu')}/> <br />
                        Unknown <input id='goatUnknown' defaultChecked type='radio' name='goat' onChange={() => goatSelector('unknown')}/> <br /> <hr />
                    </div>
                </div>
                <button type='submit' className='btn btn-info add-button'>Add Restaurant</button>
            </form>
            {/* This button adds all restaurants from db.json -file */}
            {/* <button onClick={() => addAll()}>Add All</button> */}
        </div>
    )

}

export default RestaurantAdd