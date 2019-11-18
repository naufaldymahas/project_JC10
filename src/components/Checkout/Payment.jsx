import React from 'react'
import './style/Payment.css'

const Payment = ({ data, setData, inputHandler }) => {
    return (
        <div className="checkout-container mt-2">
            <div className="card-identity" style={{backgroundColor: "green"}}>
                <i className="fa fa-credit-card"></i>
                <span>Rekening</span>
            </div>
            <div className="container">
                <h5 className="text-muted my-3">Pilih Bank</h5>
                <div className="col-md-12 px-0 d-inline-flex">
                    <div className="col-md-6 px-0 text-center">
                        <label className="mb-0" htmlFor="bankMandiri">
                            <div className="image-container-type-2">
                                <img className="image-bank" src={require('../../assets/mandiri.png')} alt="mandiri"/>
                            </div>
                            <span className="pl-0">
                                Bank Mandiri
                            </span>
                        </label>
                        <div>
                            <input onChange={ e => setData({...data, bank: e.target.value}) } value="Mandiri" name="BANK" type="radio" id="bankMandiri"/>
                        </div>
                    </div>
                    <div className="col-md-6 px-0 text-center">
                        <label className="mb-0" htmlFor="bankBCA">
                            <div className="image-container-type-2">
                                <img className="image-bank" src={require('../../assets/bca.jpg')} alt="bca"/>
                            </div>
                            <span className="pl-0">
                                Bank BCA
                            </span>
                        </label>
                        <div>
                            <input onChange={ e => setData({...data, bank: e.target.value}) } value="BCA" name="BANK" type="radio" id="bankBCA"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 px-0 my-3 d-inline-flex">
                    <div className="col-md-6 pl-0">
                        <label htmlFor="cardHolder" className="text-muted text-truncate text-res">Nama Pemilik Kartu</label>
                        <input value={ data.namaPemilik } onChange={ e => inputHandler('namaPemilik', e.target.value)} className="form-control" id="cardHolder" type="text"/>
                    </div>
                    <div className="col-md-6 pl-0">
                        <label htmlFor="cardNumber" className="text-muted text-truncate text-res">Nomer Rekening</label>
                        <input value={ data.nomerRekening } onChange={ e => inputHandler('nomerRekening', parseInt(e.target.value), true)} className="form-control" id="cardHolder" type="text"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
