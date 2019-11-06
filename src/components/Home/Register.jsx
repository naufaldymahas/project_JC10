import React, { Fragment, useState, useEffect, useRef } from 'react'
import API from '../../services'
import Swal from 'sweetalert2'
import './Style/Register.css'

const Register = () => {

    const [ State, setState ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [ State2, setState2 ] = useState({
        loading: true,
        notification: ''
    })

    const [ err, setErr ] = useState(true)

    const submitHandler = () => {
        setState2({...State2, loading: false})
        const {firstName, lastName, email, password} = State
        const data = {
            fullName: `${firstName} ${lastName}`,
            email: email,
            password: password
        }
        if (firstName && lastName && email && password) {
            API.registerUser(data)
            .then(res => {
                const {status, message} = res.data
                if (status === 404) {
                    Swal.fire({
                        type: 'error',
                        title: message
                    })
                } else {
                    Swal.fire({
                        type: 'success',
                        title: message,
                        text: `Please Login!`,
                        timer: 3000
                    })
                }
                setTimeout(() => {
                    setState2({...State2, loading: true})
                }, 1000);
            })
        } else {
            setTimeout(() => {
                setState2({...State2, loading: true, notification: 'Please fill the form!'})  
            }, 100);
            setTimeout(() => {
                setState2({...State2, notification: ''})
            }, 1100);
        }
        
    }

    const mounted = useRef(true)

    useEffect(() => {
        if (mounted.current) {
            mounted.current = false
        } else {
            if (State.email.indexOf('@') === -1) {
                setErr(false)
            } else {
                setErr(true)
            }
        }
    }, [State.email])

    return (
        <Fragment>
            <div className="text-center mt-3">
                <a className="to-home" href="/">Home</a>
            </div>
            <div id="myModal" className="card-type-1 position-relative">
                <div className="card-content-type-2">
                    <div className="card-padding">
                        <div className="mt-3 mb-4">
                            <span style={{fontSize: "20px", fontStyle: "bold"}}>Daftar</span>
                        </div>
                        <form>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="fn">First Name</label>
                                    <input value={State.firstName} onChange={e => setState({...State, firstName: e.target.value})} type="text" className="form-control" id="fn"/>
                                </div>
                                <div className="col">
                                    <label className="text-muted" style={{fontSize: "15px"}} htmlFor="ln">Last Name</label>
                                    <input value={State.lastName} onChange={e => setState({...State, lastName: e.target.value})} type="text" className="form-control" id="ln"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="email">Masukkan Email</label>
                            <input value={State.email} onChange={e => setState({...State, email: e.target.value})} className="form-control" type="email" id="email"/>
                            {!err ? <span style={{fontSize: '14px'}} className="text-danger">Email tidak benar</span> : null}
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="password">Masukkan Password</label>
                            <input value={State.password} onChange={e => setState({...State, password: e.target.value})} className="form-control" type="password" id="password"/>
                        </div>                      
                        </form>
                        {State2.loading ? <button onClick={submitHandler} className="btn btn-success form-control disabled mt-2">Daftar</button>
                        : <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>}
                        {State2.notification ? <div className="alert alert-danger text-center mt-2" role="alert">{State2.notification}</div>
                        : null}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register