import React, { Fragment, useState, useEffect, useRef } from 'react'
import API from '../../services'
import AddProduct from './AddProduct'
import { Popover, Pane, Position, Button, Image } from 'evergreen-ui'
import './style/ProductManagement.css'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AddDiscount from './AddDiscount'

const ProductManagement = () => {

    const [ products, setProducts ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ categories, setCategories ] = useState([])
    const [ addProduct, setAddProduct ] = useState(false)
    const [ showIdx, setShowIdx ] = useState(null)
    const [ selected, setSelected ] = useState(null)
    const [ preview, setPreview ] = useState(null)
    const [ modal, setModal ] = useState(null)
    const [ newData, setNewData ] = useState(false)
    const [ addDiscount, setAddDiscount ] = useState(false)

    const getProducts = () => {
        API.getProductDataDashboard()
        .then(res => {
            console.log(res.data)
            setProducts(res.data)
        })
    }
    const editHandler = (val, index) => {
        console.log(val)
        setSelected({
            ...selected,
            id: val.idProduct,
            image: val.image,
            name: val.name,
            price: val.price,
            category: val.category,
            stock: val.stock, 
            satuan: val.unit,
            discount: val.discount,
            description: val.description
        })
        setShowIdx(index)
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
        products.result.map(product => {
            if (!categories.includes(product.category)) {
                categories.push(product.category)
            }
            return null
        })
        setCategories(categories)
    }, [products])

    const mounted1 = useRef(false)

    useEffect(() => {
        if (!mounted1.current) {
            mounted1.current = true
            return
        }
        getProducts()
    }, [newData])

    const buttonEditHandler = (cond) => {
        if (cond === 'cancel') {
            setSelected(null)
            setShowIdx(null)
        } else {
            let fd = new FormData()
            fd.append('product', selected.image)
            fd.append('data', JSON.stringify(selected))
            API.updateProduct(fd)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        type: "success",
                        title: res.data
                    })
                }
                setShowIdx(null)
                setSelected(null)
                getProducts()
            })
        }
    }

    const removeHandler = (name, id) => {
        API.removeProduct({name, id})
        .then(res => {
            Swal.fire({
                type: "success",
                title: res.data,
                timer: 3000
            })
        })
        setNewData(!newData)
    }

    const fileBtn = useRef('fileBtn')

    const fileBtnClick = () => fileBtn.current.click() 

    const uploadHandler = e => {
        setSelected({...selected, image: e})
        setPreview(URL.createObjectURL(e))
    }

    const renderProduct = () => {
        let render = products.result.map( (product, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    {
                        showIdx === index ?
                        <>
                        <td>
                            <input ref={ fileBtn } style={{ display: "none" }} type="file" onChange={ e => uploadHandler(e.target.files[0]) }/>
                            <button className="btn btn-outline-info p-1" onClick={ fileBtnClick }>
                                Input File
                            </button>
                            {
                                preview ? 
                                <span style={{ color: "blue", cursor: "pointer" }} onClick={() => window.open(preview)}>Preview</span>
                                :
                                <span style={{ color: "blue", cursor: "pointer" }} onClick={() => window.open('http://localhost:9000/' + selected.image)}>Preview</span>
                            }
                        </td>
                        <td><input style={{ width: "100px" }} type="text" onChange={e => setSelected({...selected, name: e.target.value})} value={selected.name}/></td>
                        <td><input style={{ width: "100px" }} type="text" onChange={e => setSelected({...selected, price: e.target.value})} value={selected.price}/></td>
                        <td>
                            <select value={selected.category} onChange={ e => setSelected({...selected, category: e.target.value}) }>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </td>
                        <td><input style={{ width: "100px" }} type="text" onChange={e => setSelected({...selected, stock: e.target.value})} value={selected.stock}/></td>
                        <td><input style={{ width: "100px" }} type="text" onChange={e => setSelected({...selected, satuan: e.target.value})} value={selected.satuan}/></td>
                        <td>
                            <button className="btn btn-info" onClick={ () => setModal(index) }>Edit Description</button>
                            <Modal
                            show={index === modal}
                            onHide={() => setModal(null)}
                            >
                                <Modal.Header>
                                    Description
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea cols="40" rows="10" value={selected.description} onChange={ e => setSelected({...selected, description: e.target.value}) }/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-outline-danger" onClick={ () => setModal(null) }>Close</button>
                                </Modal.Footer>
                            </Modal>   
                        </td>
                        <td>
                            <select value={selected.discount} onChange={ e => setSelected({...selected, discount: e.target.value}) }>
                                {products.discount.map(disc => (
                                    <option key={disc.id} value={disc.id}>{disc.id}</option>
                                ))}
                            </select>
                        </td>
                        {/* <input style={{ width: "100px" }} type="text" onChange={e => setSelected({...selected, discount: e.target.value})} value={selected.discount}/> */}
                        <td>
                            <button className="btn btn-outline-warning" onClick={ () => buttonEditHandler('cancel') }>cancel</button>
                            <button className="btn btn-outline-success" onClick={ () => buttonEditHandler('save') }>Save</button>
                        </td>
                        </>
                        :
                    <>
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
                        </td>
                        <td>
                            <span>{product.name}</span>
                        </td>
                        <td>{product.price.toLocaleString('id')}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>{product.unit}</td>
                        <td>
                            <button className="btn btn-info" onClick={ () => setModal(product.idProduct) }>Preview Description</button>
                            <Modal
                            show={product.idProduct === modal}
                            onHide={() => setModal(null)}
                            >
                                <Modal.Header>
                                    Description
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea readOnly cols="40" rows="10" value={product.description}/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-outline-danger" onClick={ () => setModal(null) }>Close</button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                        <td>{product.discAvailable === 'no_disc' ? 'Inactive' : 'Discout ' + product.discAvailable.split('_')[1] + '%'}</td>
                        <td>
                            <button onClick={ () => editHandler(product, index) } className="btn btn-warning mr-2">Edit</button>
                            <button onClick={ () => removeHandler(product.name, product.id) } className="btn btn-danger">Delete</button>
                        </td>
                    </>
                    }
                </tr>
            )
        })
        return render
    }

    return (
        <Fragment>
            <div className="d-inline-flex">
                <span style={{fontSize: "30px"}}>Products</span>
                <button onClick={ () => setAddDiscount(true) } className="btn-product-add">Add Discount</button>
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
                             <th>Description</th>
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
        
            { addProduct ? <AddProduct setNewData={ setNewData } products={ products }  categories={ categories } setAddProduct={ setAddProduct } /> : null}
            {
                products ?
                <AddDiscount 
                discount={products.discount}
                addDiscount={ addDiscount }
                setAddDiscount={ setAddDiscount }
                setNewData={ setNewData }/>
                :
                null
            }
        </Fragment>
    )
}

export default ProductManagement