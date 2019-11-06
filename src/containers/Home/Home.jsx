import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from '../../components/Home/Navbar'
import Login from '../../components/Home/Login'
import LandingPage from '../../components/Home/LandingPage'
import Products from '../../components/Home/Product'

// API
import API from '../../services'

import './Home.css'


const Home = () => {

    const [ state, setState ] = useState({
        data: null,
        products: null,
        loading: true
    })

    const [ login, setLogin ] = useState(false)

    const getData = () => {
        API.getProductsDataAPI()
        .then(res => {
            // setState({...state, data: res.data})
            let data = res.data
            API.getProductsData()
            .then(res => setState({...state, products: res.data, data, loading: false}))
        }) 
            
    }

    useEffect(() => {
        getData()
    }, [])

    if (!state.loading) {
        return (
            <Fragment>
                <Navbar setLogin={ setLogin } />
                {login ? <Login openLogin={ login } setLogin={ setLogin } /> : null}
            
                <div className="container mt-5">
                    <LandingPage />
                            <Products allProducts={state.data.allProducts}
                            newestProducts={state.data.newestProduct}
                            product={state.products}/>
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

export default Home



// class Home extends Component {

//     state = {
//         products: [],
//         loading: false,
//         openLogin : 0,
//         data: []
//     }



//     render() {
//         if (this.state.loading) {
//             return (
//                 <Fragment>
//                 <Navbar aneh={ val => this.aneh(val) } onLoginHandler={(value) => {this.loginHandler(value)}} />
//                 {this.state.openLogin ? <Login openLogin={ this.state.openLogin } onLoginHandler={(value) => {this.loginHandler(value)}} /> : null}
                
//                 <div className="container mt-5">
//                     <LandingPage />
//                             <Products allProducts={this.state.data.allProducts}
//                             newestProducts={this.state.data.newestProduct}
//                             product={this.state.products}/>
//                     </div>
//                 </Fragment>
//             )
//         } else {
           
//         }
//     }
// }

// const mapStateToProps = state => {
//     return {
//         user: state.authReducer
//     }
// }

// export default connect(mapStateToProps,)(Home)