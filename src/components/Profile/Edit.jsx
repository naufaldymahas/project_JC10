import React from 'react'
import { Route, Link } from 'react-router-dom'
import './style/Edit.css'
import Alamat from '../../components/Profile/Alamat'
import TransactionList from './TransactionList'
import Biodata from './Biodata'

const Edit = ({ user, dataAddress, setRender, render }) => {

    return (
        <div className="card col-12 mb-4 pb-2">
            <div className="row mt-3">
                <div className="col-md-3">
                    <ul className="card text-center p-0" style={{listStyle: "none"}}>
                        <li className="py-3" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}><Link className="links" to={`/profile/${user.id}/biodata`}>Biodata Diri</Link></li>
                        <li className="py-3" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}><Link className="links" to={`/profile/${user.id}/alamat`}>Daftar Alamat</Link></li>
                        <li className="py-3" ><Link className="links" to={`/profile/${user.id}/transactionlist/`}>Daftar Transaksi</Link></li>
                    </ul>
                </div>
                <div className="col-md-9">
                    <Route path="/profile/:userId/biodata">
                        <Biodata />
                    </Route>
                    <Route path="/profile/:userId/alamat">
                        <Alamat id={user.id} dataAddress={dataAddress} render={render} setRender={setRender}/>
                    </Route>
                    <Route path="/profile/:userId/transactionlist">
                        <TransactionList id={user.id}/>
                    </Route>
                </div>
            </div>
        </div>
    )
}

export default Edit
