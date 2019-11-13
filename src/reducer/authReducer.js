const init = {
    id: '',
    fullName: '',
    email: '',
    isVerified: '',
    role: ''
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case 'IS_LOGIN':
            return {...state, id: action.payload.id, fullName: action.payload.fullName,
                email: action.payload.email, isVerified: action.payload.isVerified, role: action.payload.role}
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, fullName: action.payload.fullName,
                email: action.payload.email, isVerified: action.payload.isVerified, role: action.payload.role}
        case 'LOGOUT_SUCCESS':
            return {...state, fullName: '', email: '', isVerified: '', role: ''}
        default:
            return state
    }
}

export default authReducer