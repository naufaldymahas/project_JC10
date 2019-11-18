import React, { useState, useEffect } from 'react'
import API from '../../../services'
import Swal from 'sweetalert2'

const Shipping = () => {

    const [data, setData] = useState()

    const [render, setRender] = useState(false)

    useEffect(() => {
        API.getShipping()
        .then(res => {
            setData(res.data)
        })
    }, [render])

    const shippingHandler = (transactionId) => {
        API.updateShipping({transactionId})
        .then(res => {
            Swal.fire({type: "success", title: "Success!", timer: 3000})
            setRender(!render)
        })
    }

    console.log(data)

    if(!data) return <h5>Loading</h5>
    if (data.length === 0) return <h5>No Data</h5>
    return (
        <div className="table-responsive mt-3">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>
                                <button onClick={ () => shippingHandler(invoice.id) } className="btn btn-success">Send Items</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Shipping
