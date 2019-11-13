import React, { useEffect, useState, Fragment } from 'react'
import API from '../../services'
import moment from '../../../../my-api/node_modules/moment/moment'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap'

const Orders = () => {
    const [ transactions, setTransactions ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        getData()
        setTimeout(() => {
            setLoading(false)
        }, 800);
    }, [])

    const approvalHandler = (transactionId, cond) => {
        API.approvalPayment({transactionId, cond})
        .then(res => {
            console.log(res.data)
            API.approvalUpdateStock(res.data)
            .then(() => {
                getData()
            })
        })
    }

    const getData = () => {
        API.getAllTransaction()
        .then(res => setTransactions(res.data))
    }

    const updateShipping = (transactionId) => {
        console.log(transactionId)
        API.updateShipping({transactionId})
        .then(() => {
            alert('Status diubah')
            getData()
        })
    }
    
    const renderList = () => {
        let render = transactions.map( (transaction, index) => {
            return (
                <tr key={ transaction.transactionId }>
                    <td>{ transaction.transactionId }</td>
                    <td>{ transaction.userName }</td>
                    <td>{ moment(transaction.deadline).format('YYYY-MM-DD kk:mm') }</td>
                    <td>{ transaction.accountHolder }</td>
                    <td>{ transaction.accountNumber }</td>
                    <td>{ renderTotalPrice(transaction.products) }</td>
                    {
                        transaction.paymentProof ?
                        <td style={{ color: "blue", cursor: "pointer" }} onClick={() => window.open('http://localhost:9000/' + transaction.paymentProof)}>See Image</td>
                        :
                        <td>No Image</td>
                    }
                    <td>
                        { 
                            transaction.status === "Pembayaran Berhasil" ?
                            <div style={{ display: "grid" }}>
                                <span>{transaction.status}</span>
                                <span onClick={ () => updateShipping(transaction.transactionId) } style={{ cursor: "pointer", color: "blue" }}>Kirim Barang</span>
                            </div>
                            :
                            <span className="px-0">{transaction.status}</span>
                        }
                     </td>
                    <td>
                        <DropdownButton title="Action">
                            {console.log(transaction.transactionId)}
                            <Dropdown.Item onClick={ () => approvalHandler(transaction.transactionId, "Pembayaran Berhasil") }>Approve</Dropdown.Item>
                            <Dropdown.Item onClick={ () => approvalHandler(transaction.transactionId, "Pembayaran Ditolak") }>Reject</Dropdown.Item>
                        </DropdownButton>
                    </td>
                </tr>
            )
        } )
        return render
    }

    const renderTotalPrice = (products) => {
        let totalPrice = 0
        products.forEach(product => {
            console.log(product)
            // if (product.productDiscount == 0 ||)
            if (product.productDiscount == 0 || product.productDiscount == null) totalPrice += product.productPrice * product.productQty
            else totalPrice += (product.productPrice - (product.productPrice * product.productDiscount/100)) * product.productQty
        })
        return (totalPrice + 10000).toLocaleString('id')
    }

    return (
       <Fragment>
            <div>
                <span style={{fontSize: "30px"}}>Orders</span>
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
                            <th style={{ verticalAlign: "middle" }}>Invoice</th>
                            <th style={{ verticalAlign: "middle" }}>Name</th>
                            <th style={{ verticalAlign: "middle" }}>Deadline</th>
                            <th style={{ verticalAlign: "middle" }}>Account Holder</th>
                            <th style={{ verticalAlign: "middle" }}>Account Number</th>
                            <th style={{ verticalAlign: "middle" }}>Total Price</th>
                            <th style={{ verticalAlign: "middle" }}>Payment Proof</th>
                            <th style={{ verticalAlign: "middle" }}>Status</th>
                            <th style={{ verticalAlign: "middle" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList()}
                    </tbody>
                </table>
                }
                
            </div>
        </Fragment>
    )
}

export default Orders
