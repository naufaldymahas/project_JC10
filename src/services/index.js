import Get from './Get'
import Post from './Post'


// GET
const getProductsData = () => Get('products', false)
const getProductsDataAPI = () => Get('product/getproducts', true)
// Post
const registerUser = (data) => Post('auth/register', true, data)


const API = {
    getProductsData,
    registerUser,
    getProductsDataAPI
}

export default API