import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import API from '../../services'
import { changeBiodata } from '../../actions/actionAuth'

const Biodata = () => {

    const user = useSelector(state => state.authReducer)

    const dispatch = useDispatch()

    const [data, setData] = useState({
        fullName: '',
        email: ''
    })

    const changeBiodataHandler = () => {
        API.changeBiodata({...data, id: user.id})
        .then(res => {
            dispatch(changeBiodata(res.data[0].id, res.data[0].fullName, res.data[0].email))
            setData({...data, fullName: '', email: ''})
        })
    }

    return (
        <Fragment>
            <h5 className="card-title pt-3 text-muted">Biodata Diri</h5>
                <div className="pb-5">
                    <div className="d-inline-flex">
                    <div style={{width: "100px"}}>Nama</div>
                    {
                        data.fullName ? <input type="text" value={data.fullName} onChange={ e => setData({...data, fullName: e.target.value}) }/> : <div>{user.fullName}</div>
                    }
                    </div>
                </div>
                <div className="pb-5">
                    <div className="d-inline-flex">
                    <div style={{width: "100px"}}>Email</div>
                    {
                        data.email ? <input type="text" value={data.email} onChange={ e => setData({...data, email: e.target.value}) }/> : <div>{user.email}</div>
                    }
                    </div>
                </div>
                <div>
                    
                    {
                        data.fullName ?
                        <>
                        <button className="btn btn-success mr-2" onClick={ changeBiodataHandler }>Save</button>
                        <button className="btn btn-outline-success" onClick={ () => setData({...data, fullName: '', email: ''}) }>Cancel</button>
                        </>
                        :
                        <button className="btn btn-warning" onClick={ () => setData({...data, fullName: user.fullName, email: user.email}) }>Edit</button>
                    }
                </div>
        </Fragment>
    )
}

export default Biodata
