const init = {
    fullName: '',
    email: ''
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case 'IS_LOGIN':
            return {...state, fullName: action.payload.fullName, email: action.payload.email}
        case 'LOGIN_SUCCESS':
            return {...state, fullName: action.payload.fullName, email: action.payload.email}
        case 'LOGOUT_SUCCESS':
            return {...state, fullName: '', email: ''}
        default:
            return state
    }
}

export default authReducer