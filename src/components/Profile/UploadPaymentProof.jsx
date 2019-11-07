import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import API from '../../services'
import Swal from 'sweetalert2'

const UploadPaymentProof = ({ uploadPayment, setUploadPayment, index, transactionId, id, paymentProof }) => {

    console.log(paymentProof)

    console.log(id)

    const btn = useRef('btn')
    const btnClick = () => btn.current.click()
    const [input, setInput] = useState({
        file: '',
        preview: paymentProof
    })

    const uploadHandler = e => {
        setInput({...input, file: e, preview: URL.createObjectURL(e)})
    }

    const saveHandler = () => {
        const fd = new FormData()
        const data = {
            transactionId,
            id
        }
        fd.append('payment', input.file)
        fd.append('data', JSON.stringify(data))
        API.uploadPaymentProof(fd)
        .then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    type: 'success',
                    title: res.data.message
                })
            }
        })
    }

    return (
        <Modal show={ index == uploadPayment } onHide={ () => setUploadPayment(null) }>
            <Modal.Header closeButton>
                <div style={{ display: "grid" }}>
                    Upload Bukti Pembayaran
                    <span className="px-0 text-muted" style={{ fontSize: "smaller" }}>
                        Invoice ({transactionId})
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex">
                    <div style={{ flex: "1" }}>
                        <input onChange={ e => uploadHandler(e.target.files[0]) } type="file" ref={ btn } className="d-none"/>
                        <button onClick={ btnClick } className="btn btn-outline-success">{
                            input.file ? input.file.name : 'Upload File'
                        }</button>
                    </div>
                    <div style={{ flex: "1", textAlign: "right" }}>
                        {
                            input.file ?
                            <button onClick={ () => saveHandler() } className="btn btn-success">Simpan</button>
                            :
                            <button style={{ cursor: "no-drop" }} disabled className="btn btn-success">Simpan</button>
                        }
                    </div>
                </div>
                <div className="text-center mt-1" style={{ width: "100%" }}>
                    {
                        input.preview ?
                        <img style={{ width: "100%" }} src={'http://localhost:9000/' + input.preview} alt="gambar"/>
                        :
                        null
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UploadPaymentProof
