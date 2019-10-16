import React, { Component,Fragment } from 'react'
import API from '../../services'
import Swal from 'sweetalert2'
import './Style/Register.css'

class Register extends Component {

    state = {
        loading: true,
        error: ''
    }

    submitHandler = () => {
        this.setState({loading: false})
        const {firstName, lastName, email, password} = this.refs
        const data = {
            fullName: `${firstName.value} ${lastName.value}`,
            email: email.value,
            password: password.value
        }
        if (firstName.value && lastName.value && email.value && password.value) {
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
                    this.setState({loading: true})
                }, 5000);
            })
        } else {
            this.setState({loading: true, error: 'Plase fill in the form!'})
            setTimeout(() => {
                this.setState({error: ''})
            }, 5000);
        }
        
    }

    render() {
        return (
            <Fragment>
                <div className="text-center mt-3">
                    <a className="to-home" href="/">Home</a>
                </div>
                <div id="myModal" className="card-type-1">
                    {/* Modal Content */}
                    <div className="card-content-type-1">
                        <div className="card-padding">
                            <div className="mt-3 mb-4">
                                <span style={{fontSize: "20px", fontStyle: "bold"}}>Daftar</span>
                            </div>
                            <form>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="fn">First Name</label>
                                        <input ref="firstName" type="text" className="form-control" id="fn"/>
                                    </div>
                                    <div className="col">
                                        <label className="text-muted" style={{fontSize: "15px"}} htmlFor="ln">Last Name</label>
                                        <input ref="lastName" type="text" className="form-control" id="ln"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{fontSize: "15px"}} className="text-muted" htmlFor="email">Masukkan Email</label>
                                <input ref="email" className="form-control" type="text" id="email"/>
                            </div>
                            <div className="form-group">
                                <label style={{fontSize: "15px"}} className="text-muted" htmlFor="password">Masukkan Password</label>
                                <input ref="password" className="form-control" type="password" id="password"/>
                            </div>                      
                            </form>
                            {this.state.loading ? <button onClick={this.submitHandler} className="btn btn-success form-control disabled mt-2">Daftar</button>
                            : <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>}
                            {this.state.error ? <div class="alert alert-danger text-center mt-2" role="alert">{this.state.error}</div>
                            : null}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Register