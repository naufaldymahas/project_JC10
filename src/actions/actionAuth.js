import API from '../services/'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import moment from 'moment'
const cookies = new Cookies()

const type = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    IS_LOGIN: 'IS_LOGIN',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGIN_CART: 'LOGIN_CART'
}

export const onLogin = (email, password) => {
    return dispatch => {
        let params = {
            email,
            password
        }
        API.loginHandler(params)
        .then(res => {
            console.log(res)
            let { status, message } = res.data
            if (status === 404) {
                Swal.fire({
                    type: 'error',
                    title: message
                })
            } else if (status === 401) {
                Swal.fire({
                    type: 'error',
                    title: message
                })
            } else {
                console.log(res.data)
                let { id, fullName, isVerified, role } = res.data.result[0]
                Swal.fire({
                    type: 'success',
                    title: 'Login Success!'
                })
                API.getCart({id})
                .then(res => {
                    let products = res.data
                    let total = 0
                    products.map(product => {
                        total += product.productPrice * product.quantity
                    })
                    dispatch({
                        type: type.LOGIN_CART,
                        payload: {
                            products,
                            total
                        }
                    })
                    cookies.set('cart', { products, total }, { path: '/', expires: new Date(moment().add(8, 'h').format('YYYY-MM-DDTkk:mm:ss.SSS')+ 'Z') })
                })
                cookies.set('user', { id, fullName, email, isVerified, role }, { path: '/' })
                dispatch({
                    type: type.LOGIN_SUCCESS,
                    payload: {
                        id,
                        fullName,
                        email,
                        isVerified,
                        role
                    }
                })
            }
        })
        
    }
}

export const isLogin = (id, fullName, email, isVerified, role) => {
    return (
        {
            type: type.IS_LOGIN,
            payload: {
                id,
                fullName, 
                email,
                isVerified,
                role
            }
        }
    )
}

export const changeBiodata = (id, fullName, email, isVerified, role) => {
    return dispatch => {
        cookies.set('user', { id, fullName, email, isVerified, role }, { path: '/' })
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: {
                id,
                fullName,
                email
            }
        })
    }
}

export const onLogout = () => {
    return dispatch => {
        cookies.remove('user')
        dispatch({
            type: type.LOGOUT_SUCCESS
        })
    }
}

export const loginAfterRegister = (id, email, fullName, isVerified) => {
    return dispatch => {
        cookies.set('user', { id, fullName, email, isVerified, role: 'user' }, { path: '/' })
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: {
                id,
                fullName,
                email,
                isVerified,
                role: 'user'
            }
        })
    }
}