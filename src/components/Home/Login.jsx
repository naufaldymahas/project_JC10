import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onLogin } from '../../actions/actionAuth'
import './Style/Login.css'


const Login = ({ setLogin, openLogin }) => {
    const dispatch = useDispatch()
    const user = useSelector( state => state.authReducer )

    const [ data, setData ] = useState({
        email: '',
        password: ''
    })

    const onSubmitClick = e => {
        e.preventDefault()
        dispatch(onLogin(data.email, data.password))
    }

    useEffect(() => {
        let modal = document.getElementById('myModal').classList
        modal.replace('unactive-1', 'active-1')
        document.addEventListener('mousedown', outsideClick)
        return () => {
            modal.replace('active-1', 'unactive-1')
        }
    },[])

    useEffect(() => {
        return () => {
            document.removeEventListener('mousedown', outsideClick)
        }
    })

    const outsideClick = e => {
        if (node.current.contains(e.target)) return
        else setLogin(0)
    }

    const node = useRef()

    return (
        !user.fullName
        ? 
        <div id="myModal" className="modal-type-1 unactive-1">
        <div ref={ node } className="modal-content-type-1">
            <span onClick={() => setLogin(0)} className="close-type-1">&times;</span>
            <div className="padding-modal">
                <div className="mt-5 mb-4">
                    <span style={{fontSize: "20px", fontStyle: "bold"}}>Masuk</span>
                    <a href="/" className="float-right text-daftar">Daftar</a>
                </div>
                <form id="loginForm" onSubmit={onSubmitClick}>
                <div className="form-group">
                    <label style={{fontSize: "15px"}} className="text-muted" htmlFor="email">Masukkan Email</label>
                    <input autoFocus value={data.email} onChange={e => setData({...data, email: e.target.value})} className="form-control" type="text" id="email"/>
                </div>
                <div className="form-group">
                    <label style={{fontSize: "15px"}} className="text-muted" htmlFor="password">Masukkan Password</label>
                    <input value={data.password} onChange={e => setData({...data, password: e.target.value})} className="form-control" type="password" id="password"/>
                </div>                        
                </form>
                <button type="submit" form="loginForm" onClick={onSubmitClick} className="btn btn-success form-control mt-2">Masuk</button>
            </div>
        </div>
        </div>
        : 
        null
    )
}

export default Login