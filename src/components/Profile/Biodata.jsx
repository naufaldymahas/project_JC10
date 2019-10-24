import React, { Fragment } from 'react'

const Biodata = () => {
    return (
        <Fragment>
            <h5 className="card-title pt-3 text-muted">Ubah Biodata Diri</h5>
                <div className="pb-5">
                    <div className="d-inline-flex">
                    <div style={{width: "100px"}}>Nama</div>
                    <div>NOP</div>
                    </div>
                </div>
                <div className="pb-5">
                    <div className="d-inline-flex">
                    <div style={{width: "100px"}}>Email</div>
                    <div>NOP@NOP.com</div>
                    </div>
                </div>
                <div>
                    <div className="d-inline-flex">
                    <div style={{width: "100px"}}>Nomer Hp</div>
                    <div>0812345678</div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Biodata
