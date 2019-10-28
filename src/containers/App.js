import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isLogin } from '../actions/actionAuth'
import Cookies from 'universal-cookie'

// Pages
import Home from './Home/Home'
import Register from '../components/Home/Register'
import Dashboard from './Dashboard/Dashboard'
import Profile from './Profile/Profile'
import Checkout from './Checkout/Checkout'
import ProductOrder from '../components/Checkout/ProductOrder'

const cookies = new Cookies()

const App = () => {

    // const user = useSelector(state => state.authReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        let user = cookies.get('user')

        if (user) {
            const { id, fullName, email } = user
            dispatch(isLogin(id, fullName, email))
        }
    }, [])

    return (
        <Fragment>
            <BrowserRouter>
                <Route path="/" exact component={Home}/> 
                <Route path="/register" component={Register}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/profile/:userId" component={Profile}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/order" component={ProductOrder}/>
            </BrowserRouter>
        </Fragment>
    )
}

export default App