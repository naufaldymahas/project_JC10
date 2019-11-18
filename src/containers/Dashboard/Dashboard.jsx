import React from 'react'
import { Route } from 'react-router-dom'
import ProductManagement from '../../components/Dashboard/ProductManagement'
import Customers from '../../components/Dashboard/Customers'
import Orders from '../../components/Dashboard/Orders'
import Reports from '../../components/Dashboard/Reports'
import Navigation from '../../components/Dashboard/Navigation'
import './Dashboard.css'

const Dashboard = (props) => {
    
        return (
            <div>
                <nav className="d-flex" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <div className="col-md-1 my-auto p-2" style={{ textAlign: "right" }}>
                        <a href="/">Home</a>
                    </div>
                    <div className="col-md-11" style={{ textAlign: "right" }}>
                        <button className="btn">Hello, You!</button>
                    </div>
                </nav>
                <Navigation props={props}/>
                <div className="px-5">
                    <Route path="/dashboard/orders/:id" component={Orders}/>
                    <Route path="/dashboard/customers" component={Customers}/>
                    <Route path="/dashboard/products" component={ProductManagement}/>
                    <Route path="/dashboard/reports" component={Reports}/>
                </div>
            </div>
        )
    
}

export default Dashboard