import React, { Fragment, useState } from 'react'
import AddAlamat from './AddAlamat'
import EditAlamat from './EditAlamat'
import API from '../../services'
import Swal from 'sweetalert2'

const Alamat = ({ id, dataAddress, setRender, render }) => {

    const [show, setShow] = useState(false)

    const [data, setData] = useState()

    const [edit, setEdit] = useState(null)

    const editHandler = (id, val) => {
        setEdit(id)
        setData(val)
    }

    const isRemoveAddress = (id) => {
        API.removeAddress({id})
        .then(() => {
            Swal.fire('Berhasil menghapus alamat!', '', 'success')
            setRender(!render)
        })
    }

    return (
        <Fragment>
            <div className="container">
                <button onClick={() => setShow(true)} className="btn btn-success">+ Tambah Alamat Baru</button>
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
                                <button onClick={ () => editHandler(val.id, val) } className="btn btn-warning mr-2">Edit</button>
                                <button onClick={ () => isRemoveAddress(val.id) } className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <AddAlamat
        show={ show }
        setShow={ setShow }
        id={ id }
        setRender={ setRender }
        render={render}/>

        <EditAlamat
        edit={ edit }
        setEdit={ setEdit }
        data={ data }
        setData={ setData }
        setRender={ setRender }
        render={render}
        />
        </Fragment>

    )
}

export default Alamat
