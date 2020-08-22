import React, { useState, useEffect } from 'react'
import loginService from '../services/loginService'
import restaurantService from '../services/restaurantService'
import RestaurantAdd from './RestaurantControl/RestaurantAdd'
import RestaurantModify from './RestaurantControl/RestaurantModify'
import Websites from './RestaurantControl/Websites'

const Login = () => {
    const [admin, setAdmin] = useState(null)
    const [token, setToken] = useState(null)

    const [addRestaurant, setAddRestaurant] = useState(true)
    const [modifyRestaurant, setModifyRestaurant] = useState(false)
    const [websites, setWebsites] = useState(false)

    useEffect(() => {
        const loggedAdminJSON = window.localStorage.getItem('loggedAdmin')
        if (loggedAdminJSON) {
            const loggedAdmin = JSON.parse(loggedAdminJSON)
            setAdmin(loggedAdmin)
            setToken(loggedAdmin.token)
            restaurantService.setToken(loggedAdmin.token)
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.pass.value

        try {
            const admin = await loginService.login({ username, password })
            setAdmin(admin)
            setToken(admin.token)
            restaurantService.setToken(admin.token)
            window.localStorage.setItem(
                'loggedAdmin', JSON.stringify(admin)
            )
        } catch (e) {
            console.log('error', e)
            window.alert('Login failed')
        }
    }

    const loginForm = () => {
        return (
            <div className='container'>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label>Username:</label> 
                        <input 
                            id='un'
                            className='form-control'
                            type='text'
                            name='username'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input 
                            id='pw'
                            className='form-control'
                            type='password'
                            name='pass'
                        />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Login</button>
                    </div>
                </form>
            </div>
        )
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedAdmin')
        setAdmin(null)
        setToken(null)
    }

    const setAdd = () => {
        setAddRestaurant(true)
        setModifyRestaurant(false)
        setWebsites(false)
    }
    const setModify = () => {
        setAddRestaurant(false)
        setModifyRestaurant(true)
        setWebsites(false)
    }
    const setWebsite = () => {
        setAddRestaurant(false)
        setModifyRestaurant(false)
        setWebsites(true)
    }

    const restaurantControl = () => {
        return (
            <div className='container'>
                <div className='button-container'>
                    <button className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                    <button className='btn btn-primary' onClick={() => setAdd()}>Add</button>
                    <button className='btn btn-primary' onClick={() => setModify()}>Modify</button>
                    <button className='btn btn-primary' onClick={() => setWebsite()}>Websites</button>
                </div><hr />
                {admin !== null && addRestaurant && <RestaurantAdd token={token} /> }
                {admin !== null && modifyRestaurant && <RestaurantModify token={token} />}
                {admin !== null && websites && <Websites />}
            </div>
        )
    }

    return (
        <div>
            {admin === null && loginForm()}
            {admin && restaurantControl()}
        </div>
    )
}

export default Login