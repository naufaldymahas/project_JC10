import React, { Fragment } from 'react'
import './style/Sidebar.css'

export const Sidebar = () => {
    return (
        <Fragment>
            <div className="left-sidebar">
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
                        <li style={{marginLeft: "25px"}}><span>Products</span></li>
                    </div>
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-user item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}><span>Customers</span></li>
                    </div>
                    <div className="items-container">
                        <i style={{position: "absolute", marginTop: "5px"}} className="fa fa-bar-chart item-sidebar"></i>
                        <li style={{marginLeft: "25px"}}><span>Reports</span></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

export default Sidebar