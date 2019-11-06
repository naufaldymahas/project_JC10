import React, { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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

const cookies = new Cookies()

const App = () => {


    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        let user = cookies.get('user')

        let cart = cookies.get('cart')
            if (cart) {
                let product = cookies.get('cart').product
                let total = cookies.get('cart').total
                dispatch(cookieProduct(product, total))
            }
            if (user) {
                const { id, fullName, email } = user
                dispatch(isLogin(id, fullName, email))
            }
            
            setLoading(false)
    }, [])


    if ( !loading ) {
        return (
                <Switch>
                    <Route path="/" exact component={Home}/> 
                    <Route path="/register" component={Register}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/profile/:userId" component={Profile}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/payment/" component={PaymentConfirmation}/>
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