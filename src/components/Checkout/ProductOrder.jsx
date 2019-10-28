import React, { Fragment, useEffect, useRef, useState } from 'react'

const ProductOrder = () => {

    const [ count, setCount ] = useState({
        hour: "0",
        minute: "0",
        second: "0"
    })

    const mounted = useRef(false)

    useEffect(() => {
        if (mounted.current) {
            return;
        }
        let deadline = new Date('Oct 28, 2019 12:38:00').getTime()
        let x = setInterval(() => {
                let now = new Date().getTime()
                let t = deadline - now
                let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
                let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
                let seconds = Math.floor((t % (1000 * 60)) / 1000); 
                if (t < 0) {
                    clearInterval(x)
                    mounted.current = true
                    return
                }
                setCount({...count,
                hour: hours,
                minute: minutes,
                second: seconds
                })
        }, 1000);
    },[count.hour, count.minute, count.second])

    return (
        <Fragment>
            <div className="py-3 text-center border-bottom my-auto">
                <h5 className="mb-0"><a href="/">Home</a></h5>
            </div>
            <div className="position-relative" style={{top: "25vh"}}>
                <div className="mx-auto px-0 col-md-4 mb-3 text-center">
                    <h4>Nomer Rekening</h4>
                    <span className="p-0">1234 5678 91011 A/n Sayur Fresh</span>
                </div>
                <div className="px-0 mx-auto col-md-8">
                    <div className="text-center">
                        <h4>Mohon Selesaikan Pembayaran Anda Sebelum</h4>
                        <div className="d-flex">
                            <div className="ml-auto p-3" style={{display: "grid"}}>
                                <span id="jam" style={{fontSize: "30px"}}>{count.hour}</span>
                                <span style={{fontSize: "20px"}} className="font-weight-light">Jam</span>
                            </div>
                            <div className="p-3" style={{display: "grid"}}>
                                <span id="menit" style={{fontSize: "30px"}}>{count.minute}</span>
                                <span style={{fontSize: "20px"}} className="font-weight-light">Menit</span>
                            </div>
                            <div className="mr-auto p-3" style={{display: "grid"}}>
                                <span id="detik" style={{fontSize: "30px"}}>{count.second}</span>
                                <span style={{fontSize: "20px"}} className="font-weight-light">Detik</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default ProductOrder
