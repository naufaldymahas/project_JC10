import React, { useState, useRef } from 'react'
import './style/AddProduct.css'
import API from '../../services'
import Swal from 'sweetalert2'

const AddProduct = ({ setAddProduct, categories }) => {

    const [ data, setData ] = useState({
        productName: '',
        productPrice: '',
        productCategory: '',
        productImage: '',
        productDescription: ''
    })

    const [ warning, setWarning ] = useState('')

    const fileBtn = useRef('fileBtn')

    const focusFileBtn = () => fileBtn.current.click()

    const inputHandler = (cond, e) => {
        let { value } = e.target
        if (cond === 'name') {
            setData({...data, productName: value})
        } else if (cond === 'price') {
            if (isNaN(value)) {
                setData({...data, productPrice: ''})
            } else {
                setData({...data, productPrice: value})
            }
        } else if (cond === 'category') {
            setData({...data, productCategory: value})
        } else if (cond ==='description') {
            setData({...data, productDescription: value})
        } else {
            let file = e.target.files[0]
            if (file.size > 2000000) {
                setWarning('Anda memasukkan gambar lebih dari 2mb!')
            } else {
                setData({...data, productImage: e.target.files[0]})
            }
        }
    }


    const submitHandler = () => {
        if (data.productCategory && data.productDescription && data.productImage && data.productName && data.productPrice) {
            let fd = new FormData()
            let DATA = {
                name: data.productName,
                price: data.productPrice,
                description: data.productDescription,
                category: data.productCategory
            }
            fd.append('product', data.productImage)
            fd.append('data', JSON.stringify(DATA))
            API.addProducts(fd)
            .then(res => {
            let { message } = res.data
            Swal.fire({
                type: 'success',
                title: message,
                timer: 1000
            })
            setAddProduct(false)
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Please fill the form!'
            })
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
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="category">Description</label>
                            <input value={data.productDescription} onChange={ e => inputHandler('description', e) } className="form-control" type="text" id="category"/>
                        </div>              
                        <div className="form-group">
                            <select defaultValue={data.categories} onChange={ e => inputHandler('category', e) }>
                                <option value=''>Select Category: </option>
                                {categories.map((category, index) => {
                                    return <option key={index + 1} value={category}>{category}</option>
                                })}
                            </select>
                        </div>              
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="image">Image</label>
                            <br/>
                            <input className='d-none' ref={fileBtn} onChange={ e => inputHandler('image', e) } type="file" id="image"/>
                            <input className='btn btn-success' 
                            value={ data.productImage ? data.productImage.name : 'Select File' }
                            type='button' onClick={focusFileBtn}/>
                            <span style={{fontSize: '14px'}} className="text-danger">{!warning ? null : warning}</span>
                            <br/>
                            <small className="text-danger">maximum file 2mb</small>
                        </div>              
                </form>
            <div>
                    <button onClick={submitHandler} className="btn btn-primary mr-2">Submit</button>
                    <button onClick={ () => setAddProduct(false) } className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
