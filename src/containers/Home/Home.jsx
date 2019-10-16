import React, { Component, Fragment } from 'react'

// Components
import Navbar from '../../components/Home/Navbar'
import Login from '../../components/Home/Login'
import LandingPage from '../../components/Home/LandingPage'
import Category from '../../components/Home/Category'
import Products from '../../components/Home/Product'

// API
import API from '../../services'


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
        this.getDataAPI()
        this.getData()
        
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

    render() {
        console.log(this.state.data)

        if (this.state.loading) {
            return (
                <Fragment>
                <Navbar onLoginHandler={(value) => {this.loginHandler(value)}} />
                {this.state.openLogin ? <Login onLoginHandler={(value) => {this.loginHandler(value)}} /> : null}
                <div className="container mt-5">
                    <LandingPage/>
                    <Category/>
                            <Products allProducts={this.state.data.allProducts}
                            newestProducts={this.state.data.newestProduct}
                            product={this.state.products}/>
                    </div>
                </Fragment>
            )
        } else {
           return null
        }
    }
}

export default Home