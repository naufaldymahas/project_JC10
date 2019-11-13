import React, { useState, useRef, useEffect } from 'react'
import './style/AddProduct.css'
import API from '../../services'
import Swal from 'sweetalert2'

const AddProduct = ({ products, setAddProduct, categories, setNewData }) => {

    const [ data, setData ] = useState({
        productName: '',
        productPrice: '',
        productCategory: '',
        productImage: '',
        productDescription: '',
        productDiscount: '',
        productStock: '',
        productUnit: ''
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
        } else if (cond === 'unit') {
            setData({...data, productUnit: value})
        } else if (cond === 'stock') {
            setData({...data, productStock: value.replace(/\D/,'')})
        } else if (cond === 'discount') {
            setData({...data, productDiscount: value})
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
        if (data.productCategory && data.productDescription && data.productImage && data.productName && data.productPrice && data.productDiscount && data.productStock && data.productUnit) {
            let fd = new FormData()
            fd.append('product', data.productImage)
            fd.append('data', JSON.stringify(data))
            API.addProducts(fd)
            .then(res => {
            let { message } = res.data
            Swal.fire({
                type: 'success',
                title: message,
                timer: 1000
            })
            setNewData(true)
            setAddProduct(false)
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Please fill the form!'
            })
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideClick)
        return () => {
            document.removeEventListener('mousedown', outsideClick)
        }
    })

    const outsideClick = e => {
        if (node.current.contains(e.target)) return
        else setAddProduct(false)
    }

    const node = useRef()

    console.log(products)

    return (
        <div className="modal-add">
            <div ref={ node } className="modal-content-add">
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
                            <div className="form-row">
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="pu">Product Unit</label>
                                    <input value={data.productUnit} onChange={ e => inputHandler('unit', e) } type="text" className="form-control" id="pu"/>
                                </div>
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="s">Stock</label>
                                    <input placeholder={0} value={data.productStock} onChange={ e => inputHandler('stock', e) } type="text" className="form-control" id="s"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="category">Description</label>
                            <input value={data.productDescription} onChange={ e => inputHandler('description', e) } className="form-control" type="text" id="category"/>
                        </div>              
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <select defaultValue={data.categories} onChange={ e => inputHandler('category', e) }>
                                        <option value=''>Select Category: </option>
                                        {categories.map((category, index) => {
                                            return <option key={index + 1} value={category}>{category}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col">
                                    <select defaultValue={data.discount} onChange={ e => inputHandler('discount', e) }>
                                        <option value=''>Select Discount: </option>
                                        {products.discount.map(disc => (
                                            <option key={disc.id} value={disc.id}>{disc.id}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
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
