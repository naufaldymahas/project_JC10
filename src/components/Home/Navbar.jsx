import React, { Component, Fragment } from 'react'
import './Style/Navbar.css'
import { connect } from 'react-redux'
import Cart from './Cart'
import { cartHandler, removeProduct } from '../../actions/actionCart'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Navbar extends Component {

    buttonHandler = (cond ,id, price) => {
        if (cond === 'plus') {
            this.props.cartHandler(cond, id, price)
        } else {
            this.props.cartHandler(cond, id, price)
        }
        cookies.set('cart', { value: this.props.quantity }, { path: '/'})
    }

    cartHandler = (cond) => {
        let cart = document.getElementById('cart').classList
        let cartContainer = document.getElementById('cart-container').classList
        if (cond === 'open') {
            cart.remove('unactive')
            cart.add('active')
            cartContainer.add('cart-right-show')
        } else {
            cart.remove('active')
            cart.add('unactive')
            cartContainer.remove('cart-right-show')
        }
    }

    renderInput = () => {
        let Qty = 0
        this.props.quantity.forEach(value => {
            Qty += value.quantity
        })
        return Qty
    }

    removeHandler = (id) => {
        this.props.removeProduct(id)
        cookies.set('cart', { value: this.props.quantity }, { path: '/'})        
    }

    render() {
        // console.log(this.props)
        console.log(cookies.get('cart'))
        return (
            <Fragment>
            <Cart addedProduct={this.props.quantity} 
            cartHandler={value => this.cartHandler(value)} 
            quantity={this.renderInput()}
            total={this.props.total}
            buttonHandler={(cond ,id, price) => this.buttonHandler(cond ,id, price)}
            removeProduct={id => this.removeHandler(id)}/>
            <div className="navbars">
                <div className="navbar-items">
                <span>ini Logo</span>
                <a href="/" className="ml-3 item-link">Kategori</a>
                    <div className="input-group-type1">
                        <input type="text" className="input-color" placeholder="Cari Produk"/>
                        <button className="btn-type1">Search</button>
                    </div>
                    <div className="items">
                        <button onClick={() => this.props.onLoginHandler(1)} className="masuk">Masuk</button>
                        <a href="/register" className="daftar">Daftar</a>
                    </div>
                </div>
            </div>
            <div className="basket-fixed">
            <button onClick={() => this.cartHandler('open')} className="basket" href="/"><i style={{fontSize: "20px"}} className="fa fa-shopping-basket"></i></button>
                        {this.renderInput() ? 
                        <div className="cart-badge">
                            <span className="cart-number">
                            {this.renderInput()}
                            </span>
                        </div>
                        : null}
            </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        quantity: state.productReducer.addedProduct,
        total: state.productReducer.total
    }
}

export default connect(mapStateToProps, { cartHandler, removeProduct })(Navbar)