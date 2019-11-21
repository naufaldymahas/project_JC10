import React, { useEffect, useState, Fragment } from 'react'
import API from '../../services'
import moment from 'moment'
import PerMonth from './Reports/PerMonth'
import QtyPerMonth from './Reports/QtyPerMonth'

const Reports = () => {

    const [data, setData] = useState()

    const [data2, setData2] = useState()

    const [month, setMonth] = useState(moment().format('MM'))

    useEffect(() => {
        console.log(month)
        API.getIncomePerMonth({month})
        .then(res => setData(res.data))
        API.getQtyPerMonth({month})
        .then(res => setData2(res.data))
    }, [])

    if (!data && !data2) return null

    return (
        <Fragment>
            <div className="row">
                <PerMonth data={data}/>
                <QtyPerMonth data={data2}/>
            </div>
        </Fragment>
    )
}

export default Reports
