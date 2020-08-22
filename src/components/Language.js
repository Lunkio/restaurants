import React from 'react'
import { useDispatch } from 'react-redux'
import finnishFlag from '../images/finnish_flag.png'
import ukFlag from '../images/uk_flag.png'
import { changeLanguage } from '../reducers/languageReducer'

const Language = () => {
    const dispatch = useDispatch();

    const changeLang = (language) => {
        dispatch(changeLanguage(language))
    }

    return (
        <div className='container language'>
            <div className='country-name'>
                <div className='link' onClick={() => changeLang('fin')}>
                    Suomeksi <img className='flag' src={finnishFlag} alt='flag of Finland' />
                </div>
            </div>
            <div className='country-name'>
                <div className='link' onClick={() => changeLang('en')}>
                    In English <img className='flag' src={ukFlag} alt='flag of UK' />
                </div>
            </div>
        </div>
    )
}

export default Language