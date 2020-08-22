import restaurantService from '../services/restaurantService'

const restaurantReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_RESTAURANTS':
            return action.data
        default:
            return state
    }
}

export const initializeRestaurants = () => {
    return async dispatch => {
        const restaurants = await restaurantService.getAll();
        dispatch({
            type: 'INITIAL_RESTAURANTS',
            data: restaurants
        })
    }
}

export default restaurantReducer