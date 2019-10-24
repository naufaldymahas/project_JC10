import React, { Fragment, useState } from 'react'
import AddAlamat from './AddAlamat'

const Alamat = ({ id, dataAddress }) => {

    const [ show, setShow ] = useState(false)

    console.log(dataAddress)

    return (
        <Fragment>
            <div className="container">
                <button onClick={() => setShow(true)} className="btn btn-success">+ Tambah Alamat Baru</button>
                <select className="custom-select">
                    <option value="0">Alamat Terbaru</option>
                    <option value="1">Nama Penerima</option>
                    <option value="2">Nama Alamat</option>
                </select>
            </div>
            
            <div>
                <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Penerima</th>
                        <th>Alamat Pengiriman</th>
                        <th>Daerah Pengiriman</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAddress.map(val => (
                    <tr key={val.id}>
                        <td className="td-edit">
                            <div>
                                <p className="font-weight-bold" style={{marginBottom: "5px", fontSize: "14px"}}>{val.recipient}</p>
                                <p style={{fontSize: "14px"}}>+62{`${val.handphone}`}</p>
                            </div>
                        </td>
                        <td className="td-edit">
                            <div>
                                <p className="font-weight-bold" style={{marginBottom: "5px", fontSize: "14px"}}>{`${val.addressName}`}</p>
                                <p style={{fontSize: "14px"}}>{val.addressDetail}</p>
                            </div>
                        </td>
                        <td className="td-edit col-3">
                            <div>
                                <span style={{fontSize: "14px"}} className="pl-0">DKI Jakarta, {`${val.city}, ${val.district}, ${val.postalCode}, Indonesia`}</span>
                            </div>
                        </td>
                        <td className="td-edit">
                            <button className="btn btn-warning mr-2">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <AddAlamat
        show={ show }
        setShow={ setShow }
        id={ id }/>
        </Fragment>
    )
}

export default Alamat
