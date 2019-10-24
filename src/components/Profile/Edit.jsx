import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import './style/Edit.css'
import Alamat from '../../components/Profile/Alamat'


const Edit = ({ user, dataAddress }) => {

    return (
        <div className="card col-12">
            <div className="row mt-3">
                <div className="col-md-3">
                    <ul className="card text-center p-0" style={{listStyle: "none"}}>
                        <li className="py-3" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}>Biodata Diri</li>
                        <li className="py-3" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}><Link className="links" to={`/profile/${user.id}/alamat`}>Daftar Alamat</Link></li>
                        <li className="py-3" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}>tes3</li>
                        <li className="py-3">tes4</li>
                    </ul>
                </div>
                <div className="col-md-9">
                    <Route path="/profile/:userId/alamat">
                        <Alamat id={user.id} dataAddress={dataAddress}/>
                    </Route>
                </div>
            </div>
            {/* <div className="row">
                <div style={{borderRight: "1px solid rgba(0,0,0,.125)"}} className="col-2 px-0">
                    <ul className="list-group">
                        <li className="list-item">Biodata Diri</li>
                        <li className="list-item"><Link to={`/profile/${user.id}/alamat`}>Daftar Alamat</Link></li>
                        <li className="list-item">Daftar Transaksi</li>
                        <li className="list-item">Rekening Bank</li>
                    </ul>
                </div>
                <div className="col-10">
                    <Route path="/profile/:userId/alamat">
                        <Alamat id={user.id}/>
                    </Route>
                </div>
            </div> */}
        </div>
    )
}

export default Edit
