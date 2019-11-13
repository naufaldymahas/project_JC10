import React, { Fragment, useState, useEffect, useRef } from 'react'
import moment from 'moment'

const Identity = ({ fullName, address, data, setData, inputHandler }) => {

    const [ alamat, setAlamat ] = useState('')
    
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
            return;
        }
        if (alamat) {
            setData({
                ...data, 
                penerima: address[alamat].recipient, 
                nomerHp: address[alamat].handphone,
                alamat: address[alamat].addressName,
                kota: address[alamat].city,
                kecamatan: address[alamat].district,
                kodePos: address[alamat].postalCode,
                alamatLengkap: address[alamat].addressDetail
            })            
        } else {
            setData({...data, penerima: '', nomerHp: '', alamat: '', kota: '', kecamatan: '', kodePos: '', alamatLengkap: ''})
        }
    }, [alamat])

    return (
        <Fragment>
            <div className="identity-container">
                <div className="card-identity" style={{backgroundColor: "green"}}>
                    <i className="fa fa-user"></i>
                    <span>Data Diri</span>
                </div>
                <div className="container">
                    <div className="mt-2">
                            <span style={{fontSize: "24px"}} className="font-weight-bold text-muted">{fullName}</span>
                            { 
                                address.length !== 0
                                ?
                                <select onChange={e => setAlamat(e.target.value)} className="custom-select" style={{marginRight: "15px"}}>
                                    <option value="">Pilih Alamat:</option>
                                    {address.map((val, index) => (
                                        <option key={ index } value={index}>{val.addressName}</option>
                                        ))}
                                </select>
                                :
                                null
                             }
                        <div>
                        {/* FORM */}
                        <form className="pb-4">
                {
                    alamat.length !== 0 ? 
                    <Fragment>
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="penerima">Penerima</label>
                                        <input value={data.penerima} type="text" className="form-control" id="penerima"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="nomerHp">Nomer Hp</label>
                                        <div className="col-md-12 d-inline-flex pl-0">
                                            <span className="pl-0 my-auto text-muted">+62</span>
                                            <input className="col-10 form-control" value={data.nomerHp} id="nomerHp" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>                                    
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Alamat</label>
                                        <input value={data.alamat} type="text" className="form-control" id="namaAlamat"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Kota</label>
                                        <select className="custom-select custom-select-edit" id="kota">
                                            <option value={data.kota}>{data.kota}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kecamatan">Kecamatan</label>
                                        <input value={data.kecamatan} type="text" className="form-control" id="kecamatan"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kodePos">Kode Pos</label>
                                        <input value={data.kodePos} type="text" className="form-control" id="kodePos"/>
                                    </div>
                                </div>
                            </div>  
                            <div className="form-group" style={{marginRight: "15px"}}>
                                <label className="text-muted" style={{fontSize: "15px"}} htmlFor="alamatLengkap">Alamat Lengkap</label>
                                <input value={data.alamatLengkap} className="form-control" id="alamatLengkap" type="text"/>
                            </div> 
                        </Fragment>
                        :
                        <Fragment>
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="penerima">Penerima</label>
                                        <input value={data.penerima} onChange={ e => inputHandler('penerima', e.target.value) } type="text" className="form-control" id="penerima"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="nomerHp">Nomer Hp</label>
                                        <div className="col-md-12 d-inline-flex pl-0">
                                            <span className="pl-0 my-auto text-muted">+62</span>
                                            <input className="col-10 form-control" onChange={ e => inputHandler('nomerHp', e.target.value.replace(/\D/,''), true) } value={data.nomerHp} id="nomerHp" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>                                    
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Alamat</label>
                                        <input value={data.alamat} onChange={ e => inputHandler('alamat', e.target.value) } type="text" className="form-control" id="namaAlamat"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="namaAlamat">Kota</label>
                                        <select className="custom-select custom-select-edit" id="kota" value={data.kota} onChange={e => inputHandler('kota', e.target.value)}>
                                            <option value="">Silahkan Pilih Kota: </option>
                                            {['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat', 'Kepulauan Seribu'].map( (val, index) => (
                                            <option key={index + 1} value={val}>{val}</option>) )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="d-inline-flex w-100">
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kecamatan">Kecamatan</label>
                                        <input value={data.kecamatan} onChange={ e => inputHandler('kecamatan', e.target.value) } type="text" className="form-control" id="kecamatan"/>
                                    </div>
                                    <div className="col-md-6 pl-0">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="kodePos">Kode Pos</label>
                                        <input value={data.kodePos} onChange={ e => inputHandler('kodePos', e.target.value) } type="text" className="form-control" id="kodePos"/>
                                    </div>
                                </div>
                            </div>  
                            <div className="form-group" style={{marginRight: "15px"}}>
                                <label className="text-muted" style={{fontSize: "15px"}} htmlFor="alamatLengkap">Alamat Lengkap</label>
                                <input value={data.alamatLengkap} onChange={ e => inputHandler('alamatLengkap', e.target.value) } className="form-control" id="alamatLengkap" type="text"/>
                            </div> 
                        </Fragment>
                        }
                            <div className="col-md-12 pl-0">
                                <div className="alert alert-warning text-center p-1" style={{letterSpacing: "0.8px"}}>
                                    <i className="fa fa-exclamation-circle"></i>
                                    <span>Silahkan pilih estimasi waktu pengiriman pesanan anda.</span>
                                </div>
                                <div className="container">
                                    <div style={{display: "grid"}} className="col-md-4 px-0 pb-2">
                                        <label className="text-muted" htmlFor="tanggal">Tanggal Pengiriman</label>
                                        <input className="custom-select" 
                                        onChange={ e => setData({...data, tanggalPengiriman: e.target.value})} 
                                        value={ data.tanggal }
                                        min={ moment().year() + '-' + (moment().month()+1) + '-' + (moment().date()+1) } type="date" id="tanggal"/>
                                    </div>
                                    <div>
                                        <div>
                                            <input value="siang" onChange={ e => setData({...data, jamPengiriman: e.target.value}) } className="mr-2" name="jam" type="radio" id="siang"/>
                                            <label htmlFor="siang">Siang</label>
                                        </div>
                                        <label htmlFor="siang" style={{fontSize: "14px"}} className="text-muted">Eta 12:00 - 15:59</label>
                                    </div>
                                    <div>
                                        <div>
                                            <input value="sore" onChange={ e => setData({...data, jamPengiriman: e.target.value}) } className="mr-2" name="jam" type="radio" id="sore"/>
                                            <label htmlFor="sore">Sore</label>
                                        </div>
                                        <label htmlFor="sore" style={{fontSize: "14px"}} className="text-muted">Eta 16:00 - 20:00</label>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginRight: "15px"}}>
                                <label className="text-muted" htmlFor="notes">Notes</label>
                                <textarea value={data.notes} onChange={ e => inputHandler('notes', e.target.value) } className="form-control" id="notes" rows="10"></textarea>
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