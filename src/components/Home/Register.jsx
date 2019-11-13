import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginAfterRegister } from '../../actions/actionAuth'
import API from '../../services'
import Swal from 'sweetalert2'
import './Style/Register.css'

const Register = () => {

    const userId = useSelector(state => state.authReducer.id)

    const [ State, setState ] = useState({
        fullName: '',
        email: '',
        password: '',
        rePassword: ''
    })

    const [ State2, setState2 ] = useState({
        loading: true,
        notification: ''
    })

    const dispatch = useDispatch()

    const [ err, setErr ] = useState(true)

    const submitHandler = () => {
        setState2({...State2, loading: false})
        const {fullName, email, password, rePassword} = State
        const data = {
            fullName,
            email,
            password
        }

        if (fullName && email && password && rePassword) {
            if (password !== rePassword) {
                return setState2({...State2, notification: "Password Tidak Sama!"})
            }
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
                        text: 'Please Verify Your Account!',
                        timer: 3000
                    })
                    API.sendVerifyEmail({ email })
                    .catch(err => console.log(err))
                    dispatch(loginAfterRegister(res.data.result.insertId, email, data.fullName, 0))
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
            }, 2000);
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

    console.log(userId)

    const seePassword = () => {
        let input = document.getElementById('password')
        let cls = document.getElementsByClassName('fa')[0]
        if (input.type === "password") {
            input.type = "text"
            cls.classList.replace('fa-eye-slash', 'fa-eye')
        }
        else {
            input.type = "password"
            cls.classList.replace('fa-eye', 'fa-eye-slash')
        }
    }

    if (!userId) {
    return (
        <Fragment>
            <div className="text-center mt-3">
                <a className="to-home" href="/">
                    <img src={require('../../assets/logo-02.png')} alt="Sayur Fresh"/>
                </a>
            </div>
            <div id="myModal" className="card-type-1 position-relative">
                <img style={{ width: "50vh", height: "50vh", position: "absolute", left: "100px" }} src={require('../../assets/logo.png')} alt=""/>
                <div className="card-content-type-2">
                    <div className="card-padding">
                        <div className="mt-3 mb-4">
                            <span style={{fontSize: "20px", fontStyle: "bold"}}>Daftar</span>
                        </div>
                        <form onSubmit={ submitHandler }>
                        <div className="form-group">
                            <div className="col px-0">
                                <label className="text-muted" style={{fontSize: "15px"}} htmlFor="fn">Full Name</label>
                                <input value={State.firstName} onChange={e => setState({...State, fullName: e.target.value})} type="text" className="form-control" id="fn"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="email">Masukkan Email</label>
                            <input value={State.email} onChange={e => setState({...State, email: e.target.value})} className="form-control" type="email" id="email"/>
                            {!err ? <span style={{fontSize: '14px'}} className="text-danger">Email tidak benar</span> : null}
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label style={{fontSize: "15px"}} className="text-muted" htmlFor="password">Masukkan Password</label>
                                    <input value={State.password} onChange={e => setState({...State, password: e.target.value})} className="form-control position-relative" type="password" id="password"/>
                                    <i onClick={ seePassword } className="fa fa-eye-slash text-muted position-absolute" style={{ right: "9%", bottom: "15%", cursor: "pointer" }}></i>
                                </div>
                                <div className="col">
                                    <label style={{fontSize: "15px"}} className="text-muted" htmlFor="rp">Masukkan Password Kembali</label>
                                    <input value={State.rePassword} onChange={e => setState({...State, rePassword: e.target.value})} className="form-control position-relative" type="password" id="rp"/>
                                </div>
                            </div>
                            
                        </div>                      
                        {
                            State2.loading ? 
                            <button type="submit" onClick={submitHandler} className="btn btn-success form-control disabled mt-2">Daftar</button>
                            : 
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        </form>
                        { State2.notification ? 
                            <div className="alert alert-danger text-center mt-2" role="alert">{State2.notification}</div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
    } else {
        return <Redirect to="/"/>
    }
}

export default Register