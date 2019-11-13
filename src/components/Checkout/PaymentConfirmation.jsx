import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../services'
import './style/PaymentConfirmation.css'
import moment from 'moment'
import Swal from 'sweetalert2'
import Nav from './Nav'

const PaymentConfirmation = props => {

    const [ state, setState ] = useState({
        loading: true,
        data: '',
        preview: ''
    })

    const id = useSelector(state => state.authReducer.id)

    const [ input, setInput ] = useState({
        file: ''
    })

    const [ update, setUpdate ] = useState(false)

    const uploadHandler = e => {
        setInput({...input, file: e})
        setState({...state, preview: URL.createObjectURL(e)})
    }

    const saveHandler = () => {
        const fd = new FormData()
        const data = {
            transactionId: props.match.params.transactionId,
            id
        }
        fd.append('payment', input.file)
        fd.append('data', JSON.stringify(data))
        API.uploadPaymentProof(fd)
        .then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    type: 'success',
                    title: res.data.message
                })
                setUpdate(!update)
            }
        })
    }

    const fileBtn = useRef('fileBtn')

    const fileBtnClick = () => fileBtn.current.click()

    useEffect(() => {
        API.getTransactionsDetail({transactionId: props.match.params.transactionId, id})
        .then(res => {
            console.log(res.data)
            if (res.data.length !== 0) setState({...state, loading: false, data: res.data, preview: res.data[0].paymentProof})
            else setState({...state, loading: false})
        })
        .catch(err => console.log(err))
        
    }, [])

    const renderTotal = () => {
        let total = 0
        state.data.forEach(val => {
            if (val.productDiscount != 0) total += (val.productPrice - (val.productPrice * val.productDiscount/100)) * val.productQty
            else total += val.productPrice * val.productQty
        })
        return total
    }

    const renderPreview = () => {
        if (state.preview) {
            if (state.preview.includes('http://localhost:3000')) {
                return <p onClick={() => window.open( state.preview )} className="mt-2 text-info img-preview col-2 px-0 mx-auto">Preview</p>
            } else {
                return <p onClick={() => window.open( 'http://localhost:9000/' + state.data[0].paymentProof )} className="mt-2 text-info img-preview col-2 px-0 mx-auto">Preview</p>
            }
        } else {
            return null
        }
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
        if (state.data) {
            return (
                <Fragment>
                    <Nav/>
                    <div className="col-12 mb-3">
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
                                    {
                                        state.data[0].bank === "Mandiri" ?
                                        <>
                                            <div className="w-50 mx-auto">
                                                <img className="w-50" src={require('../../assets/mandiri-white.png')} alt="gambar"/>
                                            </div>
                                            <div className="mt-3">
                                                <span className="px-0" style={{ fontSize: "larger"}}>1122 33 4455 667 A/n Sayur Fresh</span>
                                            </div>
                                        </>
                                        :
                                        <>
                                        <div className="w-50 mx-auto">
                                            <img className="w-50" src={require('../../assets/bca.jpg')} alt="gambar"/>
                                        </div>
                                        <div className="mt-3">
                                            <span className="px-0" style={{ fontSize: "larger"}}>12345 67890 A/n Sayur Fresh</span>
                                        </div>
                                    </>
                                    }
                                </div>
                                <div className="px-0 ml-1 card text-center" style={{ width: "49.5%"}}>
                                    <div className="my-auto">
                                        <h5><label htmlFor="upload">Upload Bukti Pembayaran</label></h5>
                                        <div>
                                            <input className="d-none" type="file" ref={ fileBtn } onChange={ e => uploadHandler(e.target.files[0]) }/>
                                            {
                                                state.data[0].status !== 'Menunggu Pembayaran' && state.data[0].status !== 'Menunggu Verifikasi Admin'
                                                ?
                                                null
                                                :
                                                <button id="upload" className="btn btn-outline-info" onClick={ fileBtnClick }>
                                                    {
                                                        input.file ? input.file.name : 'Input File'
                                                    }
                                                </button>
                                            }
                                            <div className="position-relative">
                                                { renderPreview() }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {
                            input.file ?
                            <button onClick={ saveHandler } className="btn btn-success form-control mt-2">Selesai</button>
                            :
                            <button className="btn btn-success form-control mt-2 disabled-type-1">Selesai</button>
                        }
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <>
                    <Nav/>

                    <h2 className="text-center" style={{ marginTop: "25vh" }}>Data tidak ditemukan</h2>
                </>
            )
        }
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
