import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'
import ProductManagement from '../../components/Dashboard/ProductManagement'
import Customers from '../../components/Dashboard/Customers'
import Orders from '../../components/Dashboard/Orders'
import Reports from '../../components/Dashboard/Reports'
import './Dashboard.css'

const Dashboard = (props) => {

    console.log(props.location.pathname.split('/')[2])

    const [ anu, setAnu ] = useState('')

        return (
            <div className="row" style={{backgroundColor: "#fdfdff", height: "100%", width: "101%"}}>
                <Sidebar setAnu={ setAnu }/>
                <div className="col-10 pl-0">
                    <div className="container">
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <a className="breadcrumb-link" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="breadcrumb-link">{props.location.pathname.split('/')[2]}</span>
                            </li>
                        </ol>
                    </div>
                        <Route path="/dashboard/orders" component={Orders}/>
                        <Route path="/dashboard/productmanagement" component={ProductManagement} />
                        <Route path="/dashboard/customers" component={Customers}/>
                        <Route path="/dashboard/reports" component={Reports}/>
                    </div>
                </div>
            </div>
        )
    
}

export default Dashboard