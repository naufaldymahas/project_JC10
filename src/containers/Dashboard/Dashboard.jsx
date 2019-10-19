import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import ProductManagement from '../../components/Dashboard/ProductManagement'
import AddProduct from '../../components/Dashboard/AddProduct'
import './Dashboard.css'

const Dashboard = () => {

    const [ addProduct, setAddProduct ] = useState(false)

        return (
            <div style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
                <Sidebar/>
                <div style={{marginLeft: "200px"}}>
                    <div className="container">
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <a className="breadcrumb-link" href="/dashboard">Dashboard</a>
                            </li>
                        </ol>
                    </div>
                    <ProductManagement setAddProduct={ setAddProduct } />
                    { addProduct ? <AddProduct setAddProduct={ setAddProduct } /> : null}
                    </div>
                </div>
            </div>
        )
    
}

export default Dashboard