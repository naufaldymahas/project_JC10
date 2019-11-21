import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const PerMonth = ({ data }) => {

    const [state, setState] = useState({
        labels: [],
        datasets: []
    })
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!data) return
        render()
    }, [data])

    const render = () => {
        let lbl = []
        let d = []
        data.forEach(l => {
            lbl.push(l.tanggal)
            d.push(l.total)
        })
        setState({
            ...state,
            labels: lbl,
            datasets: [{
                label: 'Revenue per month',
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
                pointBorderColor: 'blue',
                pointRadius: 1,
                data: d
            }]
        })
        setLoading(false)
    }

    if (loading) return null
    return (
        <div className="col-6">
                <h5>Total Income {moment().format('MMMM')}</h5>
                <Line data={state}/>
        </div>
    )
}

export default PerMonth
