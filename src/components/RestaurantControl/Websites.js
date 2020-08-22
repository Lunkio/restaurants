import React from 'react'
import { useSelector } from 'react-redux'

const Websites = () => {
    const restaurants = useSelector(state => state.restaurants)

    return (
        <div>
            <h1>Websites</h1>
            {restaurants.map(r =>
                <div key={r.id}>
                    <a target='_blank' rel='noreferrer noopener' href={r.info_url}>{r.info_url}</a>
                </div>
            )}
        </div>
    )
}

export default Websites