import React from 'react'

const Nav = () => {
    return (
        <div className="py-2 mb-2" style={{boxShadow: "1px 1px 2px .1px black"}}>
            <div className="col-12 p-0 d-inline-flex position-relative">
                <i className="fa fa-arrow-left my-auto ml-5 position-absolute h-75" style={{fontSize: "20px", inset: 0}}></i>
                <h4 className="mb-0 mx-auto" ><a href="/">Home</a></h4>
            </div>
        </div>
    )
}

export default Nav
