import React from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import API from '../../services'

function EditAlamat({ edit, setEdit, data, setData, setRender, render }) {
    const city = ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat', 'Kepulauan Seribu']

    const dataHandler = (cond, value, number) => {
        if (!number) setData({...data, [cond]: value})
        else {
            if (!isNaN(parseInt(value))) setData({...data, [cond]: value}) 
            else setData({...data, [cond]: ''})
        }
    }

    console.log(data)

    const submitHandler = () => {
        const { recipient, handphone, addressName, city, district, postalCode, addressDetail } = data
        if (recipient && handphone && addressName && city && district && postalCode && addressDetail) {
            // let DATA = {...data}
            API.editAddress(data)
            .then(res => {
                Swal.fire('Berhasil melakukan pergantian alamat!', '', 'success')
                setEdit(null)
                setRender(!render)
            })
            .catch(err => console.log(err))
        } else {
            Swal.fire({title: 'Data belum terisi semua!', type: 'error', timer: 1200, showConfirmButton: false})
        }
    }

    if (data) {
        return (
                <Modal show={edit === data.id} onHide={() => setEdit(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Alamat Baru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="penerima">Penerima</label>
                                    <input value={data.recipient} onChange={e => dataHandler('recipient', e.target.value)} id="penerima" type="text"/>
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="nomerHp">Nomer Hp</label>
                                    <div className="col-md-10 d-inline-flex pl-0 pr-0">
                                        <span className="pl-0 my-auto text-muted">+62</span>
                                        <input className="w-100" value={data.handphone} onChange={e => dataHandler('handphone', e.target.value, true)} id="nomerHp" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="nAlamat">Nama Alamat</label>
                                    <input value={data.addressName} onChange={e => dataHandler('addressName', e.target.value)} id="nAlamat" type="text"/>
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="kota">Kota</label>
                                    <select value={data.city} onChange={e => dataHandler('city', e.target.value)} className="custom-select float-none" id="kota">
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
                                    <input value={data.district} onChange={e => dataHandler('district', e.target.value)} id="kecamatan" type="text"/>
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="Pos">Kode Pos</label>
                                    <input value={isNaN(data.postalCode)? '' : data.postalCode} onChange={e => dataHandler('postalCode', parseInt(e.target.value))} id="Pos" type="text"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="alamatLengkap">Alamat Lengkap</label>
                                <input value={data.addressDetail} onChange={e => dataHandler('addressDetail', e.target.value)} className="form-control" id="alamatLengkap" type="text"/>
                            </div>
                        </form>
                        <span style={{fontSize: 12, fontStyle: "italic"}} className="text-muted">harap cantumkan data yang valid, agar memudahkan dalam pengiriman barang</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setEdit(null)} className="btn btn-danger">Tutup</button>
                        <button onClick={submitHandler} className="btn btn-primary">Simpan</button>
                    </Modal.Footer>
                </Modal>
        )
    } else {
        return null
    }
}

export default EditAlamat
