const init = {
    addedProduct: [],
    total: 0,
}

var remove, product, newValue, newTotal, clearProduct, clearTotal, totalCart;

const productReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_CART':
            console.log(action.payload)
            return {...state, addedProduct: action.payload.products, total: action.payload.total}
        case 'COOKIE_PRODUCT':
            return {...state, addedProduct: action.payload.product, total: action.payload.total}
        case 'ADD_ORDER':
            if (state.addedProduct.length === 0) {
                return {
                    ...state, 
                    addedProduct: [{
                                    ...state.addedProduct, 
                                    id: action.payload.id, 
                                    productName: action.payload.productName,
                                    productPrice: action.payload.productPrice,
                                    imgUrl: action.payload.productImg,
                                    quantity: 1,
                                    productUnit: action.payload.productUnit,
                                    productDiscount: action.payload.productDiscount
                                    }],
                    total: action.payload.productPrice
                }
            } else {
                    return {
                        ...state, 
                        addedProduct: [
                            ...state.addedProduct, 
                            {
                                id: action.payload.id, 
                                productName: action.payload.productName, 
                                productPrice: action.payload.productPrice,
                                imgUrl: action.payload.productImg,
                                quantity: 1,
                                productUnit: action.payload.productUnit,
                                productDiscount: action.payload.productDiscount
                        }
                            ],
                        total: state.total + action.payload.productPrice
                    }
                }
        case 'PLUS_ORDER':
            newValue = [...state.addedProduct]
            product = state.addedProduct.find(product => product.id === action.payload.id)
            product.quantity += 1
            newTotal = state.total + product.productPrice
            return {                
                ...state, addedProduct: newValue, total: newTotal
            }
        case 'MINUS_ORDER':
            newValue = [...state.addedProduct]
            product = state.addedProduct.find(product => product.id === action.payload.id)
            product.quantity -= 1
            newTotal = state.total - product.productPrice
            if (product.quantity !== 0) {
                return {                
                    ...state, addedProduct: newValue, total: newTotal
                }                
            } else {
                remove = state.addedProduct.filter(product => product.id !== action.payload.id)
                return {...state, addedProduct: remove, total: newTotal}
            }
        case 'REMOVE_PRODUCT':
            remove = state.addedProduct.filter(product => product.id !== action.payload.id)
            product = state.addedProduct.find(product => product.id === action.payload.id)
            newTotal = state.total - (product.productPrice * product.quantity)
            return {...state, addedProduct: remove, total: newTotal}
        case 'CLEAR_PRODUCT':
            clearProduct = []
            clearTotal= 0
            return {...state, addedProduct: clearProduct, total: clearTotal}
        default:
            return state
    }
}

export default productReducer