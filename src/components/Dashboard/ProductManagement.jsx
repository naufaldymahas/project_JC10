import React, { Fragment, useState, useEffect, useRef } from 'react'
import API from '../../services'
import AddProduct from './AddProduct'
import { Popover, Pane, Position, Button, Image } from 'evergreen-ui'
import './style/ProductManagement.css'

const ProductManagement = () => {

    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ categories, setCategories ] = useState([])
    const [ addProduct, setAddProduct ] = useState(false)

    const getProducts = () => {
        API.getProductsDataAPI()
        .then(res => setProducts(res.data.allProducts))
    }

    useEffect(() => {
        getProducts()
        setTimeout(() => {
            setLoading(false)
        }, 800);
    }, [])

    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
            return;
        }
        let categories = []
        products.map(product => {
            if (!categories.includes(product.category)) {
                categories.push(product.category)
            }
            return null
        })
        setCategories(categories)
    }, [products])

    const renderProduct = () => {
        let render = products.map( (product, index) => {
            return (
                <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                    <Popover
                    content={
                        <Pane
                        width={240}
                        height={200}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        >
                        <Image style={{width: "100%", height: "auto"}} src={ 'http://localhost:9000/' + product.image }></Image>
                        </Pane>    
                    }
                    position={Position.RIGHT}
                    >
                    <Button intent="none" appearance="minimal">See Image</Button>
                    </Popover>
                        {/* <div className="img-table">
                            <img className="img-items" alt="gambar" src={ 'http://localhost:9000/' + product.image } />
                        </div> */}
                    </td>
                    <td>
                        <span>{product.name}</span>
                    </td>
                    <td>{product.price.toLocaleString('id')}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.unit}</td>
                    <td>{product.active ? product.active : 'Inactive'}</td>
                    <td>{product.discAvailable === 'no_disc' ? 'Inactive' : 'Discout ' + product.discAvailable.split('_')[1] + '%'}</td>
                    <td>
                        <button className="btn btn-warning mr-2">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
        return render
    }

    console.log(products)

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
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Satuan</th>
                            <th>Aktif</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProduct()}
                    </tbody>
                </table>
                }
                
            </div>
        
            { addProduct ? <AddProduct categories={ categories } setAddProduct={ setAddProduct } /> : null}

        </Fragment>
    )
}

export default ProductManagement