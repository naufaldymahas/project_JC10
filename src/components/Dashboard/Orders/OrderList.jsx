import React, { useState, useEffect, Fragment } from 'react'
import API from '../../../services'
import moment from 'moment'
import OrderDetail from './OrderDetail'

const OrderList = ({ props }) => {

    const [orders, setOrders] = useState()

    const [idx, setIdx] = useState(null)

    const [showPage, setShowPage] = useState()

    let [maxPage, setMaxPage] = useState()

    const currentPage = props.location.pathname.split('/')[4]

    useEffect(() => {
        API.getAllTransaction()
        .then(res => setOrders(res.data))
    }, [])

    useEffect(() => {
        if (!orders) return
        setMaxPage(Math.ceil(orders.length/10))
        if (currentPage < 1) props.history.push('/dashboard/orders/orderlist/' + 1)
        if (maxPage) {
            if (currentPage > maxPage) props.history.push('/dashboard/orders/orderlist/' + maxPage)
        }
        sPage()
    }, [currentPage, orders, maxPage])

    const sPage = () => {
        let arr = []
        if (currentPage === 1) {
            for (let i = 0; i < 10*currentPage; i++) {
                arr.push(orders[i])
            }
        } else {
            for (let i = (10*currentPage)-10; i < 10*currentPage; i++) {
                if (orders[i]) arr.push(orders[i])
            }
        }
        setShowPage(arr)
    }

    const pagination = () => {
        let page = []
        if (currentPage <= 1) {
            page.push(
            <li key={Math.random()} className="page-item disabled">
                <button className="page-link">Previous</button>
            </li>
            ) 
        } else {
            page.push(
                <li key={Math.random()} className="page-item">
                    <button onClick={ () => props.history.push('/dashboard/orders/orderlist/' + (currentPage-1)) } className="page-link">Previous</button>
                </li>
            )
        }
        for (let i = 1; i <= maxPage; i++) {
            if (i == currentPage) {
                page.push(
                    <li key={i} className="page-item active" aria-current="page">
                        <button className="page-link">{i}<span className="sr-only">(current)</span></button>
                    </li>
                )
            } else {
                page.push(
                    <li key={i} className="page-item">
                        <button onClick={ () => props.history.push('/dashboard/orders/orderlist/' + i) } className="page-link">{i}</button>
                    </li>
                )
            }
        }
        if (currentPage >= maxPage) page.push(
            <li key={Math.random()} className="page-item disabled">
                <button className="page-link">Next</button>
            </li>
        )
        else page.push(
            <li key={Math.random()} className="page-item">
                <button className="page-link" onClick={ () => props.history.push('/dashboard/orders/orderlist/' + currentPage+1) }>Next</button>
            </li>
        )
        return page
    }

    const renderOrders = () => {
        let list = showPage.map((order) => {
            return (
                <tr key={order.transactionId}>
                    <td>{order.transactionId}</td>
                    <td>{order.userName}</td>
                    <td onClick={ () => setIdx(order.transactionId) } style={{ color: "blue", cursor: "pointer" }}>See Order</td>
                    <td>Rp. {(renderTotalPrice(order.products) + 10000).toLocaleString('id')}</td>
                    <td>{order.status}</td>
                    <td>{moment(order.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <OrderDetail
                    transactionId={order.transactionId}
                    orders={order.products}
                    idx={idx}
                    setIdx={setIdx}
                    renderTotalPrice={renderTotalPrice}/>
                </tr>
            )
        })
        return list
    }

    const renderTotalPrice = (orders) => {
        let total = 0
        orders.map(order => {
            if (order.productDiscount) total += (order.productPrice - (order.productPrice * order.productDiscount/100)) * order.productQty
            else total += order.productPrice * order.productQty
        })
        return total
    }

    if (!showPage) return <h4>Loading</h4>
    return (
        <Fragment>
        <div className="mt-3 table-responsive">
        <h4>Order List</h4>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Name</th>
                        <th>Order List</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {renderOrders()}
                </tbody>
            </table>
        </div>

        <nav aria-label="...">
            <ul className="pagination">
                {pagination()}
            </ul>
        </nav>
        </Fragment>
    )
}

export default OrderList
