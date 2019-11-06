import React, { Fragment, useState, useRef, useEffect } from 'react'
import './Style/Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './Cart'
import { cartHandler as inputHandler, removeProduct } from '../../actions/actionCart'
import { onLogout } from '../../actions/actionAuth'
import Cookies from 'universal-cookie'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const cookies = new Cookies()

const Navbar = ({ setLogin }) =>{

    const { quantity, total, user, id } = useSelector( state => ({
        quantity: state.productReducer.addedProduct,
        total: state.productReducer.total,
        user: state.authReducer.fullName,
        id: state.authReducer.id
    }) )

    const [ isDropdown, setIsDropdown ] = useState(0)

    const dispatch = useDispatch()

    const buttonHandler = (cond ,id, price) => {
        if (cond === 'plus') {
            dispatch(inputHandler(cond, id, price))
        } else {
            dispatch(inputHandler(cond, id, price))
        }
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

    const removeHandler = (id) => {
        dispatch(removeProduct(id))
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
        dispatch(onLogout())
        cookies.remove('user')
    }

    const outsideHandler = e => {
        if (node.current.contains(e.target)) {
            // setIsDropdown(1)
            return
        } else {
            setIsDropdown(0)
        }
    }

    const node = useRef()

    // useEffect(() => {
        
    //     if (isDropdown) document.addEventListener('mousedown', outsideHandler)
    //     else document.removeEventListener('mousedown', outsideHandler)

    //     return () => {
    //         document.removeEventListener('mousedown', outsideHandler)
    //     }
    // }, [isDropdown])

    return (
        <Fragment>
            <Cart addedProduct={quantity} 
            cartHandler={value => cartHandler(value)} 
            quantity={renderInput()}
            total={total}
            buttonHandler={(cond ,id, price) => buttonHandler(cond ,id, price)}
            removeProduct={id => removeHandler(id)}/>
            <div className="navbars">
                <div className="navbar-items">
                <span>ini Logo</span>
                <a href="/" className="ml-3 item-link">Kategori</a>
                    <div className="input-group-type1">
                        <input type="text" className="input-color px-2" placeholder="Cari Produk"/>
                        <button className="btn-type1">Search</button>
                    </div>
                    {
                        !user
                        ?
                        <div className="items">
                            <button onClick={() => setLogin(1)} className="masuk">Masuk</button>
                            <a href="/register" className="daftar">Daftar</a>
                        </div>
                        :
                        <div ref={ node } onClick={dropdownHandler} className="profile">
                            <button>{user} <i style={{fontSize: "14px"}} id="dropdown" className="fa fa-caret-left"></i></button>
                        </div>
                    }
                </div>
                {
                    isDropdown
                    ?
                    <div ref={ node } className="profile-dropdown">
                        <ul className="profile-dropdown-item">
                            <li style={{paddingTop: "10px"}}><a className="link" href="/dashboard">Dashboard</a></li> 
                            <li><a href={`/profile/${id}`}>Profil</a></li>
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