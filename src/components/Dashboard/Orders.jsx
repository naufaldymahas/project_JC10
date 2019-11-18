import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import OrderList from './Orders/OrderList'
import Approval from './Orders/Approval'
import Shipping from './Orders/Shipping'


const Orders = (props) => {

    return (
       <Fragment>
            <Route path="/dashboard/orders/orderlist/">
                <OrderList props={props}/>
            </Route>
            <Route path="/dashboard/orders/approval">
                <Approval/>
            </Route>
            <Route path="/dashboard/orders/shipping">
                <Shipping/>
            </Route>
        </Fragment>
    )
}

export default Orders
