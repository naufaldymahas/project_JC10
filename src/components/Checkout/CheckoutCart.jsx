import React from 'react'

const API = 'http://localhost:9000/'

const CheckoutCart = ({ carts, voucher, setVoucher }) => {

    const renderTotal = () => {
        let total = 0
        carts.addedProduct.forEach(val => {
            if (val.productDiscount) total += val.productPrice - (val.productPrice * val.productDiscount/100)
            else total += val.productPrice
        })
        return total
    }

    return (
        <div className="checkout-container">
            <div className="card-identity" style={{backgroundColor: "green"}}>
                <i className="fa fa-shopping-basket"></i>
                <span>Keranjang Belanja</span>
            </div>
            <div className="container">
                {
                    carts.addedProduct.map((cart, index) => (
                        <div key={index + 1} className="mt-4">
                            <div className="d-inline-flex col-md-12 p-0 position-relative">
                                <div className="col-md-2 p-0" style={{flex: 0}}>
                                    <div className="image-container ml-2">
                                        <img className="image-cart" src={ API + cart.imgUrl } alt="gambar"/>
                                    </div>
                                </div>
                                <div className="col-md-8 p-0" style={{display: "grid"}}>
                                    <span className="text-truncate text-res">{cart.productName}</span>
                                    {
                                        cart.productDiscount ?
                                        <div>
                                            <span style={{ textDecoration: "line-through" }} className="text-muted">Rp. {(cart.productPrice).toLocaleString('id')}/<small>{cart.productUnit}</small></span>
                                            <span>Rp. {(cart.productPrice - (cart.productPrice * cart.productDiscount/100)).toLocaleString('id')}/<small>{cart.productUnit}</small></span>
                                        </div>
                                        :
                                        <span>Rp. {(cart.productPrice).toLocaleString('id')}/<small>{cart.productUnit}</small></span>
                                    }
                                </div>
                                <div className="col-md-2 p-0 ml-3">
                                    <div className="my-auto position-absolute" style={{top: ".5rem", right: 0}}>
                                        <span className="px-4 py-2" style={{border: "1px solid #d8d8d8", borderRadius: "4px"}}>{cart.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative" style={{borderBottom: "1px solid #d8d8d8", height: "30px"}}>
                                {
                                    cart.productDiscount ?
                                    <span className="position-absolute" style={{right: 0, color: "green"}}>Rp. {((cart.productPrice - (cart.productPrice * cart.productDiscount/100)) * cart.quantity).toLocaleString('id')}</span>
                                    :
                                    <span className="position-absolute" style={{right: 0, color: "green"}}>Rp. {(cart.productPrice * cart.quantity).toLocaleString('id')}</span>
                                }
                            </div>
                        </div>
                    ))
                }
                <div className="mt-3">
                    <span className="input-voucher" onClick={() => setVoucher(!voucher)} style={{borderBottom: "1px dashed"}}>Punya Voucher Kode?</span>
                    {
                        voucher ?
                        <div className="col-md-4 p-0 mt-1 d-flex" style={{height: "30px"}}>
                            <input autoFocus className="form-control h-100" type="text"/>
                            <button className="btn btn-info ml-2 p-2" style={{lineHeight: 0}}>Submit</button>
                        </div>
                        :
                        null
                    }
                    <div className="mt-2 pb-4">
                       <div className="position-relative">
                            <span className="p-0 text-muted">Biaya Kirim</span>
                            <span className="p-0 position-absolute" style={{color: "green", right: 0}}>Rp. 10.000</span>
                       </div>
                       <div className="position-relative" style={{borderTop: "1px solid #d8d8d8"}}>
                            <span className="p-0 text-muted">Total</span>
                            <span className="p-0 position-absolute" style={{color: "green", right: 0}}>Rp. {(renderTotal() + 10000).toLocaleString('id')}</span>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCart
