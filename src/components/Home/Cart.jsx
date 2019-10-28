import React, { Fragment } from 'react'
import './Style/Cart.css'

const style = {
    borderBottom: "1px solid rgba(0,0,0,.1)"
}

const Cart = (props) => {

    const cartProduct = () => {
        const cartProduct = props.addedProduct.map(product => {
                return (
                    <div key={product.id} className="cart-product">
                        <div className="cart-product-container">
                            <div className="cart-image">
                                <img src={product.imgUrl} alt="product"/>
                            </div>
                            <div className="cart-detail">
                                <span className="cart-product-name">{product.productName}</span>
                                <p>{`1 pcs (500gr)`}</p>
                                <span className="price">Rp. {product.productPrice.toLocaleString('id')}/ 1pcs</span>
                                <button onClick={() => props.removeProduct(product.id)} className="cart-remove-product"><i className="fa fa-trash"></i></button>
                            </div>
                        </div>
                        <div className="mt-1 mb-1">
                            <button onClick={() => props.buttonHandler('minus', product.id, product.productPrice)} className="cart-btn minus">-</button>
                            <div className="cart-input">
                                <span style={{padding: 0, marginRight: "auto", marginLeft: "auto"}}>{product.quantity}</span>
                            </div>
                            <button onClick={() => props.buttonHandler('plus', product.id, product.productPrice)} className="cart-btn plus">+</button>
                            <div className="cart-input-price">
                                <span>Rp. {(product.productPrice * product.quantity).toLocaleString('id')}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        return cartProduct
    }

    return (
        <div id="cart-container">
        <div id="cart" className="cart-right unactive">
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
                    {/* <div style={style}>
                        <span className="cart-content-title">Area Pengiriman</span>
                        <br/>
                        <span>DKI Jakarta</span>
                        <br/>
                        <span className="cart-content-title">Tanggal Pengiriman</span>
                        <br/>
                        <span>DKI Jakarta</span>
                    </div> */}
                    {cartProduct()}
                    
                    <div className="cart-checkout">
                        <div style={{position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                            <i data-badge className="fa fa-shopping-basket cart-basket"></i>
                            {props.quantity ? 
                            <div data-badge className="cart-basket-badge">
                                <span className="cart-basket-number">{props.quantity}</span> 
                            </div>
                            : null}
                        </div>
                        <div className="cart-checkout-price">
                        <span style={{marginTop: "auto", marginBottom: "auto"}}>Rp. {props.total.toLocaleString('id')}</span>
                        </div>
                        <button className="btn btn-success ml-3"><a className="btn-checkout" href="/checkout">Checkout</a></button>
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