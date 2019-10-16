export const addToCart = (id, productName, productPrice, productImg) => {
    return {
        type: 'ADD_ORDER',
        payload: {
            id, productName, productPrice, productImg
        }
    }
}

export const cartHandler = (cond, id, productPrice) => {
    if (cond === 'plus') {
        return {
            type: 'PLUS_ORDER',
            payload: {
                id, productPrice
            }
        }
    } else {
        return {
            type: 'MINUS_ORDER',
            payload: {
                id, productPrice
            }
        }
    }
}

export const removeProduct = (id) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: {
            id
        }
    }
}