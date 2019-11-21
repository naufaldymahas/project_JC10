import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style/Navigation.css'

const Navigation = ({props}) => {

    useEffect(() => {
        let top = document.getElementById(props.location.pathname.split('/')[2])
        let bottom
        if (props.location.pathname.split('/')[3]) {
            bottom = document.getElementById(props.location.pathname.split('/')[3])
            bottom.classList.add('b-active')
        }
        top.classList.add('active')
        return () => {
            top.classList.remove('active')
            if (bottom) {
                bottom.classList.remove('b-active')
            }
        }
    }, [props.location.pathname])

    return (
        <Fragment>
            <ul className="list-unstyled d-flex py-2 my-auto text-center" style={{ borderBottom: "1px solid #dee2e6" }}>
                <li className="navigation n-left">
                    <Link className="n-links" id="orders" to="/dashboard/orders/orderlist/1"><i className="fa fa-book"></i> Orders</Link>
                </li>
                <li className="navigation">
                    <Link className="n-links" id="customers" to="/dashboard/customers"><i className="fa fa-user"></i> Customers</Link>
                </li>
                <li className="navigation">
                    <Link className="n-links" id="products" to="/dashboard/products"><i className="fa fa-shopping-basket"></i> Products</Link>
                </li>
                <li className="navigation n-right">
                    <Link className="n-links" id="reports" to="/dashboard/reports"><i className="fa fa-bar-chart"></i> Reports</Link>
                </li>
            </ul>
                {
                    props.location.pathname.split('/')[3] ? (
                    <ul className="list-unstyled d-flex py-2 my-auto text-center" style={{ borderBottom: "1px solid #dee2e6" }}>
                        <li className="col-md-1 ml-auto pr-0">
                            <Link className="nb-links" id="orderlist" to="/dashboard/orders/orderlist/1">
                                Order List
                            </Link>
                        </li>
                        <li className="col-md-2 pr-0">
                            <Link className="nb-links" id="approval" to="/dashboard/orders/approval">
                                Approval Management
                            </Link>
                        </li>
                        <li className="col-md-2 pr-0 mr-auto">
                            <Link className="nb-links" id="shipping" to="/dashboard/orders/shipping">
                                Shipping Management
                            </Link>
                        </li>
                    </ul>
                    )
                    :
                    null
                }
        </Fragment>
    )
}

export default Navigation
