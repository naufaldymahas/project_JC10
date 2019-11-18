import Cookies from "universal-cookie"
import API from '../services'
import Swal from 'sweetalert2'

const type = {
    ADD_ORDER: 'ADD_ORDER',
    PLUS_ORDER: 'PLUS_ORDER',
    MINUS_ORDER: 'MINUS_ORDER',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    COOKIE_PRODUCT: 'COOKIE_PRODUCT',
    CLEAR_PRODUCT: 'CLEAR_PRODUCT'
}

export const addToCart = (id, productName, productPrice, productImg, productUnit, productDiscount, userId) => {
    return dispatch => {
        API.addCart({data: {id, userId}})
        .then(res => {
            console.log(res)
            Swal.fire({
                type: "success",
                title: res.data.message,
                timer: 3000
            })
        })

        dispatch ({
            type: type.ADD_ORDER,
            payload: {
                id, productName, productPrice, productImg, productUnit, productDiscount
            }
        })
    }
}

export const cartHandler = (cond, id, productPrice, quantity, userId, cart) => {
    console.log('ini userId', userId)
    return dispatch => {
        if (!cart) {
            if (cond === 'plus') {
                let qty = quantity + 1
                let data = {
                    id, quantity: qty, userId
                }
                API.carthandler(data)
                dispatch({
                    type: type.PLUS_ORDER,
                    payload: {
                        id, productPrice
                    }
                })
            } else {
                let qty = quantity - 1
                console.log('ini quantity', quantity)
                let data = {
                    id, quantity: qty, userId
                }
                if (qty === 0) {
                    API.carthandler({...data, remove: 1})
                    .then(res => {
                        Swal.fire({
                            type: "success",
                            title: 'Item telah dihapus dari cart!',
                            timer: 3000
                        })
                    })
                    dispatch({
                        type: type.MINUS_ORDER,
                        payload: {
                            id, productPrice
                        }
                    })
                } else {
                    API.carthandler(data)
                    dispatch({
                        type: type.MINUS_ORDER,
                        payload: {
                            id, productPrice
                        }
                    })
                }
            }
        } else {
            if (cond === 'plus') {
                console.log(quantity)
                let data = {
                    id, quantity, userId
                }
                API.carthandler(data)
                dispatch({
                    type: type.PLUS_ORDER,
                    payload: {
                        id, productPrice
                    }
                })
            } else {
                console.log(quantity)
                let data = {
                    id, quantity, userId
                }
                if (quantity === 0) {
                    API.carthandler({...data, remove: 1})
                    .then(res => {
                        Swal.fire({
                            type: "success",
                            title: 'Item telah dihapus dari cart!',
                            timer: 3000
                        })
                    })
                    dispatch({
                        type: type.MINUS_ORDER,
                        payload: {
                            id, productPrice
                        }
                    })
                } else {
                    API.carthandler(data)
                    dispatch({
                        type: type.MINUS_ORDER,
                        payload: {
                            id, productPrice
                        }
                    })
                }
            }
        }
    }
}

export const removeProduct = (id, userId) => {
    return dispatch => {
        console.log(userId)
        API.removeCart({
            id, userId
        })
        .then(res => {
            Swal.fire({
                type: "success",
                title: res.data.message,
                timer: 3000
            })
        })
        dispatch({
            type: type.REMOVE_PRODUCT,
            payload: {
                id
            }
        })
    }
}

export const cookieProduct = (product, total) => {
    return {
        type: type.COOKIE_PRODUCT,
        payload: {
            product,
            total
        }
    }
}

export const clearProduct = () => {
    return dispatch => {
        const cookies = new Cookies()
        cookies.remove('cart')
        dispatch({
            type: type.CLEAR_PRODUCT
        })
    }
}