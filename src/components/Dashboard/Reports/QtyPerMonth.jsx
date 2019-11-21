import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

const QtyPerMonth = ({ data }) => {

    const [state, setState] = useState({
        labels: [],
        datasets: []
    })

    const [loading, setLoading] = useState(true)

    const render = () => {
        let l = []
        let d = []
        data.forEach(v => {
            l.push(v.productName)
            d.push(v.total)
        })
        setState({
            ...state,
            labels: l,
            datasets: [
                {
                    data: d,
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)'
                    ],
                }
            ]
        })
        setLoading(false)
    }

    useEffect(() => {
        if (!data) return
        render()
    },[data])

    if (loading) return null
    return (
        <div className="col-6">
            <h5>Product per Month</h5>
            <Doughnut data={state}/>
        </div>
    )
}

export default QtyPerMonth
