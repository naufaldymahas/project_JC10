import React, { Fragment, useEffect, useRef } from 'react'
import AllProduct from './AllProduct'
import SpecialPromo from './SpecialPromo'
import NewProduct from './NewProduct'
import '../Style/Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, cartHandler } from '../../../actions/actionCart'
import Cookies from 'universal-cookie'
// import moment from 'moment'
const cookies = new Cookies()

const Product = (props) => {

    const { quantity, total } = useSelector( state => ({
        quantity: state.productReducer.addedProduct,
        total: state.productReducer.total
    }) )

    const dispatch = useDispatch()

    const addCartHandler = (id, name, price, img) => {
        dispatch(addToCart(id, name, price, img))
    }

    const buttonHandler = (cond ,id, price) => {
        if (cond === 'plus') {
            dispatch(cartHandler(cond, id, price))
        } else {
            dispatch(cartHandler(cond, id, price))
        }
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
        cookies.set('cart', { product: quantity, total }, { path: '/' })
        console.log(cookies.get('cart'))
    }, [quantity, total])

    return (
        <Fragment>
            <span style={{fontSize: "28px"}}>Special Promos</span>
            <span className="card-title-type2">Lihat Semua ></span>
            <div className="container-card-type1">
                <SpecialPromo products={props.product} 
                addCartHandler={(id, name, price, img) => addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => buttonHandler(cond, id, price)} 
                renderInput={id => renderInput(id)}/>
            </div>
            <span style={{fontSize: "28px"}} className="mt-5">Newest Products</span>
            <span className="card-title-type2">Lihat Semua ></span>
            <div className="container-card-type1">
                <NewProduct products={props.newestProducts} 
                addCartHandler={(id, name, price, img) => addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => buttonHandler(cond, id, price)} 
                renderInput={id => renderInput(id)}/> 
            </div>
            <span style={{fontSize: "28px"}} className="mt-5">Semua Produk</span>
            <div className="row mt-2">
                <AllProduct products={props.allProducts} 
                addCartHandler={(id, name, price, img) => addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => buttonHandler(cond, id, price)} 
                renderInput={id => renderInput(id)}/>
            </div>
        </Fragment>
    )
}

// class Product extends Component {



//     componentDidUpdate(prevProps) {
//         // let isExpire = moment(new Date()).add(1, 'm').toDate()
//         if (this.props.quantity !== prevProps.quantity) {
               
//         }
//     }

//     render() {
//         return (
        
//         )
//     }
// }

// const mstp = state => {
//     return {
        // quantity: state.productReducer.addedProduct,
        // total: state.productReducer.total
//     }
// }

export default Product
// export default connect(mstp, {addToCart, cartHandler})(Product)