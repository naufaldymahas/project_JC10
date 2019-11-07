import Get from './Get'
import Post from './Post'
import Patch from './Patch'

// GET
const getProductsData = () => Get('products', false)
const getProductsDataAPI = () => Get('product/getproducts', true)
const loginHandler = (input) => Get('auth/login', true, input)
const getAllCustomers = () => Get('auth/customers', true)
const getAddress = (input) => Get('user/address', true, input)
const getTransactionsDetail = (input) => Get('transaction/gettransactionsdetail', true, input)
const getTransactionList = (input) => Get('transaction/gettransactionslist', true, input)
const getProductDataDashboard = () => Get('product/getproductsdashboard', true)

// PATCH
const uploadPaymentProof = (data) => Patch('transaction/uploadpayment', true, data)
const changeBiodata = (data) => Patch('user/changebiodata', true, data)

// Post
const registerUser = (data) => Post('auth/register', true, data)
const addProducts = (data) => Post('product/addproduct', true, data)
const addAddress = (data) => Post('user/addaddress', true, data)
const addTranscation = (data) => Post('transaction/addtransaction', true, data)
const addTranscationDetail = (data) => Post('transaction/addtransactiondetail', true, data)

const API = {
    getProductsData,
    registerUser,
    getProductsDataAPI,
    loginHandler,
    getAllCustomers,
    addProducts,
    addAddress,
    getAddress,
    addTranscation,
    addTranscationDetail,
    getTransactionsDetail,
    getTransactionList,
    uploadPaymentProof,
    changeBiodata,
    getProductDataDashboard
}

export default API