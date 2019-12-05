import React from 'react'

const Websites = ({restaurants}) => {
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