import React from 'react'
import './style/Nav.css'

const Nav = () => {
    return (
        <div className="pt-1 mb-2" style={{boxShadow: "1px 1px 2px .1px black"}}>
            <div className="col-12 p-0 d-inline-flex position-relative">
                <a className="nav-checkout" href="/">
                    <i className="fa fa-arrow-left my-auto ml-5 position-absolute h-75" style={{fontSize: "20px", inset: 0, width: "20px"}}></i>
                </a>
                <h4 style={{ zIndex: 10 }} className="mb-0 mx-auto" >
                    <a className="nav-checkout" href="/">Home</a>
                </h4>
            </div>
        </div>
    )
}

export default Nav
