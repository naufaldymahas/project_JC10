import Get from './Get'
import Post from './Post'
import Patch from './Patch'

// GET
const getProductsData = () => Get('products', false)
const getProductsDataAPI = () => Get('product/getproducts', true)
const loginHandler = (input) => Get('auth/login', true, input)
const getAllCustomers = () => Get('dashboard/getallcustomers', true)
const getTotalPrice = () => Get('dashboard/gettotalprice', true)
const getAddress = (input) => Get('user/address', true, input)
const getTransactionsDetail = (input) => Get('transaction/gettransactionsdetail', true, input)
const getTransactionList = (input) => Get('transaction/gettransactionslist', true, input)
const getProductDataDashboard = () => Get('product/getproductsdashboard', true)
const getAllTransaction = () => Get('dashboard/getalltransaction', true)
const getSearchProduct = (input) => Get('product/getsearchproduct', true, input)
const getProductDetail = (input) => Get('product/getproductdetail', true, input)
const getSuggestionProduct = (input) => Get('product/getsuggestion', true, input)
const getCart = (input) => Get('transaction/getcart', true, input)
const sendVerifyEmail = (input) => Get('auth/sendyemail', true, input)


// PATCH
const uploadPaymentProof = (data) => Patch('transaction/uploadpayment', true, data)
const changeBiodata = (data) => Patch('user/changebiodata', true, data)
const approvalPayment = (data) => Patch('dashboard/approvalpayment', true, data)
const carthandler = (data) => Patch('transaction/carthandler', true, data)
const removeCart = (data) => Patch('transaction/removecart', true, data)
const checkStockCheckout = (data) => Patch('transaction/checkcheckout', true, data)
const updateIsRemove = (data) => Patch('transaction/updateisremovecart', true, data)
const checkDeadlineTransaction = (data) => Patch('transaction/checkdeadline', true, data)
const stockDeadline = (data) => Patch('transaction/stockdeadline', true, data)
const approvalUpdateStock = (data) => Patch('dashboard/approvalstock', true, data)
const updateProduct = (data) => Patch('dashboard/updatestock', true, data)
const editHandler = (data) => Patch('dashboard/edithandler', true, data)
const updateShipping = (data) => Patch('dashboard/updateshipping', true, data)
const updateReceived = (data) => Patch('dashboard/updatereceived', true, data)


// Post
const registerUser = (data) => Post('auth/register', true, data)
const addProducts = (data) => Post('product/addproduct', true, data)
const addAddress = (data) => Post('user/addaddress', true, data)
const addTranscation = (data) => Post('transaction/addtransaction', true, data)
const addTranscationDetail = (data) => Post('transaction/addtransactiondetail', true, data)
const addCart = (data) => Post('transaction/addcart', true, data)

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
    getProductDataDashboard,
    getAllTransaction,
    getSearchProduct,
    getProductDetail,
    getSuggestionProduct,
    approvalPayment,
    carthandler,
    addCart,
    removeCart,
    getCart,
    checkStockCheckout,
    updateIsRemove,
    sendVerifyEmail,
    checkDeadlineTransaction,
    stockDeadline,
    approvalUpdateStock,
    updateProduct,
    editHandler,
    getTotalPrice,
    updateShipping,
    updateReceived
}

export default API