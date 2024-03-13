import React from 'react'
import { motion } from 'framer-motion'
import { AiFillPlusCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ProductCard = ({ productItem }) => {

    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: productItem.id,
            productName: productItem.productName,
            imgUrl: productItem.imgUrl,
            price: productItem.price
        }))

        toast.success(`Product: ${productItem.productName} added successufuly`)
    }

    return (
        <div className='col-md-3'>
            <div className='ec-product-item'>
                <div className="ec-product-img mb-4">
                    <img src={productItem.imgUrl} className='img-fluid' alt='' />
                </div>
                <h4 className='ec-product-name ec-title mb-0'>
                    <Link to={`/shop/${productItem.id}`}>{productItem.productName}</Link>
                </h4>
                <span>{productItem.category}</span>
                <div className='ec-product-card-bottom d-flex align-items-center justify-content-between mt-auto'>
                    <span className='ec-price ec-title'>${productItem.price}</span>
                    <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}><AiFillPlusCircle fontSize={26} /></motion.span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard