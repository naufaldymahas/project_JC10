import React, { Component, Fragment } from 'react'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import { cookieProduct } from '../../actions/actionCart'
import { isLogin } from '../../actions/actionAuth'

// Components
import Navbar from '../../components/Home/Navbar'
import Login from '../../components/Home/Login'
import LandingPage from '../../components/Home/LandingPage'
import Products from '../../components/Home/Product'

// API
import API from '../../services'

import './Home.css'

const cookie = new Cookies()

class Home extends Component {

    state = {
        products: [],
        loading: false,
        openLogin : 0,
        data: []
    }

    getData = () => {
        API.getProductsDataAPI()
        .then(res => {
            this.setState({data: res.data, loading: true})
        })
    }

    componentDidMount() {
        let isCookie = cookie.get('cart')
        if (isCookie) {
            let product = cookie.get('cart').product
            let total = cookie.get('cart').total
            this.props.cookieProduct(product, total)
        }
        let isLogin = cookie.get('user')
        if (isLogin) {
            let { fullName, email } = isLogin
            this.props.isLogin(fullName, email)
        }

        setTimeout(() => {
            this.getDataAPI()
            this.getData()
        }, 1000);
    }
    
    getDataAPI = () => {
        API.getProductsData()
        .then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    loginHandler = (newValue) => {
        this.setState({
            openLogin: newValue
        })
    }

    aneh = () => {
        let login = document.getElementById('1')
        console.log(login)
    }

    render() {
        if (this.state.loading) {
            return (
                <Fragment>
                <Navbar aneh={ val => this.aneh(val) } onLoginHandler={(value) => {this.loginHandler(value)}} />
                {this.state.openLogin ? <Login openLogin={ this.state.openLogin } onLoginHandler={(value) => {this.loginHandler(value)}} /> : null}
                
                <div className="container mt-5">
                    <LandingPage />
                            <Products allProducts={this.state.data.allProducts}
                            newestProducts={this.state.data.newestProduct}
                            product={this.state.products}/>
                    </div>
                </Fragment>
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
}

const mapStateToProps = state => {
    return {
        user: state.authReducer
    }
}

export default connect(mapStateToProps, { cookieProduct, isLogin })(Home)