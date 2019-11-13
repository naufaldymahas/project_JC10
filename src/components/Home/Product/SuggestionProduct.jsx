import React, { Fragment } from 'react'

const SuggestionProdcut = ({ products }) => {

    const renderList = () => {
        let render = products.map(product => {
            return (
                <a key={ product.id } href={`/productdetail/${product.id}`} className="card m-2 s-link" style={{ display: "grid", flex: "1" }}>
                    <div className="d-flex" style={{ height: "200px" }}>
                        <img className="w-100 my-auto" src={ 'http://localhost:9000/' + product.image } alt="gambar"/>
                    </div>
                    <div className="text-center" style={{ backgroundColor: "green", color: "white", height: "70px", flexDirection: "column", display: "inline-flex", justifyContent: "center" }}>
                        <p className="mb-0">{product.name}</p>
                        <p className="mb-0">{product.unit}</p>
                    </div>
                </a>
            )
        })
        return render
    }

    return (
        <Fragment>
        <h5>Produk Lainnya</h5>
        <div className="card">
            <div className="d-flex mx-0">
                {renderList()}
            </div>
        </div>
        </Fragment>
    )
}

export default SuggestionProdcut
