import React, { Fragment } from 'react'
import Identity from '../../components/Checkout/Identity'
import CheckoutCart from '../../components/Checkout/CheckoutCart'
import Nav from '../../components/Checkout/Nav'
import Payment from '../../components/Checkout/Payment'

import './Checkout.css'
import '../../components/Checkout/style/Identity.css'
import '../../components/Checkout/style/CheckoutCart.css'


const Checkout = () => {
    return (
        <Fragment>
            <Nav/>
            <div className="row mx-0" style={{height: "960px"}}>
                <div className="col-md-7">
                    <Identity/>
                </div>
                <div className="col-md-5 pl-0 pl-15">
                    <CheckoutCart/>
                    <Payment/>
                </div>
                <div style={{borderTop: "1px solid #d8d8d8"}} className="text-center py-3 mt-3 col-12">
                    <button className="btn btn-success form-control col-10 disabled-type-1">Lanjut Ke Pembayaran</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Checkout
