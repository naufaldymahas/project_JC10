import React, { useEffect, useState } from 'react'
import API from '../../services'

const Reports = () => {

    const [data, setData] = useState()

    useEffect(() => {
        API.getTotalPrice()
        .then(res => {
            setData(res.data)
        })
    }, [])

    console.log(data)

    const renderTotal = () => {
        let total = 0
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            for (let j = 0; j < data[i].products.length; j++) {
                console.log(data[i].products[j].productDiscount)
                if (data[i].products[j].productDiscount != 0 || data[i].products[j].productDiscount != null) total += ((data[i].products[j].productPrice - (data[i].products[j].productPrice * data[i].products[j].productDiscount/100)) * data[i].products[j].productQty) + 10000
                else total += (data[i].products[j].productPrice * data[i].products[j].productQty) + 10000
            }
        }
        // data.map(product => {
            // if (product.productDiscount != 0 || product.productDiscount != null) total += ((product.productPrice - (product.productPrice * product.productDiscount/100)) * product.productQty) + 10000
            // else total += (product.productPrice * product.productQty) + 10000
        // })
        console.log(total)
        return total.toLocaleString('id')
    }

    if (data) {
        return (
            <div>
                <div>
                    <h6>Total Pendapatan</h6>
                    <span>Rp. {renderTotal()}</span>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Reports
