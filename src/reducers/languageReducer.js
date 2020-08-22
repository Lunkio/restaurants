const languageReducer = (state = 'fin', action) => {
    switch (action.type) {
        case 'CHANGE_LANG':
            return action.data
        default: return state
    }
}

export const changeLanguage = (language) => {
    return {
        type: 'CHANGE_LANG',
        data: language
    }
}

export default languageReducer