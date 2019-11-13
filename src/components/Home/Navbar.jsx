import React, { Fragment, useState, useRef } from 'react'
import './Style/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './Cart'
import { cartHandler as inputHandler, removeProduct, clearProduct } from '../../actions/actionCart'
import { onLogout } from '../../actions/actionAuth'

const Navbar = ({ setLogin, search, setSearch, searchHandler, products }) =>{

    const { quantity, total, user, id, role } = useSelector( state => ({
        quantity: state.productReducer.addedProduct,
        total: state.productReducer.total,
        user: state.authReducer.fullName,
        id: state.authReducer.id,
        role: state.authReducer.role
    }) )

    const [ isDropdown, setIsDropdown ] = useState(0)

    const dispatch = useDispatch()

    const buttonHandler = (cond ,productId, price, quantity) => {
        dispatch(inputHandler(cond, productId, price, quantity, id))
    }

    const cartHandler = (cond) => {
        let cart = document.getElementById('cart').classList
        let cartContainer = document.getElementById('cart-container').classList
        if (cond === 'open') {
            cart.remove('unactive')
            cart.add('active')
            cartContainer.add('cart-right-show')
        } else {
            cart.remove('active')
            cart.add('unactive')
            cartContainer.remove('cart-right-show')
        }
    }

    const renderInput = () => {
        let Qty = 0
        quantity.forEach(value => {
            Qty += value.quantity
        })
        return Qty
    }

    const removeHandler = (productId) => {
        dispatch(removeProduct(productId, id))
    }

    const dropdownHandler = () => {
        let caret = document.getElementById('dropdown').classList
        if (!isDropdown) {
            caret.replace('fa-caret-left', 'fa-caret-down')
            setIsDropdown(1)
        } else {
            caret.replace('fa-caret-down', 'fa-caret-left')
            setIsDropdown(0)
        }
    }

    const logoutHandler = () => {
        setLogin(0)
        setIsDropdown(0)
        dispatch(clearProduct())
        dispatch(onLogout())
    }

    const outsideHandler = e => {
        if (node.current.contains(e.target)) {
            return
        } else {
            setIsDropdown(0)
        }
    }

    const node = useRef()

    return (
        <Fragment>
            <Cart addedProduct={quantity} 
            cartHandler={value => cartHandler(value)} 
            quantity={renderInput()}
            total={total}
            products={products}
            buttonHandler={(cond ,productId, price, quantity) => buttonHandler(cond ,productId, price, quantity)}
            removeProduct={id => removeHandler(id)}/>
            <div className="row mx-0 py-2" style={{ borderBottom: "1px solid #cacaca" }}>
                <a href="/" className="my-auto col-md-2 text-center" style={{ height: "35px" }}>
                    <img className="h-100" src={require('../../assets/logo-02.png')} alt="logo"/>
                </a>
                <form onSubmit={ searchHandler } className="col-md-8 my-auto text-center">
                    <input className="input-color" value={search} onChange={ e => setSearch(e.target.value) } type="text"/>
                    <button className="btn-type1" onClick={ searchHandler } type="submit">Search</button>
                </form>
                    <div className="col-md-2 my-auto">
                    {
                        !user
                        ?
                            <>
                                <button className="masuk mr-2" onClick={() => setLogin(1)}>Masuk</button>
                                <a className="daftar" href="/register">Daftar</a>
                            </>
                        
                        :
                            <>
                                <button onClick={dropdownHandler} className="profile">{user} <i style={{fontSize: "14px"}} id="dropdown" className="fa fa-caret-left"></i></button>
                            </>
                    }
                    </div>
                {
                    isDropdown
                    ?
                    <div ref={ node } className="profile-dropdown">
                        <ul className="profile-dropdown-item">
                            {
                                role === "admin" ?
                                <li style={{paddingTop: "10px"}}><a className="link" href="/dashboard">Dashboard</a></li> 
                                :
                                null
                            }
                            <li><a href={`/profile/${id}/biodata`}>Profil</a></li>
                            <li style={{paddingBottom: "5px"}} onClick={logoutHandler}>Keluar</li>
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
            <div className="basket-fixed">
            <button onClick={() => cartHandler('open')} className="basket" href="/"><i style={{fontSize: "20px"}} className="fa fa-shopping-basket"></i></button>
                        {renderInput() ? 
                        <div className="cart-badge">
                            <span className="cart-number">
                            {renderInput()}
                            </span>
                        </div>
                        : null}
            </div>
        </Fragment>
    )
}

export default Navbar