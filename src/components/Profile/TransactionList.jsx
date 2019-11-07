import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import './style/TransactionList.css'
import API from '../../services'
import { Modal } from 'react-bootstrap'
import UploadPaymentProof from './UploadPaymentProof'
import TransactionDetail from './TransactionDetail'
// import { Popover, Pane, Position, Button, Image, Dialog } from 'evergreen-ui'

const TransactionList = ({ id }) => {

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const [showIdx, setShowIdx] = useState(null)
    const [showDetail, setShowDetail] = useState(null)
    const [uploadPayment, setUploadPayment] = useState(null)

    useEffect(() => {
        API.getTransactionList({ id })
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [])

    console.log(data)

    const renderProductList = (products, index) => {
            return (
                <>
                    <div className="d-flex" style={{ borderBottom: "1px solid rgba(0,0,0,.125)", height: "100px" }}>
                        <div className="d-inline-flex my-auto col-4" style={{ borderRight: "1px solid rgba(0,0,0,.125)", height: "80px" }}>
                            <div className="my-auto" style={{ height: "50px" }}>
                                <img className="h-100" src={'http://localhost:9000/' + products[0].productImage} alt="gambar"/>
                            </div>
                            <div className="px-2 my-auto">
                                <h5 className="mb-0">{products[0].productName}</h5>
                                {
                                    products[0].productDiscount != "0" && products[0].productDiscount != null ? 
                                    <div style={{ display: "grid" }}>
                                        <span style={{ textDecoration: "line-through" }} className="px-0">Rp. {(products[0].productPrice).toLocaleString('id')}</span>
                                        <span className="px-0">Rp. {((products[0].productPrice - (products[0].productDiscount/100 * products[0].productPrice)) * products[0].productQty).toLocaleString('id')}/<span className="px-0" style={{ fontSize: "smaller" }}>{products[0].productUnit}</span></span>
                                    </div>
                                    :
                                    <span className="px-0">Rp. {(products[0].productQty * products[0].productPrice).toLocaleString('id')}</span>
                                }
                            </div>
                        </div>
                        <div className="col-4 transaction-items" style={{ height: "80px" }}>
                            <span className="px-0">Jumlah Pembelian {products[0].productQty}</span>
                        </div>
                        <div className="col-4 my-auto" style={{ display: "grid" }}>
                            <span className="px-0">Total Harga</span>
                            {
                                products[0].productDiscount !== "0" ? 
                                <span className="px-0">Rp. {((products[0].productPrice - (products[0].productDiscount/100 * products[0].productPrice)) * products[0].productQty).toLocaleString('id')}</span>
                                :
                                <span className="px-0">Rp. {(products[0].productQty * products[0].productPrice).toLocaleString('id')}</span>
                            }
                        </div>
                    </div>
                    {
                        showIdx == index ?
                        renderNextProduct(products)
                        :
                        null
                    }
                </>
            )
    }

    const renderNextProduct = (products) => {
        let render = products.map((product, index) => {
            if (index > 0) {
                return (
                    <div className="d-flex" style={{ borderBottom: "1px solid rgba(0,0,0,.125)", height: "100px" }}>
                        <div className="d-inline-flex my-auto col-4" style={{ borderRight: "1px solid rgba(0,0,0,.125)", height: "80px" }}>
                            <div className="my-auto" style={{ height: "50px" }}>
                                <img className="h-100" src={'http://localhost:9000/' + product.productImage} alt="gambar"/>
                            </div>
                            <div className="px-2 my-auto">
                                <h5 className="mb-0">{product.productName}</h5>
                                {
                                    product.productDiscount != "0" && product.productDiscount != null ? 
                                    <div style={{ display: "grid" }}>
                                        <span style={{ textDecoration: "line-through" }} className="px-0">Rp. {(product.productPrice).toLocaleString('id')}</span>
                                        <span className="px-0">Rp. {((product.productPrice - (product.productDiscount/100 * product.productPrice)) * product.productQty).toLocaleString('id')}/<span className="px-0" style={{ fontSize: "smaller" }}>{product.productUnit}</span></span>
                                    </div>
                                    :
                                    <span className="px-0">Rp. {(product.productQty * product.productPrice).toLocaleString('id')}</span>
                                }
                            </div>
                        </div>
                        <div className="col-4 transaction-items" style={{ height: "80px" }}>
                            <span className="px-0">Jumlah Pembelian {product.productQty}</span>
                        </div>
                        <div className="col-4 my-auto" style={{ display: "grid" }}>
                            <span className="px-0">Total Harga</span>
                            {
                                product.productDiscount !== "0" ? 
                                <span className="px-0">Rp. {((product.productPrice - (product.productDiscount/100 * product.productPrice)) * product.productQty).toLocaleString('id')}</span>
                                :
                                <span className="px-0">Rp. {(product.productQty * product.productPrice).toLocaleString('id')}</span>
                            }
                        </div>
                    </div>
                )
            }
        })
        return render
    }

    const renderTotalPrice = (products) => {
        let price = 0
        products.map(val => {
            if (val.productDiscount) price += (val.productPrice - (val.productPrice * val.productDiscount/100)) * val.productQty
            else price += val.productPrice * val.productQty
        })
        return (price + 10000).toLocaleString('id')
    }

    // const renderModalList = (products) => {
    //     let render = products.map((product, index) => {
    //         return (
    //             <Fragment key={index}>
    //                 <div className="d-flex">
    //                     <div className="col-5 px-0 d-inline-flex">
    //                         <div style={{ width: "55px", flexDirection: "column", display: "flex", justifyContent: "center", overflow: "hidden" }}>
    //                             <img className="w-100" src={'http://localhost:9000/' + product.productImage} alt="gambar"/>
    //                         </div>
    //                         <div style={{ display: "grid" }} className="pl-1">
    //                             <span className="px-0">{product.productName}</span>
    //                             <span className="px-0 text-muted"
    //                             style={{ fontSize: "smaller" }}
    //                             >{product.productUnit + ' x ' + 'Rp. ' + product.productPrice.toLocaleString('id')}</span>
    //                         </div>
    //                     </div>
    //                     <div className="col-4 px-0 d-flex text-center"
    //                     style={{ flexDirection: "column", justifyContent: "center" }}>
    //                         <span>{product.productQty}</span>
    //                     </div>
    //                     <div className="col-3 px-0 d-flex text-center"
    //                     style={{ flexDirection: "column", justifyContent: "center" }}>
    //                         <span>Rp. {(product.productQty*product.productPrice).toLocaleString('id')}</span>
    //                     </div>
    //                 </div>
    //             </Fragment>
    //         )
    //     })
    //     return render
    // }

    const renderTransactionList = () => {
        let x = data.map((val, index) => {
            return (
                <li key={ index } className="card mb-2">
                    <div>
                        <div className="p-1" style={{ borderBottom: "1px solid rgba(0,0,0,.125)", backgroundColor: "green" }}>
                            <span style={{ color: "white" }}>{moment(val.created_at).format('D MMM YYYY kk:mm')}</span>
                        </div>
                        <div style={{ borderBottom: "1px solid rgba(0,0,0,.125)" }}>
                            <div className="w-100 d-inline-flex" style={{ height: "80px" }}>
                                <div className="col-4 transaction-items">
                                    <span className="px-0">Invoice</span>
                                    <span className="px-0">{val.transactionId}</span>
                                </div>
                                <div className="col-4 my-auto" style={{ borderRight: "1px solid rgba(0,0,0,.125)" }}>
                                    <span className="px-0">Status</span>
                                    <p className="mb-0">{val.status}</p>
                                </div>
                                <div className="col-4 my-auto">
                                    <span className="px-0">Total Belanja</span>
                                    <p className="mb-0">Rp. {renderTotalPrice(val.products)}</p>
                                </div>
                            </div>
                        </div>
                        {renderProductList(val.products, index)}
                        <div className="text-center py-2" style={{ borderBottom: "1px solid rgba(0,0,0,.125)" }}>
                            {
                                showIdx == index ?
                                <button style={{ color: "green" }} className="btn-transaction-detail" onClick={ () => setShowIdx(null) }>
                                    { 
                                        val.products.length > 1 ?
                                        // `Lihat ${val.products.length - 1 } Produk Lainnya`
                                        <span>Tutup {val.products.length - 1} Produk Lainnya <i className="fa fa-caret-up"></i></span>
                                        :
                                        null
                                    }
                                </button>
                                :
                                <button style={{ color: "green" }} className="btn-transaction-detail" onClick={ () => setShowIdx(index) }>
                                { 
                                    val.products.length > 1 ?
                                    <span>Lihat {val.products.length - 1} Produk Lainnya <i className="fa fa-caret-down"></i></span>
                                    :
                                    null
                                }
                            </button>
                            }
                        </div>
                        <div className="d-flex" style={{ backgroundColor: "green" }}>
                                <button style={{ color: "white", flex: "1", textAlign: "left" }} className="btn"
                                onClick={ () => setShowDetail(index) }>Lihat Detail Pesanan</button>
                                <button style={{ color: "white", flex: "1", textAlign: "right" }} className="btn"
                                onClick={ () => setUploadPayment(index) }>Input Bukti Pembayaran</button>
                        </div>
                        <UploadPaymentProof
                        index={ index }
                        uploadPayment={ uploadPayment } 
                        setUploadPayment={ setUploadPayment }
                        transactionId={ val.transactionId }
                        id={ id }
                        paymentProof={ val.paymentProof }/>
                        <TransactionDetail
                        setShowDetail={ setShowDetail }
                        showDetail={ showDetail }
                        index={ index }
                        transactionId={ val.transactionId }
                        created_at={ val.created_at }
                        notes={ val.notes }
                        address={ val.address }
                        products={ val.products }
                        />
                        
                        {/* <Modal centered show={ showIdx == index } onHide={ () => setShowIdx(null) }>
                            <Modal.Header>
                                <div style={{ display: "grid"}}>
                                    <span className="text-muted" style={{ fontSize: "smaller" }}>Nomor Invoice</span>
                                    <span style={{ fontSize: "15px" }}>{val.transactionId}</span>
                                </div>
                                <div style={{ display: "grid" }}>
                                    <span className="text-muted" style={{ fontSize: "smaller" }}>Status</span>
                                    <span style={{ fontSize: "15px" }}>Menunggu Pembayaran</span>
                                </div>
                            </Modal.Header>
                            <Modal.Body style={{ minHeight: "200px", flexDirection: "column", justifyContent: "center" }} className="d-flex">
                                <div className="d-inline-flex w-100">
                                    <span className="col-5 px-0">Daftar Produk</span>
                                    <span className="col-4 px-0 text-center">Quantity</span>
                                    <span className="col-3 px-0 text-center">Total Harga</span>
                                </div>
                                {renderModalList(val.products)}
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-danger" onClick={() => setShowIdx(null)}>Tutup</button>
                            </Modal.Footer>
                        </Modal> */}
                    </div>
                </li>
            )
        })
        return x
    }

    if (!loading) {
        return (
            <div>
                ini daftar transaksi
                <div>
                    <ul className="px-0 mb-0 list-unstyled">
                        {renderTransactionList()}
                        {/* <li className="card mb-2">
                            <div>
                                <div className="p-1" style={{ borderBottom: "1px solid rgba(0,0,0,.125)" }}>
                                    <span>{moment().format('D MMM YYYY')}</span>
                                </div>
                                <div style={{ borderBottom: "1px solid rgba(0,0,0,.125)" }}>
                                    <div className="w-100 d-inline-flex" style={{ height: "80px" }}>
                                        <div className="col-4 transaction-items">
                                            <span className="px-0">Invoice</span>
                                            <span className="px-0">{`(123456789)`}</span>
                                        </div>
                                        <div className="col-4 my-auto" style={{ borderRight: "1px solid rgba(0,0,0,.125)" }}>
                                            <span className="px-0">Status</span>
                                            <p className="mb-0">Menunggu Pembayaran</p>
                                        </div>
                                        <div className="col-4 my-auto">
                                            <span className="px-0">Total Belanja</span>
                                            <p className="mb-0">Rp. 100.000</p>
                                        </div>
                                    </div>
                                </div>
                                {renderTransactionList()}
                                <div className="position-relative" style={{ height: "45px" }}>
                                    <div className="position-absolute" style={{ top: "5px", left: "10px" }}>
                                        <button className="btn">Lihat Detail</button>
                                    </div>
                                    <div className="position-absolute" style={{ top: "5px", right: "10px" }}>
                                        <button className="btn">Input Bukti Pembayaran</button>
                                        <span className="btn">Preview</span>
                                        <button className="btn">Selesai</button>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                        
                    </ul>
                </div>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default TransactionList