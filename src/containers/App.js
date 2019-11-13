import React, { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isLogin } from '../actions/actionAuth'
import { cookieProduct } from '../actions/actionCart'
import Cookies from 'universal-cookie'

// Pages
import Home from './Home/Home'
import Register from '../components/Home/Register'
import Dashboard from './Dashboard/Dashboard'
import Profile from './Profile/Profile'
import Checkout from './Checkout/Checkout'
import PaymentConfirmation from '../components/Checkout/PaymentConfirmation'
import ProductDetail from '../components/Home/Product/ProductDetail'

import API from '../services'

const cookies = new Cookies()

const App = () => {

    const users = useSelector( state => state.authReducer )

    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        
        let user = cookies.get('user')
        
        let cart = cookies.get('cart')

        if (user) {
            const { id, fullName, email, isVerified, role } = user
            dispatch(isLogin(id, fullName, email, isVerified, role))
        }
        
        if (cart) {
            let product = cookies.get('cart').product
            let total = cookies.get('cart').total
            dispatch(cookieProduct(product, total))
        }

        setLoading(false)

    }, [])

    useEffect(() => {
        let user = cookies.get('user')
        const { id } = user

        if (user) {
            API.checkDeadlineTransaction({id})
            .then(res => {
                if (res.data.length !== 0) {
                    console.log(res.data)
                    API.stockDeadline({id})
                    .then(res => console.log(res.data))
                }
            })
            setInterval(() => {
                API.checkDeadlineTransaction({id})
                .then(res => {
                    if (res.data.length !== 0) {
                        API.stockDeadline({id})
                        .then(res => console.log(res.data))
                    }
                })
            }, 300000);
        }
    }, [])


    if ( !loading ) {
        return (
                <Switch>
                    <Route path="/" exact component={Home}/> 
                    <Route path="/search" component={Home}/>
                    <Route path="/register" component={Register}/>
                    {
                        users.role === "admin" ?
                        <Route path="/dashboard" component={Dashboard}/>
                        :
                        null
                    }
                    <Route path="/profile/:userId" component={Profile}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/payment/:transactionId" component={PaymentConfirmation}/>
                    <Route path="/productdetail/:productId" component={ProductDetail}/>
                    <Route path="/test" component={ProductDetail}/>
                </Switch>
        )
    } else {
        return (
            <div className="loading">
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>  
        )
    }
}

export default withRouter(App)