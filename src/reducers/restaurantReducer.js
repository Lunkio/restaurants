const restaurantReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_RESTAURANTS':
            return action.data
        default:
            return state
    }
}

export const initializeRestaurants = (restaurants) => {
    return {
        type: 'INITIAL_RESTAURANTS',
        data: restaurants
    }
}

export default restaurantReducer