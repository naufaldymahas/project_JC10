import Get from '../services/'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
const cookies = new Cookies()

const type = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    IS_LOGIN: 'IS_LOGIN',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
}

export const onLogin = (email, password) => {
    return dispatch => {
        let params = {
            email,
            password
        }
        Get.loginHandler(params)
        .then(res => {
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
                let { id, fullName } = res.data.result
                Swal.fire({
                    type: 'success',
                    title: 'Login Success!'
                })
                console.log(id, fullName)
                cookies.set('user', { id, fullName, email }, { path: '/' })
                dispatch({
                    type: type.LOGIN_SUCCESS,
                    payload: {
                        id,
                        fullName,
                        email
                    }
                })
            }
        })
        
    }
}

export const isLogin = (id, fullName, email) => {
    return (
        {
            type: type.IS_LOGIN,
            payload: {
                id,
                fullName, 
                email
            }
        }
    )
}

export const onLogout = () => {
    return (
        {
            type: type.LOGOUT_SUCCESS
        }
    )
}