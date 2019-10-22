import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './style/Sidebar.css'

export const Sidebar = ({ setAnu }) => {

    return (
        <Fragment>
            <div className="col-2 pr-0">
            <div style={{height: "100vh"}} className="left-sidebar">
                <div className="left-sidebar-logo">
                    <span className="left-logo"><a href="/">ini logo</a></span>
                </div>
                <ul className="left-sidebar-items">
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-book item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}><span>Orders</span></li>
                    </div>
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-shopping-basket item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}>
                            <span onClick={ () => setAnu('Products') }>
                                <Link className="item-links" to="/dashboard/productmanagement">Products</Link>
                            </span>
                        </li>
                    </div>
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-user item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}>
                            <span onClick={ () => setAnu('Customers') }>
                                <Link className="item-links" to="/dashboard/customers">Customers</Link>
                            </span>
                        </li>
                    </div>
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-bar-chart item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}><span>Reports</span></li>
                    </div>
                </ul>
            </div>
            </div>
        </Fragment>
    )
}

export default Sidebar