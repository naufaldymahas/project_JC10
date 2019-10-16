import React, { Component } from 'react'
import './Style/Login.css'

class Login extends Component {
    
    onSubmitClick = () => {
        let {email, password} = this.refs
    }

    render() {
        return (
            <div id="myModal" className="modal-type-1">
                {/* Modal Content */}
                <div className="modal-content-type-1">
                    <span onClick={() => this.props.onLoginHandler(0)} className="close-type-1">&times;</span>
                    <div className="padding-modal">
                        <div className="mt-5 mb-4">
                            <span style={{fontSize: "20px", fontStyle: "bold"}}>Masuk</span>
                            <a href="/" className="float-right text-daftar">Daftar</a>
                        </div>
                        <form>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="email">Masukkan Email</label>
                            <input ref="email" className="form-control" type="text" id="email"/>
                        </div>
                        <div className="form-group">
                            <label style={{fontSize: "15px"}} className="text-muted" htmlFor="password">Masukkan Password</label>
                            <input ref="password" className="form-control" type="password" id="password"/>
                        </div>                        
                        </form>
                        <button onClick={this.onSubmitClick} className="btn btn-success form-control disabled mt-2">Masuk</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login