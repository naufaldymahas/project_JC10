import React, { useState } from 'react'
import './style/AddProduct.css'

const AddProduct = ({ setAddProduct }) => {

    const [ data, setData ] = useState({
        productName: '',
        productPrice: '',
        productCategory: '',
        productImage: ''
    })

    const inputHandler = (cond, e) => {
        let { value } = e.target
        if (cond === 'name') {
            setData({...data, productName: value})
        } else if (cond === 'price') {
            {isNaN(value) ? setData({...data, productPrice: ''}) : setData({...data, productPrice: value})}
        } else if (cond === 'category') {
            setData({...data, productCategory: value})
        }
    }

    return (
        <div className="modal-add">
            <div className="modal-content-add">
                <form>
                <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="pn">Product Name</label>
                                    <input value={data.productName} onChange={ e => inputHandler('name', e) } type="text" className="form-control" id="pn"/>
                                </div>
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="price">Price</label>
                                    <input placeholder={0} value={data.productPrice} onChange={ e => inputHandler('price', e) } type="text" className="form-control" id="price"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="category">Category</label>
                            <input value={data.productCategory} onChange={ e => inputHandler('category', e) } className="form-control" type="text" id="category"/>
                        </div>              
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="image">Image</label>
                            <br/>
                            <input type="file" id="image"/>
                        </div>              
                </form>
                <div>
                    <button className="btn btn-primary mr-2">Submit</button>
                    <button onClick={ () => setAddProduct(false) } className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
