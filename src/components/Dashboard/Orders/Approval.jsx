import React, { useState, useEffect } from 'react'
import API from '../../../services'
import OrderDetail from './OrderDetail'
import Swal from 'sweetalert2'

const Approval = () => {

    const [data, setData] = useState()

    const [render, setRender] = useState(false)

    const [idx, setIdx] = useState()

    useEffect(() => {
        API.approvalList()
        .then(res => setData(res.data))
    }, [render])

    const renderTotalPrice = (orders) => {
        let total = 0
        orders.map(order => {
            if (order.productDiscount) total += (order.productPrice - (order.productPrice * order.productDiscount/100)) * order.productQty
            else total += order.productPrice * order.productQty
        })
        return total
    }

    const approvalHandler = (cond, transactionId) => {
        API.approvalPayment({cond, transactionId})
        .then(res => {
            console.log(res)
            setRender(!render)
            Swal.fire({
                type: "success",
                title: res.data,
                timer: 3000
            })
        })
    }
    
    if (!data) return <h4>Loading</h4>
    if (data.length === 0) return <h4>No Data</h4>
    return (
        <div className="table-responsive">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Inovice</th>
                        <th>Name</th>
                        <th>Recipient</th>
                        <th>Bank</th>
                        <th>Account Holder</th>
                        <th>Account Number</th>
                        <th>Total Price</th>
                        <th>Payment Proof</th>
                        <th>Payment Proof</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(order => (
                        <tr key={order.transactionId}>
                            <td>{order.transactionId}</td>
                            <td>{order.userName}</td>
                            <td>{order.recipient}</td>
                            <td>{order.bank}</td>
                            <td>{order.accountHolder}</td>
                            <td>{order.accountNumber}</td>
                            <td style={{ minWidth: "106px" }}>Rp. {(renderTotalPrice(order.products)+10000).toLocaleString('id')}</td>
                            <td>
                                <button className="btn" onClick={() => window.open( 'http://localhost:9000/' + order.paymentProof )}>See Image</button>
                            </td>
                            <td>
                                <span style={{ cursor: "pointer" }} onClick={ () => setIdx(order.transactionId) }>See Orders</span>
                            </td>
                            <td style={{ width: "191px" }}>
                                <button onClick={ () => approvalHandler('Pembayaran Berhasil', order.transactionId) } className="btn btn-outline-success mr-2">Approve</button>
                                <button onClick={ () => approvalHandler('Pembayaran Ditolak', order.transactionId) } className="btn btn-outline-danger">Reject</button>
                            </td>
                            <OrderDetail
                            idx={idx}
                            setIdx={setIdx}
                            renderTotalPrice={renderTotalPrice}
                            transactionId={order.transactionId}
                            orders={order.products}/>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Approval
