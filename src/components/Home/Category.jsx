import React from 'react'
import './Style/Category.css'
import promo from '../../assets/promo.png'
import best from '../../assets/best.png'

const Category = () => {
        return (
            <div className="category-container">
                <a className="category-item" href="/">
                    <div className="card-category">
                            <img src={promo}/>
                            <span>Special Promos</span>
                    </div>
                </a>
                <a className="category-item" href="/">
                    <div className="card-category">
                            <img src={best}/>
                            <span>Best Seller</span>
                    </div>
                </a>
            </div>
        )
}

export default Category