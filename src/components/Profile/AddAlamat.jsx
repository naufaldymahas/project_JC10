import React, { useState } from 'react'
import { Modal, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import API from '../../services'
import Swal from 'sweetalert2'

const AddAlamat = ({ show, setShow, id, setRender, render }) => {

    const city = ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat', 'Kepulauan Seribu']

    const dataHandler = (cond, value, number) => {
        if (!number) setData({...data, [cond]: value})
        else {
            if (!isNaN(parseInt(value))) setData({...data, [cond]: value}) 
            else setData({...data, [cond]: ''})
        }
    }

    const [ data, setData ] = useState({
        penerima: '',
        nomerHp: '',
        namaAlamat: '',
        kota: '',
        kecamatan: '',
        kodePos: '',
        alamatLengkap: ''
    })

    const submitHandler = () => {
        const { penerima, nomerHp, namaAlamat, kota, kecamatan, kodePos, alamatLengkap } = data
        if (penerima && nomerHp && namaAlamat && kota && kecamatan && kodePos && alamatLengkap) {
            let DATA = {...data, id}
            API.addAddress(DATA)
            .then(res => {
                Swal.fire(res.data.message, '', 'success')
                setShow(false)
                setRender(!render)
            })
            .catch(err => console.log(err))
        } else {
            Swal.fire({title: 'Data belum terisi semua!', type: 'error', timer: 1200, showConfirmButton: false})
        }
    }

    return (
            <Modal show={show} onHide={() => setShow(false)}>
                <ModalHeader closeButton>
                    <ModalTitle>Tambah Alamat Baru</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="penerima">Penerima</label>
                                <input value={data.penerima} onChange={e => dataHandler('penerima', e.target.value)} id="penerima" type="text"/>
                            </div>
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="nomerHp">Nomer Hp</label>
                                <div className="col-md-10 d-inline-flex pl-0 pr-0">
                                    <span className="pl-0 my-auto text-muted">+62</span>
                                    <input className="w-100" value={data.nomerHp} onChange={e => dataHandler('nomerHp', e.target.value, true)} id="nomerHp" type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="nAlamat">Nama Alamat</label>
                                <input value={data.namaAlamat} onChange={e => dataHandler('namaAlamat', e.target.value)} id="nAlamat" type="text"/>
                            </div>
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="kota">Kota</label>
                                <select value={data.kota} onChange={e => dataHandler('kota', e.target.value)} className="custom-select float-none" id="kota">
                                    <option value="">Silahkan Pilih Kota: </option>
                                    {city.map( (val, index) => (
                                        <option key={index + 1} value={val}>{val}</option>
                                    ) )}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="kecamatan">Kecamatan</label>
                                <input value={data.kecamatan} onChange={e => dataHandler('kecamatan', e.target.value)} id="kecamatan" type="text"/>
                            </div>
                            <div className="form-group col-md-6 col-sm-6">
                                <label htmlFor="Pos">Kode Pos</label>
                                <input value={isNaN(data.kodePos)? '' : data.kodePos} onChange={e => dataHandler('kodePos', parseInt(e.target.value))} id="Pos" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="alamatLengkap">Alamat Lengkap</label>
                            <input value={data.alamatLengkap} onChange={e => dataHandler('alamatLengkap', e.target.value)} className="form-control" id="alamatLengkap" type="text"/>
                        </div>
                    </form>
                    <span style={{fontSize: 12, fontStyle: "italic"}} className="text-muted">harap cantumkan data yang valid, agar memudahkan dalam pengiriman barang</span>
                </ModalBody>
                <ModalFooter>
                    <button onClick={() => setShow(false)} className="btn btn-danger">Tutup</button>
                    <button onClick={submitHandler} className="btn btn-primary">Simpan</button>
                </ModalFooter>
            </Modal>
    )
}

export default AddAlamat
