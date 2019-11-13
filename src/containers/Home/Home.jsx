import React, { Fragment, useEffect, useState } from 'react'
import querystring from 'query-string'

// Components
import Navbar from '../../components/Home/Navbar'
import Login from '../../components/Home/Login'
import LandingPage from '../../components/Home/LandingPage'
import Products from '../../components/Home/Product'

// API
import API from '../../services'

import './Home.css'


const Home = (props) => {

    const [ state, setState ] = useState({
        products: null,
        loading: true
    })

    const [ login, setLogin ] = useState(false)

    const getData = () => {
        API.getProductsDataAPI()
        .then(res => {
            setState({...state, products: res.data, loading: false})
        }) 
            
    }

    const [search, setSearch] = useState('')

    const [searchData, setSearchData] = useState('')

    const searchHandler = e => {
        e.preventDefault()
        API.getSearchProduct({search})
        .then(res => {
            setSearchData(res.data)
            props.history.push('/search?' + querystring.stringify({search}))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!props.history.location.search) getData()
        else {
            API.getSearchProduct(querystring.parse(props.history.location.search))
            .then(res => {
                console.log(res.data)
                setSearchData(res.data)
                setState({...state, loading: false})
            })
            .catch(err => console.log(err))
        }
    }, [])

    if (!state.loading) {
        return (
            <Fragment>
                <Navbar setLogin={ setLogin }
                search={ search }
                setSearch={ setSearch }
                searchHandler={ searchHandler }
                products={ state.products.allProducts }/>
                {login ? <Login openLogin={ login } setLogin={ setLogin } /> : null}
            
                <div className="container mt-5">
                    {
                        !searchData ?
                        <>
                            <LandingPage />
                            <Products allProducts={state.products.allProducts}
                            newestProducts={state.products.newestProducts}
                            product={state.products.specialPromo}/>
                        </>
                        :
                            <Products searchProduct={ searchData }/>
                    }

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