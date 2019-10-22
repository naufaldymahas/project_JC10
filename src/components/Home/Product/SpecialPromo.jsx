import React from 'react'

const SpecialPromo = (props) => {
    let products = props.products.map((product, index) => {
        return (
            <div className="col-2-type-2" key={index + 1}>
                <div className="card-type-2">
                    <div className="img-c">
                        <img style={{height: 'auto'}} src={product.imgUrl} alt="ini gambar product"/>
                    </div>
                    <div className="card-body-type-1">
                        <h6 className="text-truncate">{product.name}</h6>
                        <p className="text-truncate text-muted">ini description</p>
                        <p>Rp. {product.price}</p>

                        {props.renderInput(product.id) ?
                        <div id={`btn-cart${product.id}`} className="text-center">
                            <button onClick={() => props.buttonHandler('minus', product.id, product.price)} className="btn-type-1 btn-minus">-</button>
                            <div className="input-cart"><span>{props.renderInput(product.id)}</span></div>
                            <button onClick={() => props.buttonHandler('plus', product.id, product.price)} className="btn-type-1 btn-plus">+</button>
                        </div>
                        :
                        <button onClick={() => props.addCartHandler(product.id, product.name, product.price, product.imgUrl)} 
                        id={`btn-buy${product.id}`}
                        className="btn btn-success form-control">Beli</button>
                        }
                    </div>
                </div>
            </div>
        )
    })
    return products
}

export default SpecialPromo