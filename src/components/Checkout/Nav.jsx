import React from 'react'
import './style/Nav.css'

const Nav = () => {
    return (
        <div className="pt-1 mb-2" style={{boxShadow: "1px 1px 2px .1px black"}}>
            <div className="col-12 p-0 d-inline-flex position-relative">
                <a className="nav-checkout" href="/">
                    <i className="fa fa-arrow-left my-auto ml-5 position-absolute h-75 d-flex"
                    style={{fontSize: "20px", inset: 0, width: "20px",
                    flexDirection: "column", justifyContent: "center"}}></i>
                </a>
                <h4 style={{ zIndex: 10, height: "40px" }} className="mb-0 mx-auto" >
                    <a className="nav-checkout" href="/">
                        <img className="h-100" src={require('../../assets/logo-02.png')} alt="Sayur Fresh"/>
                    </a>
                </h4>
            </div>
        </div>
    )
}

export default Nav
