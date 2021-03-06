import React, { Fragment, useRef, useEffect } from 'react'
import './Style/Cart.css'

const style = {
    borderBottom: "1px solid rgba(0,0,0,.1)"
}

const Cart = (props) => {


    const node = useRef()

    const outsideClick = e => {
        if (node.current.contains(e.target)) return
        else props.cartHandler('close')
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideClick)
    }, [])

    const totalPrice = () => {
        let total = 0
        props.addedProduct.map(product => {
            if (product.productDiscount) total += (product.productPrice - (product.productPrice * product.productDiscount/100)) * product.quantity
            else total += product.productPrice * product.quantity
        })
        return total.toLocaleString('id')
    }

    const checkInput = (id, price, quantity) => {
        let productFind = props.products.find(product => product.id === id)
        return (
            <>
            <button onClick={() => props.buttonHandler('minus', id, price, quantity, true)} className="cart-btn minus">-</button>
            <div className="cart-input">
                <span style={{padding: 0, marginRight: "auto", marginLeft: "auto"}}>{quantity}</span>
            </div>
            {
                productFind.displayStock === quantity 
                ?
                <button disabled style={{ cursor: "no-drop" }} className="cart-btn plus">+</button>
                :
                <button onClick={() => props.buttonHandler('plus', id, price, quantity, true)} className="cart-btn plus">+</button>
            }

            </>
        )
    }

    const cartProduct = () => {
        const cartProduct = props.addedProduct.map(product => {
                return (
                    <div key={product.id} className="cart-product">
                        <div className="cart-product-container">
                            <div className="cart-image">
                                <img src={ 'http://localhost:9000/' + product.imgUrl} alt="product"/>
                            </div>
                            <div className="cart-detail">
                                <span className="cart-product-name px-0">{product.productName}</span>
                                <p>{product.productUnit}</p>
                                    {
                                        product.productDiscount ?
                                        <>
                                            <p style={{ textDecoration: "line-through" }} className="price mb-0">Rp. {product.productPrice.toLocaleString('id')}</p>
                                            <span className="price px-0">Rp. {(product.productPrice - (product.productPrice * product.productDiscount/100)).toLocaleString('id')}</span>
                                        </>
                                        :
                                            <span className="price px-0">Rp. {product.productPrice.toLocaleString('id')}</span>

                                    }

                                <button onClick={() => props.removeProduct(product.id)} className="cart-remove-product"><i className="fa fa-trash"></i></button>
                            </div>
                        </div>
                        <div className="mt-1 mb-1">
                            {checkInput(product.id, product.productPrice, product.quantity)}
                            <div className="cart-input-price">
                                {
                                    product.productDiscount ?
                                    <span>Rp. {((product.productPrice - (product.productPrice * product.productDiscount/100)) * product.quantity).toLocaleString('id')}</span>
                                    :
                                    <span>Rp. {(product.productPrice * product.quantity).toLocaleString('id')}</span>
                                }
                                
                            </div>
                        </div>
                    </div>
                )
            })
        return cartProduct
    }

    return (
        <div id="cart-container">
        <div id="cart" ref={ node } className="cart-right unactive">
            <div className="cart-header">
                <div className="cart-header-content">
                    <button onClick={() => props.cartHandler('close')}><i className="fa fa-arrow-left"></i></button>
                <div className="cart-header-title">
                    <span>Keranjang Belanja</span>
                </div>
                </div>
            </div>
            <div className="cart-content">
                {props.addedProduct.length ?
                <Fragment>
                    <div style={style}>
                        <span className="cart-content-title">Area Pengiriman</span>
                        <br/>
                        <span>DKI Jakarta</span>
                    </div>
                    {cartProduct()}
                    
                    <div className="cart-checkout">
                        <div style={{position: "relative"}}>
                            <i data-badge className="fa fa-shopping-basket cart-basket"></i>
                            {props.quantity ? 
                            <div data-badge className="cart-basket-badge">
                                <span className="cart-basket-number">{props.quantity}</span> 
                            </div>
                            : null}
                        </div>
                        <div className="cart-checkout-price">
                            <span style={{marginTop: "auto", marginBottom: "auto"}}>Rp. {totalPrice()}</span>
                        </div>
                    </div>
                    <div className="text-center px-1 mt-2">
                        <a className="btn-checkout" href="/checkout"><button className="btn btn-success form-control">Checkout</button></a>
                    </div>
                </Fragment>
                :
                <div className="cart-content-none">
                    <span>Keranjang Masih Kosong <span aria-label="screaming" role="img">😱</span></span>
                    <button onClick={() => props.cartHandler('close')} className="btn btn-success form-control mt-2">Lanjut Belanja</button>
                </div>                
                }
            </div>

        </div>
    </div>
    )
}

export default Cart