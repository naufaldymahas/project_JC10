import React, { Fragment } from 'react'
import { Modal } from 'react-bootstrap'

const OrderDetail = ({idx, setIdx, orders, transactionId, renderTotalPrice}) => {
    return (
        <Modal show={ transactionId === idx } onHide={ () => setIdx(null) }>
            <Modal.Header>
                Orders
            </Modal.Header>
            <Modal.Body className="py-0">
                <div style={{ fontSize: "15px" }}>
                    <div className="d-flex text-center py-2" style={{ borderBottom: "1px solid #dee2e6" }}>
                        <span className="col-md-4 px-0 font-weight-bold">Product</span>
                        <span className="col-md-4 px-0 font-weight-bold">Quantity</span>
                        <span className="col-md-4 px-0 font-weight-bold">Total Price</span>
                    </div>
                    <div className="py-2" style={{ borderBottom: "1px solid #dee2e6" }}>
                        {
                            orders.map((order, index) => (
                                <Fragment key={index}>
                                    <div className="d-flex text-center mb-2">
                                        {
                                            order.productDiscount ?
                                            <div className="col-md-4 px-0" style={{ display: "grid" }}>
                                                <span>{order.productName}</span>
                                                <span style={{ textDecoration: "line-through" }}>Rp. {order.productPrice}<small>{order.productUnit}</small></span>
                                                <span>Rp. {(order.productPrice - (order.productPrice * order.productDiscount/100)).toLocaleString('id')}/<small>{order.productUnit}</small></span>
                                            </div>
                                            :
                                            <div className="col-md-4 px-0" style={{ display: "grid" }}>
                                                <span>{order.productName}</span>
                                                <span>Rp. {order.productPrice.toLocaleString('id')}/<small>{order.productUnit}</small></span>
                                            </div>
                                        }
                                        <span className="col-md-4 px-0">{order.productQty}</span>
                                        <span className="col-md-4 px-0">Rp. {renderTotalPrice(orders).toLocaleString('id')}</span>
                                    </div>
                                </Fragment>
                            ))
                        }
                    </div>
                    <div className="my-2">
                        <div className="d-flex">
                            <span className="col-md-4 px-0 ml-auto">Shipping Cost</span>
                            <span>Rp. 10.000</span>
                        </div>
                        <div className="d-flex">
                            <span className="col-md-4 px-0 ml-auto">Sub Total Price</span>
                            <span>Rp. {(renderTotalPrice(orders)+10000).toLocaleString('id')}</span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={ () => setIdx(null) }>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderDetail
