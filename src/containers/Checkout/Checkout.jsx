import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

import Identity from '../../components/Checkout/Identity'
import CheckoutCart from '../../components/Checkout/CheckoutCart'
import Nav from '../../components/Checkout/Nav'
import Payment from '../../components/Checkout/Payment'

import './Checkout.css'
import '../../components/Checkout/style/Identity.css'
import '../../components/Checkout/style/CheckoutCart.css'

import API from '../../services'
import image from '../../assets/logo.png'

const Checkout = () => {

    const { user, cart } = useSelector(state => ({
        user: state.authReducer, 
        cart: state.productReducer
    }))

    const [ state, setState ] = useState({
        address: [],
        loading: true
    })

    const [ voucher, setVoucher ] = useState(false)

    useEffect(() => {
        if (user.id) {
            API.getAddress({id: user.id})
            .then(res => setState({...state, address: res.data, loading: false}))
        } else setState({...state, loading: false})
    }, [user.id])

    const [ data, setData ] = useState({
        userId: user.id,
        penerima: '',
        nomerHp: '',
        alamat: '',
        kota: '',
        kecamatan: '',
        kodePos: '',
        alamatLengkap: '',
        tanggalPengiriman: '',
        jamPengiriman: '',
        notes: '',
        bank:'',
        namaPemilik: '',
        nomerRekening: ''
    })

    const { penerima, nomerHp, alamat, kota, kecamatan, kodePos, alamatLengkap, tanggalPengiriman, jamPengiriman, bank, namaPemilik, nomerRekening } = data

    const [ payment, setPayment ] = useState({
        isDone: false,
        transactionId: ''
    })

    const paymentHandler = () => {
        let dateNow = moment().format('YYYY-MM-DD') + ' ' + moment().format('kk:mm:ss')
        let deadline = moment().format('YYYY-MM-DD') + ' ' + moment().add(8, 'h').format('kk:mm:ss')
        let Data = {...data, dateNow, deadline}
        API.addTranscation(Data)
        .then(res => {
            const { uniqueId } = res.data
            let data = {...cart, uniqueId }
            API.addTranscationDetail(data)
            .then(res => {
                console.log(res)
                setPayment({...payment, isDone: true, transactionId: res.data.uniqueId})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => console.log(err))
    }

    const inputHandler = (cond, val, number) => {
        if (!number)  {
            setData({ ...data, [cond]: val })
        } else {
            if (isNaN(val)) setData({ ...data, [cond]: '' })
            else setData({ ...data, [cond]: val })
        }
    }

    if (cart.addedProduct.length !== 0) {
        if (!state.loading) {
            if (!user.id) {
                return (
                <div>
                    <div className="text-center" style={{ borderBottom: "1px solid black" }}>
                        <h5 className="my-2"><a href="/">Home</a></h5>
                    </div>
                    <div className="col-md-12 text-center">
                        <div className="my-5 col-5 mx-auto px-0">
                            <div className="position-relative mx-auto mb-3" style={{ width: "250px" }}>
                                <img className="w-100" src={image} alt="gambar"/>
                            </div>
                                <p className="font-weight-light">
                                    Belum jadi member? yuks daftar! Biar bisa tracking order 😘
                                </p>
                                <button className="btn btn-outline-secondary col-5 mx-1 px-0">Login</button>
                                <button className="btn btn-outline-success col-5 mx-1 px-0">Daftar</button>
                        </div>
                    </div>
                </div>
                )
            } else {
                if (!payment.isDone) {
                    return (
                        <Fragment>
                            <Nav/>
                            <div className="row mx-0" style={{height: "960px"}}>
                                <div className="col-md-7">
                                    <Identity
                                    fullName={ user.fullName }
                                    address={ state.address }
                                    data={ data }
                                    setData={ setData }
                                    inputHandler={ inputHandler }/>
                                </div>
                                <div className="col-md-5 pl-0 pl-15">
                                    <CheckoutCart
                                    carts={ cart }
                                    voucher={ voucher }
                                    setVoucher={ setVoucher }/>
                                    <Payment
                                    data={ data }
                                    setData={ setData }
                                    inputHandler={ inputHandler }/>
                                </div>
                                <div style={{borderTop: "1px solid #d8d8d8"}} className="text-center py-3 mt-3 col-12">
                                    {
                                        penerima && nomerHp && alamat && kota && kecamatan && kodePos && alamatLengkap && tanggalPengiriman && jamPengiriman && bank && namaPemilik && nomerRekening 
                                        ?
                                        <button onClick={ paymentHandler } className="btn btn-success form-control col-10">Lanjut Ke Pembayaran</button>
                                        :
                                        <button className="btn btn-success form-control col-10 disabled-type-1">Lanjut Ke Pembayaran</button>
                                    }
                                    
                                </div>
                            </div>
                        </Fragment>
                    )
                } else {
                    return <Redirect to={`/payment/${payment.transactionId}`}/>
                }
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
    } else {
        return <Redirect to="/"/>
    }

    
}

export default Checkout