import React, { useState } from 'react'
import image from '../../assets/logo.png'

const CheckoutCart = () => {

    const [ voucher, setVoucher ] = useState(false)

    return (
        <div className="checkout-container">
            <div className="card-identity" style={{backgroundColor: "green"}}>
                <i className="fa fa-shopping-basket"></i>
                <span>Keranjang Belanja</span>
            </div>
            <div className="container">
                <div className="mt-4">
                    <div className="d-inline-flex col-md-12 p-0 position-relative">
                        <div className="col-md-2 p-0" style={{flex: 0}}>
                            <div className="image-container ml-2" style={{backgroundColor: "blue"}}>
                                <img className="image-cart" src={image} alt="gambar"/>
                            </div>
                        </div>
                        <div className="col-md-8 p-0" style={{display: "grid"}}>
                            <span className="text-truncate text-res">Aslina Fresh Kentang Cube Frozen</span>
                            <span>Rp. 25.700/<small>1 pack</small></span>
                        </div>
                        <div className="col-md-2 p-0 ml-3">
                            <div className="my-auto position-absolute" style={{top: ".5rem", right: 0}}>
                                <span className="px-4 py-2" style={{border: "1px solid #d8d8d8", borderRadius: "4px"}}>2</span>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative" style={{borderBottom: "1px solid #d8d8d8", height: "30px"}}>
                        <span className="position-absolute" style={{right: 0, color: "green"}}>Rp. {(25700*2).toLocaleString('id')}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="d-inline-flex col-md-12 p-0 position-relative">
                        <div className="col-md-2 p-0" style={{flex: 0}}>
                            <div className="image-container ml-2" style={{backgroundColor: "blue"}}>
                                <img className="image-cart" src={image} alt="gambar"/>
                            </div>
                        </div>
                        <div className="col-md-8 p-0" style={{display: "grid"}}>
                            <span className="text-truncate text-res">Aslina Lur</span>
                            <span>Rp. 30.700/<small>1 pack</small></span>
                        </div>
                        <div className="col-md-2 p-0 ml-3">
                            <div className="my-auto position-absolute" style={{top: ".5rem", right: 0}}>
                                <span className="px-4 py-2" style={{border: "1px solid #d8d8d8", borderRadius: "4px"}}>4</span>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative" style={{borderBottom: "1px solid #d8d8d8", height: "30px"}}>
                        <span className="position-absolute" style={{right: 0, color: "green"}}>Rp. {(30700*4).toLocaleString('id')}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="input-voucher" onClick={() => setVoucher(!voucher)} style={{borderBottom: "1px dashed"}}>Punya Voucher Kode?</span>
                    {
                        voucher ?
                        <div className="col-md-4 p-0 mt-1 d-flex" style={{height: "30px"}}>
                            <input autoFocus className="form-control h-100" type="text"/>
                            <button className="btn btn-info ml-2 p-2" style={{lineHeight: 0}}>Submit</button>
                        </div>
                        :
                        null
                    }
                    <div className="mt-2 pb-4">
                       <div className="position-relative">
                            <span className="p-0 text-muted">Biaya Kirim</span>
                            <span className="p-0 position-absolute" style={{color: "green", right: 0}}>Rp. 10.000</span>
                       </div>
                       <div className="position-relative" style={{borderTop: "1px solid #d8d8d8"}}>
                            <span className="p-0 text-muted">Total</span>
                            <span className="p-0 position-absolute" style={{color: "green", right: 0}}>Rp. 120.100</span>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCart
