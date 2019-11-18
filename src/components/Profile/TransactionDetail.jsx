import React from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment'

const TransactionDetail = ({ setShowDetail, showDetail, index, transactionId, created_at, notes, address, products, status }) => {

    const totalHarga = () => {
        let result = 0
        products.forEach(product => {
            result += product.productPrice * product.productQty
        })
        return result
    }

    const potongan = () => {
        let result = 0
        products.forEach(val => {
            if (val.productDiscount !== "0") result += (val.productPrice * val.productDiscount/100 ) * val.productQty
        })
        return result
    }

    return (
        <Modal show={ index == showDetail } onHide={ setShowDetail }>
            <Modal.Header closeButton>
                Detail Pesanan {transactionId}
            </Modal.Header>
            <Modal.Body style={{ height: "300px", overflowY: "scroll", paddingTop: "1px" }}>
                <div className="col-md-12 px-0" style={{ borderBottom: "1px solid #dee2e6", fontSize: "15px" }}>
                    <div className="d-flex">
                        <div style={{ display: "grid", flex: "1" }}>
                            <span className="text-muted">Nomor Invoice</span>
                            <span>{transactionId}</span>
                        </div>
                        <div style={{ display: "grid", flex: "1" }}>
                            <span className="text-muted">Status</span>
                            <span>{status}</span>
                        </div>
                    </div>
                    <div style={{ display: "grid" }}>
                        <span className="text-muted">Tanggal Pembelian</span>
                        <span>{moment(created_at).format('D MMM YYYY HH:mm')} WIB</span>
                    </div>
                </div>
                <div style={{ borderBottom: "1px solid #dee2e6", fontSize: "15px" }} className="pb-1">
                    <div className="d-flex">
                        <span className="text-muted" style={{ flex: "1" }}>Daftar Produk</span>
                        <span className="text-muted" style={{ flex: "1" }}>Harga Barang</span>
                    </div>
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="d-flex mb-2">
                                <div className="d-inline-flex" style={{ flex: "1" }}>
                                    <div className="my-auto" style={{ height: "44px", width: "44px" }}>
                                        <img style={{ height: "100%", width: "auto" }} src={'http://localhost:9000/' + product.productImage} alt="gambar"/>
                                    </div>
                                    <div className="ml-4" style={{ display: "grid" }}>
                                        <span style={{ fontSize: "15px" }}>{product.productName}</span>
                                        <span className="text-muted" style={{ fontSize: "smaller" }}>{product.productQty} x 
                                        {
                                            product.productDiscount !== "0" ? 
                                            <>
                                                <span style={{ textDecoration: "line-through" }}>Rp. {product.productPrice.toLocaleString('id')}</span>
                                                <p className="mb-0">Rp. {(product.productPrice - (product.productDiscount/100 * product.productPrice)).toLocaleString('id')}</p>
                                            </>
                                            :
                                            <span>Rp. {product.productPrice}</span>
                                        }
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flex: "1" }}>
                                {
                                    product.productDiscount !== "0" ? 
                                    <>
                                    <span className="my-auto">Rp. {((product.productPrice - (product.productDiscount/100 * product.productPrice)) * product.productQty).toLocaleString('id')}</span>
                                    </>
                                    :
                                    <span className="my-auto">Rp. {(product.productQty * product.productPrice).toLocaleString('id')}</span>
                                }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{ fontSize: "15px", borderBottom: "1px solid #dee2e6" }}>
                    <span className="px-0 text-muted">Pengiriman</span>
                    <p className="mb-1">Dikirim kepada {address[0].recipient}</p>
                    <p className="mb-0" style={{ textAlign: "justify", width: "90%" }}>{address[0].addressDetail}, {address[0].district}, {address[0].city}, {address[0].postalCode}, DKI Jakarta</p>
                    <p className="mb-0">Telp: +62{address[0].handphone}</p>
                </div>
                {
                    notes ?
                    <div style={{ fontSize: "15px", borderBottom: "1px solid #dee2e6" }}>
                        <span className="px-0 text-muted">Notes</span>
                        <p>{notes}</p>
                    </div>
                    :
                    null
                }
                <div style={{ fontSize: "15px", paddingBottom: "10px" }}>
                    <span className="px-0 text-muted">Pembayaran</span>
                    <div className="row">
                        <div className="col-6" style={{ display: "grid", borderRight: "1px solid #dee2e6" }}>
                            <span className="px-0">Total Harga {products.length} Barang</span>
                            <span className="px-0">Ongkos Kirim</span>
                            <span className="px-0">Total Belanja</span>
                            <span className="px-0">Potongan</span>
                            <span className="px-0">Total Pembayaran</span>
                        </div>
                        <div className="col-6" style={{ display: "grid" }}>
                            <span className="px-0">Rp. {totalHarga().toLocaleString('id')}</span>
                            <span className="px-0">Rp. 10.000</span>
                            <span className="px-0">Rp. {(totalHarga()+10000).toLocaleString('id')}</span>
                            <span className="px-0">Rp. {potongan().toLocaleString('id')}</span>
                            <span className="px-0" style={{ color: "green" }}>Rp. {((totalHarga()+10000)-potongan()).toLocaleString('id')}</span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={ () => setShowDetail(null) } className="btn btn-success">Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default TransactionDetail
