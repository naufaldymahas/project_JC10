import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import API from '../../services'
import Swal from 'sweetalert2'

const AddDiscount = (props) => {

    const [ data, setData ] = useState()

    const [ edit, setEdit ] = useState(false)

    // const [idx, setIdx] = useState()

    const submitHandler = () => {
        let DATA = {
            data, edit
        }
        API.editHandler(DATA)
        .then(() => {
            Swal.fire({
                type: "success",
                title: "Berhasil!"
            })
        })
    }

    const editHandler = e => {
        if (e) {
            setData(e)
            setEdit(true)
        } else {
            setData(e)
            setEdit(false)
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
