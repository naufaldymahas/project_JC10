import React, { Fragment, useEffect, useRef } from 'react'
import AllProduct from './AllProduct'
import SpecialPromo from './SpecialPromo'
import NewProduct from './NewProduct'
import SearchProduct from './SearchProduct'
import '../Style/Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, cartHandler } from '../../../actions/actionCart'
import Cookies from 'universal-cookie'
import moment from '../../../../../my-api/node_modules/moment/moment'
const API = 'http://localhost:9000/'

const cookies = new Cookies()

const Product = (props) => {

    const { quantity, total, userId } = useSelector( state => ({
        quantity: state.productReducer.addedProduct,
        total: state.productReducer.total,
        userId: state.authReducer.id
    }) )

    const dispatch = useDispatch()

    const addCartHandler = (id, name, price, img, unit, discount) => {
        dispatch(addToCart(id, name, price, img, unit, discount, userId))
    }

    const buttonHandler = (cond ,id, price, quantity) => {
        dispatch(cartHandler(cond, id, price, quantity, userId))
    }

    const renderInput = (id) => {
    let product = quantity.find(product => product.id === id)
        if (!product) {
            return null
        } else {
            return product.quantity
        } 
    }

    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
            return;
        }
        cookies.set('cart', { product: quantity, total }, { path: '/', expires: new Date(moment().add(8, 'h').format('YYYY-MM-DDTkk:mm:ss.SSS')+ 'Z') })
    }, [quantity, total])

    return (
        <Fragment>
            {
                !props.searchProduct ?
                <>
                    <span style={{fontSize: "28px"}}>Special Promos</span>
                    <span className="card-title-type2">Lihat Semua ></span>
                    <div className="container-card-type1">
                        <SpecialPromo products={props.product} 
                        addCartHandler={(id, name, price, img, unit, discount) => addCartHandler(id, name, price, img, unit, discount)} 
                        buttonHandler={(cond, id, price, quantity) => buttonHandler(cond, id, price, quantity)} 
                        renderInput={id => renderInput(id)}
                        API={ API }
                        addedProduct={ quantity }/>
                    </div>
                    <span style={{fontSize: "28px"}} className="mt-5">Newest Products</span>
                    <span className="card-title-type2">Lihat Semua ></span>
                    <div className="container-card-type1">
                        <NewProduct products={props.newestProducts} 
                        addCartHandler={(id, name, price, img, unit, discount) => addCartHandler(id, name, price, img, unit, discount)} 
                        buttonHandler={(cond, id, price, quantity) => buttonHandler(cond, id, price, quantity)}  
                        renderInput={id => renderInput(id)}
                        API={ API }
                        addedProduct={ quantity }/> 
                    </div>
                    <span style={{fontSize: "28px"}} className="mt-5">Semua Produk</span>
                    <div className="row mt-2">
                        <AllProduct products={props.allProducts} 
                        addCartHandler={(id, name, price, img, unit, discount) => addCartHandler(id, name, price, img, unit, discount)} 
                        buttonHandler={(cond, id, price, quantity) => buttonHandler(cond, id, price, quantity)}  
                        renderInput={id => renderInput(id)}
                        API={ API }
                        addedProduct={ quantity }/>
                    </div>
                </>
                :
                <>
                    <span style={{fontSize: "28px"}} className="mt-5">Hasil Pencarian</span>
                    <div className="row mt-2">
                        <SearchProduct products={props.searchProduct} 
                        addCartHandler={(id, name, price, img, unit, discount) => addCartHandler(id, name, price, img, unit, discount)} 
                        buttonHandler={(cond, id, price, quantity) => buttonHandler(cond, id, price, quantity)} 
                        renderInput={id => renderInput(id)}
                        API={ API }
                        addedProduct={ quantity }/>
                    </div>
                </>
            }
        </Fragment>
    )
}

export default Product