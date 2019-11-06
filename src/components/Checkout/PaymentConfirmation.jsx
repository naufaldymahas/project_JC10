import React, { Fragment, useEffect, useRef, useState } from 'react'
import API from '../../services'
import './style/PaymentConfirmation.css'
import moment from 'moment'

const PaymentConfirmation = props => {

    const [ state, setState ] = useState({
        loading: true,
        data: ''
    })

    const [ file, setFile ] = useState({
        name: '',
        preview: ''
    })

    const [ preview, setPreview ] = useState(false)

    const fileBtn = useRef('fileBtn')

    const fileBtnClick = () => fileBtn.current.click()

    useEffect(() => {
        API.getTransactionsDetail({id: props.location.pathname.split('/')[2]})
        .then(res => {
            console.log(res)
            setState({...state, loading: false, data: res.data})
        })
        .catch(err => console.log(err))
        
    },[])

    const renderTotal = () => {
        let total = 0
        state.data.forEach(val => {
            if (val.productDiscount) total += val.productPrice - (val.productPrice * val.productDiscount/100)
            else total += val.productPrice
        })
        return total
    }

    const renderTransaction = () => {
        let render = state.data.map((val, index) => {
            return (
                <tr key={ index + 1 }>
                    <td>{index + 1}</td>
                    <td>{val.productName}</td>
                    <td>
                        {
                            val.productDiscount !== "0"?
                            <div className="d-inline-flex">
                                <span className="text-muted" style={{ textDecoration: "line-through" }}>Rp. {val.productPrice.toLocaleString('id')}</span>
                                <span>Rp. {(val.productPrice - (val.productPrice * val.productDiscount/100)).toLocaleString('id')}</span>
                            </div>
                            :
                            <span>Rp. {val.productPrice.toLocaleString('id')}</span>
                        }
                    </td>
                    <td>{val.productQty}</td>
                    <td>{val.productUnit}</td>
                    {
                        val.productDiscount ?
                        <td>Rp. {((val.productPrice - (val.productPrice * val.productDiscount/100)) * val.productQty).toLocaleString('id')}</td>
                        :
                        <td>Rp. {(val.productPrice * val.productQty).toLocaleString('id')}</td>
                    }
                </tr>
            )
        })
        return render
    }

    if (!state.loading) {
        return (
            <Fragment>
                <div style={{ boxShadow: "1px 1px 2px .1px black" }} className="py-3 text-center my-auto">
                    <h5 className="mb-0"><a href="/">Home</a></h5>
                </div>
                <div className="col-12">
                    <div className="text-center my-3">
                        <h4>Lakukan Pembayaran Anda sebelum</h4>
                        <h4>{moment(`${state.data[0].deadline}`).locale('id').format('DD MMMM YYYY kk:mm')}</h4>
                    </div>
                    <div className="col-10 mx-auto">
                        <h5>Detail Transaksi</h5>
                        <table className="table text-center">
                            <thead style={{ backgroundColor: "#2e8857", color: "white" }}>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Quantity</th>
                                    <th>Satuan</th>
                                    <th>Jumlah</th>
                                </tr>
                            </thead>
                            <tbody className="table-payment">
                                { renderTransaction() }
                            </tbody>
                        </table>
                        <div style={{ width: "20%" }} className="px-0 ml-auto">
                            <div className="position-relative text-muted">
                                <span className="px-0">Ongkir: </span>
                                <span className="px-0 position-absolute" style={{ right: "0" }}>Rp. 10.000</span>
                            </div>
                            <div className="position-relative text-muted">
                                <span className="px-0">Sub Total: </span>
                                <span className="px-0 position-absolute" style={{ right: "0" }}>Rp. {renderTotal().toLocaleString('id')}</span>
                            </div>
                            <div style={{ height: "2rem", borderTop: "1px solid black", color: "#2e8857" }}
                            className="font-weight-bold">
                                <div className="position-relative d-inline-block w-100 align-middle">
                                    <span className="px-0">Total</span>
                                    <span className="px-0 position-absolute" style={{ right: 0 }}>Rp. {(renderTotal()+10000).toLocaleString('id')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-inline-flex">
                            <div className="px-0 mr-1 card text-center py-2" style={{ width: "49.5%"}}>
                                <h5>Rekening Pembayaran</h5>
                                <div className="w-50 mx-auto">
                                    <img className="w-50" src={require('../../assets/mandiri-white.png')} alt="gambar"/>
                                </div>
                                <div className="mt-3">
                                    <span className="px-0" style={{ fontSize: "larger"}}>1234567890 A/n Anonim</span>
                                </div>
                            </div>
                            <div className="px-0 ml-1 card text-center" style={{ width: "49.5%"}}>
                                <div className="my-auto">
                                    <h5><label htmlFor="upload">Upload Bukti Pembayaran</label></h5>
                                    <div>
                                        <input className="d-none" type="file" ref={ fileBtn } onChange={ e => setFile({...file, name: e.target.files[0].name, preview: URL.createObjectURL(e.target.files[0])}) } id=""/>
                                        <button id="upload" className="btn btn-outline-info" onClick={ fileBtnClick }>
                                            {
                                                file.name ? file.name : 'Input File'
                                            }
                                        </button>
                                        <div className="position-relative">
                                            <p onMouseOver={() => setPreview(true)} onMouseOut={() => setPreview(false)} className="mt-2 text-info img-preview col-2 px-0 mx-auto">Preview</p>
                                            {
                                                preview ?  
                                                <div className="img-transaction">
                                                    <img className="w-100" src={ file.preview } alt="bukti transaksi"/>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {
                        file.name ? <button className="btn btn-success form-control mt-2">Selesai</button> : <button className="btn btn-success form-control mt-2 disabled-type-1">Selesai</button>
                    }
                    </div>
                </div>
                {/* <div style={{ borderTop: "1px solid #d8d8d8" }} className="mt-3 p-3">
                    <div className="col-12 px-0">
                        <button className="btn btn-success form-control">Selesai</button>
                    </div>
                </div> */}
            </Fragment>
        )
    } else {
        return (
            <div className="loading">
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>  
        )
    }

}

export default PaymentConfirmation

{/* <div className="position-relative" style={{top: "10vh"}}>
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
<div style={{ display: "grid" }} className="text-center pb-5">
{/* setFile(URL.createObjectURL(e.target.files[0])) */}
//     <input className='d-none' onChange={ e => setFile({...file, name: e.target.files[0].name, preview: URL.createObjectURL(e.target.files[0])}) } ref={ fileBtn } type="file" id="upload"/>
//     <button className="w-25 mx-auto btn btn-outline-info" onClick={ fileBtnClick }>
//         { file.name ?
//         file.name
//         : 
//         'Upload Bukti Pembayaran'
//         }
//     </button>
//     { 
//         file.name ?
//         <Fragment>
//         <p className="mx-auto my-2" style={{ cursor: "pointer", width: "10%" }} onClick={ () => setPreview(!preview) }>Preview foto</p>
//         {
//             preview ?
//             <div style={{ width: "500px",overflow: "hidden" }} className="mx-auto">
//                 <img style={{ height: "auto", width: "100%" }} src={ file.preview } alt="bukti pembayaran"/>
//             </div>
//             :
//             null
//         }
//         </Fragment>
//         :
//         null
//     }
// </div>
// </div> */}