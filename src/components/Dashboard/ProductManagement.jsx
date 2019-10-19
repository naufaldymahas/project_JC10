import React, { Fragment, useState, useEffect } from 'react'
import API from '../../services'
import './style/ProductManagement.css'

const ProductManagement = ({ setAddProduct }) => {

    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const getProducts = () => {
        API.getProductsDataAPI()
        .then(res => setProducts(res.data.allProducts))
    }

    // const newProduct = ( val ) => {
    //     setAddProduct(val)
    // }

    useEffect(() => {
        console.log(setAddProduct)
        getProducts()
        setTimeout(() => {
            setLoading(false)
        }, 800);
    }, [])

    const renderProduct = () => {
        let render = products.map( (product, index) => {
            return (
                <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                        <button className="btn btn-warning mr-2">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
        return render
    }

    return (
        <Fragment>
            <div>
                <span style={{fontSize: "30px"}}>Products</span>
                <button onClick={ () => setAddProduct(true) } className="btn-product-add">Add Product</button>
            </div>
            <div className="mt-3">
                {loading ? 
                <div className="text-center my-5">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
                
                : 

                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProduct()}
                    </tbody>
                </table>
                }
                
            </div>
        </Fragment>
    )
}

export default ProductManagement