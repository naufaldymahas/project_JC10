const type = {
    ADD_ORDER: 'ADD_ORDER',
    PLUS_ORDER: 'PLUS_ORDER',
    MINUS_ORDER: 'MINUS_ORDER',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    COOKIE_PRODUCT: 'COOKIE_PRODUCT'
}

export const addToCart = (id, productName, productPrice, productImg, productUnit, productDiscount) => {
    return {
        type: type.ADD_ORDER,
        payload: {
            id, productName, productPrice, productImg, productUnit, productDiscount
        }
    }
}

export const cartHandler = (cond, id, productPrice) => {
    if (cond === 'plus') {
        return {
            type: type.PLUS_ORDER,
            payload: {
                id, productPrice
            }
        }
    } else {
        return {
            type: type.MINUS_ORDER,
            payload: {
                id, productPrice
            }
        }
    }
}

export const removeProduct = (id) => {
    return {
        type: type.REMOVE_PRODUCT,
        payload: {
            id
        }
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