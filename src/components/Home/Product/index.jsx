import React, { Fragment, Component } from 'react'
import AllProduct from './AllProduct'
import SpecialPromo from './SpecialPromo'
import NewProduct from './NewProduct'
import '../Style/Products.css'
import { connect, useSelector } from 'react-redux'
import { addToCart, cartHandler } from '../../../actions/actionCart'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Product extends Component {

    addCartHandler = (id, name, price, img) => {
        this.props.addToCart(id, name, price, img)
        cookies.set('cart', { value: this.props.quantity }, { path: '/'})
    }

    buttonHandler = (cond ,id, price) => {
        if (cond === 'plus') {
            this.props.cartHandler(cond, id, price)
        } else {
            this.props.cartHandler(cond, id, price)
        }
        cookies.set('cart', { value: this.props.quantity }, { path: '/'})
    }

    renderInput = (id) => {
    let product = this.props.quantity.find(product => product.id == id)
        if (!product) {
            return null
        } else {
            return product.quantity
        }
    }

    render() {
    // console.log(this.props)
        return (
        <Fragment>
            <span style={{fontSize: "28px"}}>Special Promos</span>
            <span className="card-title-type2">Lihat Semua ></span>
            <div className="container-card-type1">
                <SpecialPromo products={this.props.product} 
                addCartHandler={(id, name, price, img) => this.addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => this.buttonHandler(cond, id, price)} 
                renderInput={id => this.renderInput(id)}/>
            </div>
            <span style={{fontSize: "28px"}} className="mt-5">Newest Products</span>
            <span className="card-title-type2">Lihat Semua ></span>
            <div className="container-card-type1">
                <NewProduct products={this.props.newestProducts} 
                addCartHandler={(id, name, price, img) => this.addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => this.buttonHandler(cond, id, price)} 
                renderInput={id => this.renderInput(id)}/> 
            </div>
            <span style={{fontSize: "28px"}} className="mt-5">Semua Produk</span>
            <div className="row mt-2">
                <AllProduct products={this.props.allProducts} 
                addCartHandler={(id, name, price, img) => this.addCartHandler(id, name, price, img)} 
                buttonHandler={(cond, id, price) => this.buttonHandler(cond, id, price)} 
                renderInput={id => this.renderInput(id)}/>
            </div>
        </Fragment>
        )
    }
}

const mstp = state => {
    return {
        quantity: state.productReducer.addedProduct
    }
}

export default connect(mstp, {addToCart, cartHandler})(Product)