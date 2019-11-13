import React from 'react'

const AllProduct = (props) => {

    const checkInput = (id, price, stock) => {
        let product = props.addedProduct.find(product => product.id === id)
        return (
            <>
            <button onClick={() => props.buttonHandler('minus', id, price, props.renderInput(id))} className="btn-type-1 btn-minus">-</button>
            <div className="input-cart">
                <span className="px-0">{props.renderInput(id)}</span>
            </div>
            {
                product.quantity === stock ?
                    <button disabled style={{ cursor: "no-drop" }} className="btn-type-1 btn-plus">+</button>
                :
                    <button onClick={() => props.buttonHandler('plus', id, price, props.renderInput(id))} className="btn-type-1 btn-plus">+</button>
            }
            </>
        )
    }

    let products = props.products.map((product, index) => {
        return (
            <div className="col-2-type-2" key={index + 1}>
                <div className="card-type-2">
                    <a href={`/productdetail/${product.id}`}>
                        <div className="img-c">
                            <img style={{height: 'auto'}} src={props.API + product.image} alt="ini gambar product"/>
                        </div>
                    </a>
                    <div className="card-body-type-1 position-relative">
                        <h6 className="text-truncate">{product.name}</h6>
                        {/* <p style={{fontSize: "14px"}} className="text-truncate text-muted">{product.unit}</p> */}
                        <span style={{ fontSize: "15px" }} className="px-0">Stock {product.displayStock}</span>
                        {product.discount ? 
                        <div style={{height: "80px", display: "grid"}}>
                            <span className="px-0" style={{textDecoration: "line-through", height: "0"}}>Rp. {product.price.toLocaleString('id')}</span>
                            <span style={{fontSize: "16px", top: "3rem"}} className="px-0 text-muted">Rp. {(product.price - (product.price * product.discount/100)).toLocaleString('id')}<small>/{product.unit}</small></span>                     
                        </div>
                        :
                        <div style={{height: "80px"}}>
                            <span className="px-0">Rp. {product.price.toLocaleString('id')}<small>/{product.unit}</small></span>
                        </div>
                        }

                        {props.renderInput(product.id) ?
                        <div id={`btn-cart${product.id}`} className="text-center">
                            {checkInput(product.id, product.price, product.displayStock)}
                        </div>
                        :
                        <button onClick={() => props.addCartHandler(product.id, product.name, product.price, product.image, product.unit, product.discount)} 
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

export default AllProduct