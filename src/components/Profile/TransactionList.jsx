import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import './style/TransactionList.css'
import API from '../../services'
import UploadPaymentProof from './UploadPaymentProof'
import TransactionDetail from './TransactionDetail'

const TransactionList = ({ id }) => {

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    const [showIdx, setShowIdx] = useState(null)
    const [showDetail, setShowDetail] = useState(null)
    const [uploadPayment, setUploadPayment] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        API.getTransactionList({ id })
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [update])

    // console.log(data)

    console.log(update)

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

    const updateReceived = (transactionId) => {
        API.updateReceived({transactionId})
        .then(() => {
            alert('Barang Telah Diterima')
            setUpdate(!update)
        })
    }

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
                                {
                                    val.status === "Menunggu Pembayaran" || val.status === "Menunggu Verifikasi Admin" ?
                                    <button style={{ color: "white", flex: "1", textAlign: "right" }} className="btn"
                                    onClick={ () => setUploadPayment(index) }>Input Bukti Pembayaran</button>

                                    :
                                    val.status === "Sedang Dikirim"  ? 
                                    <button onClick={ () => updateReceived(val.transactionId) } style={{ color: "white", flex: "1", textAlign: "right" }} className="btn">
                                        Sudah Diterima
                                    </button>
                                    :
                                    null
                                }
                        </div>
                        <UploadPaymentProof
                        index={ index }
                        uploadPayment={ uploadPayment } 
                        setUploadPayment={ setUploadPayment }
                        transactionId={ val.transactionId }
                        id={ id }
                        paymentProof={ val.paymentProof }
                        update={ update }
                        setUpdate={ setUpdate }/>
                        <TransactionDetail
                        setShowDetail={ setShowDetail }
                        showDetail={ showDetail }
                        index={ index }
                        transactionId={ val.transactionId }
                        created_at={ val.created_at }
                        notes={ val.notes }
                        address={ val.address }
                        products={ val.products }
                        status={ val.status }
                        />
                        
                    </div>
                </li>
            )
        })
        return x
    }

    if (!loading) {
        return (
            <div>
                <h4 className="text-muted">Daftar Transaksi</h4>
                <div>
                    <ul className="px-0 mb-0 list-unstyled">
                        {renderTransactionList()}
                    </ul>
                </div>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default TransactionList