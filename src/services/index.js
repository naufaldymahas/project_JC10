import Get from './Get'
import Post from './Post'


// GET
const getProductsData = () => Get('products', false)
const getProductsDataAPI = () => Get('product/getproducts', true)
const loginHandler = (input) => Get('auth/login', true, input)
const getAllCustomers = () => Get('auth/customers', true)


// Post
const registerUser = (data) => Post('auth/register', true, data)
const addProducts = (data) => Post('product/addproduct', true, data)

const API = {
    getProductsData,
    registerUser,
    getProductsDataAPI,
    loginHandler,
    getAllCustomers,
    addProducts
}

export default API