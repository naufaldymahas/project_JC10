import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, cartHandler } from '../../../actions/actionCart'
import Nav from '../../Checkout/Nav'
import API from '../../../services'
import SuggestionProduct from './SuggestionProduct'
import '../Style/ProductDetail.css'
import Cookies from 'universal-cookie'
import moment from 'moment'
const cookies = new Cookies()

const ProductDetail = (props) => {

    const [product, setProduct] = useState()

    const [state, setState] = useState({
        suggestion: '',
        loading: true
    })

    const dispatch = useDispatch()

    const { userId, quantity, total} = useSelector(state => {
        return {
            quantity: state.productReducer.addedProduct,
            userId: state.authReducer.id,
            total: state.productReducer.total
        }
    })

    console.log(userId)

    useEffect(() => {
        API.getProductDetail(props.match.params)
        .then(res => {
            setProduct(res.data[0])
        })
    }, [])
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current){
            mounted.current = true
            return
        }
        
        if (!state.suggestion) {
        API.getSuggestionProduct({category: product.category})
        .then(res => setState({...state, suggestion: res.data, loading: false}))
        }

        if (quantity.length !== 0) cookies.set('cart', { product: quantity, total }, { path: '/', expires: new Date(moment().add(8, 'h').format('YYYY-MM-DDTHH:mm:ss.SSS')+ 'Z') })

    }, [product, quantity])

    const renderInput = () => {
        let productQty = quantity.find(qty => qty.id === product.id)
        if (!productQty) return null
        else return productQty.quantity
    }

    const buttonHandler = (cond ,id, price) => {
        // setTimeout(() => {
            dispatch(cartHandler(cond, id, price, renderInput(), userId))
        // }, 1000);
    }

    const checkInput = (id, price, stock) => {
        let productQty = quantity.find(qty => qty.id === id)
        return (
            <>
            <button onClick={ () => buttonHandler('minus', id, price) } className="btn-minus1">-</button>
            <div className="text-center" style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "6px 0px", width: "40px" }}>
                <span>{renderInput()}</span>
            </div>
            
            {
                productQty.quantity === stock ?
                    <button disabled style={{ cursor: "no-drop" }} className="btn-plus1">+</button>
                :
                    <button onClick={ () => buttonHandler('plus', id, price) } className="btn-plus1">+</button>
            }
            </>
        )
    }

    if (!state.loading) {
    return (
        <Fragment>
            <Nav/>
            <div className="pb-2" style={{ borderBottom: "1px solid #dfdfdf" }}>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-4 pl-0">
                            <img className="w-100" src={ 'http://localhost:9000/' + product.image } alt="gambar"/>
                        </div>
                        <div className="col-md-8 px-0">
                            <div>
                                <h4>{product.name}</h4>
                                <span>{product.unit}</span>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    {
                                        product.discount ?
                                        <>
                                            <p className="mb-0 text-muted" style={{ textDecoration: "line-through" }}>Rp. {product.price}</p>
                                            <p className="mb-0" style={{ fontSize: "20px" }}>Rp. {(product.price - (product.price * (product.discount/100))).toLocaleString('id')}</p>
                                        </>
                                        :
                                        <p className="mb-0" style={{ fontSize: "20px" }}>Rp. {product.price.toLocaleString('id')}</p>
                                    }
                                </div>
                                <div>
                                    {
                                        renderInput() ?
                                        <div className="d-flex">
                                            {checkInput(product.id, product.price, product.displayStock)}
                                        </div>
                                        :
                                        <button onClick={ () => dispatch(addToCart(product.id, product.name, product.price, product.image, product.unit, product.discount, userId)) } className="btn btn-success py-2 px-3">
                                            <i className="fa fa-shopping-basket mr-2"></i>    
                                            Beli
                                        </button>
                                    }
                                </div>
                            </div>
                            <p className="mb-0 mt-2 ml-3 p-1">Deskripsi Barang</p>
                            <div className="mb-0 py-1 pl-2" style={{ border: "1px solid #dfdfdf", borderRadius: "3px" }}>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-2">
                <SuggestionProduct products={ state.suggestion }/>
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

export default ProductDetail
