import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import API from '../../services'
import Swal from 'sweetalert2'

const AddDiscount = (props) => {

    const [ data, setData ] = useState('')

    const [ edit, setEdit ] = useState({
        cond: false,
        data: ''
    })

    const submitHandler = () => {
        let DATA = {
            data, edit
        }
        API.editHandler(DATA)
        .then(res => {
            console.log(res)
            if (res.data == "Discount already exists") {
                Swal.fire({
                    type: "error",
                    title: res.data
                })
            } else {
                Swal.fire({
                    type: "success",
                    title: res.data
                })
            }
        })
        props.setNewData(true)
    }

    const editHandler = e => {
        if (e) {
            setData(e)
            setEdit({...edit, cond: true, data: e})
        } else {
            setData('')
            setEdit({...edit, cond: false, data: ''})
        }
    }

    console.log(edit)

    return (
        <Modal
        show={props.addDiscount}
        onHide={() => props.setAddDiscount(false)}>
            <Modal.Header>
                Discount Handler
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <label htmlFor="nd">New Discount</label>
                        <input id="nd" type="text" value={data} onChange={ e => setData(e.target.value.replace(/\D/,'')) }/>
                    </div>
                    <div className="col">
                        <label htmlFor="ed">Edit Discount</label>
                        <select onChange={ e =>  editHandler(e.target.value)}>
                            <option value="">Select Discount:</option>
                            {props.discount.map(disc => (
                                <option key={disc.id} value={disc.discount}>{disc.id}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={ submitHandler } className="btn btn-success">Submit</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddDiscount
