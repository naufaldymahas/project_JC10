import React, { Fragment } from 'react'

const Identity = () => {

    const city = ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat', 'Kepulauan Seribu']

    return (
        <Fragment>
            <div className="identity-container">
                <div className="card-identity" style={{backgroundColor: "green"}}>
                    <i className="fa fa-user"></i>
                    <span>Data Diri</span>
                </div>
                <div className="container">
                    <div className="mt-2">
                            <span style={{fontSize: "24px"}} className="font-weight-bold text-muted">Anjay Mabar</span>
                            <select className="custom-select" style={{marginRight: "15px"}}>
                                <option value="">Pilih Alamat:</option>
                                <option value="rumah">Rumah</option>
                            </select>
                        <div>
                        {/* FORM */}
                        <form className="pb-4">
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="penerima">Penerima</label>
                                        <input value={`Anjay Mabar`} type="text" className="form-control" id="penerima"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="nomerHp">Nomer Hp</label>
                                        <div className="col-md-12 d-inline-flex pl-0">
                                            <span className="pl-0 my-auto text-muted">+62</span>
                                            <input className="col-10 form-control" value={`812345678`} id="nomerHp" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>                                    
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Alamat</label>
                                        <input value={`rumah`} type="text" className="form-control" id="namaAlamat"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Kota</label>
                                        <select className="custom-select custom-select-edit" id="kota">
                                            <option defaultValue="">Silahkan Pilih Kota: </option>
                                            {city.map( (val, index) => (
                                                <option key={index + 1} value={val}>{val}</option>
                                            ) )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kecamatan">Kecamatan</label>
                                        <input value={`kepo deh`} type="text" className="form-control" id="kecamatan"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kodePos">Kode Pos</label>
                                        <input value={`1437`} type="text" className="form-control" id="kodePos"/>
                                    </div>
                                </div>
                            </div>  
                            <div className="form-group" style={{marginRight: "15px"}}>
                                <label className="text-muted" style={{fontSize: "15px"}} htmlFor="alamatLengkap">Alamat Lengkap</label>
                                <input value={`jalan kenangan`} className="form-control" id="alamatLengkap" type="text"/>
                            </div> 
                            <div className="col-md-12 pl-0">
                                <div className="alert alert-warning text-center p-1" style={{letterSpacing: "0.8px"}}>
                                    <i className="fa fa-exclamation-circle"></i>
                                    <span>Silahkan pilih estimasi waktu pengiriman pesanan anda.</span>
                                </div>
                                <div className="container">
                                    <div style={{display: "grid"}} className="col-md-4 px-0 pb-2">
                                        <label className="text-muted" htmlFor="tanggal">Tanggal Pengiriman</label>
                                        <input className="custom-select" type="date" id="tanggal"/>
                                    </div>
                                    <div>
                                        <div>
                                            <input className="mr-2" name="jam" type="radio" id="siang"/>
                                            <label htmlFor="siang">Siang</label>
                                        </div>
                                        <label htmlFor="siang" style={{fontSize: "14px"}} className="text-muted">Eta 12:00 - 15:59</label>
                                    </div>
                                    <div>
                                        <div>
                                            <input className="mr-2" name="jam" type="radio" id="sore"/>
                                            <label htmlFor="sore">Sore</label>
                                        </div>
                                        <label htmlFor="sore" style={{fontSize: "14px"}} className="text-muted">Eta 16:00 - 20:00</label>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginRight: "15px"}}>
                                <label className="text-muted" htmlFor="notes">Notes</label>
                                <textarea className="form-control" id="notes" rows="10"></textarea>
                            </div>
                        </form>
                        {/* FORM */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Identity