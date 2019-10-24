import React, { Fragment } from 'react'
import Identity from '../../components/Checkout/Identity'
import CheckoutCart from '../../components/Checkout/CheckoutCart'

const Checkout = () => {
    return (
        <Fragment>
            <div className="text-center">
                <h4><a href="/">Home</a></h4>
            </div>
            <div className="row">
                <div className="col-md-7">
                    <Identity/>
                </div>
                <div className="col-md-5 pl-0">
                    <CheckoutCart/>
                </div>
            </div>
        </Fragment>
    )
}

export default Checkout
