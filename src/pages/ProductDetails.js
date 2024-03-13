import React, { useState, useRef, useEffect } from 'react'
import Helmet from '../components/healmet/Helmet'
// import products from '../assets/data/products'
import { useParams } from 'react-router-dom'
import CommonSection from '../components/UI/CommonSection'
import { ImStarFull, ImStarHalf } from 'react-icons/im'
import { motion } from 'framer-motion'
import ProductCard from '../components/UI/ProductCard'

import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

import { db } from '../firebase.confing'
import { doc, getDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'

const ProductDetails = () => {

  const [product, setProduct] = useState({})

  const [tab, setTab] = useState('desc')
  const [rating, setRating] = useState(null)

  const reviewsUser = useRef('')
  const reviewsMsg = useRef('')

  const { id } = useParams()

  const {data: products} = useGetData('products')
  // const product = products.find(item => item.id === id)

  const docRef = doc(db, 'products', id)

  useEffect(() => {
    const getProduct = async() =>{
      const docSnap =  await getDoc(docRef)

      if(docSnap.exists()){
        setProduct(docSnap.data())
      }else{
        console.log('No product!')
      }
    }

    getProduct()
  }, [])

  const { imgUrl, 
    productName, 
    price, 
    // avgRating, 
    // reviews, 
    description, 
    shortDesc, 
    category } = product

  const relatedProducts = products.filter((item) => item.category === category)

  const dispatch = useDispatch()
  const addTocart = () => {
    dispatch(cartActions.addItem({
      id,
      productName,
      imgUrl,
      price
    }))

    toast.success(`Product: ${productName} added successufuly`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const reviewsUserName = reviewsUser.current.value
    const reviewsUserMsg = reviewsMsg.current.value

    const reviewsObj = {
      userName: reviewsUserName,
      text: reviewsUserMsg,
      rating
    }

    toast.success('Reviews submitted')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return <Helmet title={productName}>
    <CommonSection title={productName}></CommonSection>
    <section className='mt-5'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <img src={imgUrl} className='img-fluid' alt='' />
          </div>
          <div className='col-lg-6'>
            <div className='ec-products-detail'>
              <h2>{productName}</h2>
              <div className='d-flex align-items-center mb-3'>
                <div>
                  <ImStarFull color='coral' />
                  <ImStarFull color='coral' />
                  <ImStarFull color='coral' />
                  <ImStarFull color='coral' />
                  <ImStarHalf color='coral' />
                </div>
                {/* <p className='mb-0 ms-3'><span className='ec-color-coral'>({avgRating})</span> ratings</p> */}
              </div>
              <div className='d-flex align-items-center gap-3'>
                <span className='fw-bold'>${price}</span>
                <span>Category: {category}</span>
              </div>
              <p className='mt-4 mb-4'>{shortDesc}</p>
              <motion.button
                initial={{ backgroundColor: 'rgba(31, 26, 60, 1)', color: '#ffffff' }}
                whileHover={{ color: 'coral' }}
                className='ec-btn-motion px-3 py-1'
                onClick={addTocart}>
                Add to cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className=' mt-5'>
      <div className='container'>
        <div className='ec-tab-wrapper d-flex gap-5'>
          <h6 className={`${tab === 'desc' ? 'ec-active-tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
          {/* <h6 className={`${tab === 'rev' ? 'ec-active-tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6> */}
          <h6 className={`${tab === 'rev' ? 'ec-active-tab' : ''}`} onClick={() => setTab('rev')}>Reviews</h6>
        </div>
        {
          tab === 'desc' ?
            <div className='ec-tab-content mt-5'>
              <p>{description}</p>
            </div>
            :
            <div className='ec-tab-content mt-5'>
              {/* <ul className='list-unstyled ps-0'>
                {
                  reviews?.map((item, index) => (
                    <li key={index}>
                      <span className='ec-color-coral fw-bold'>{item.rating} (ratings)</span>
                      <p>{item.text}</p>
                    </li>
                  ))
                }
              </ul> */}
              <div className='mt-5'>
                <h4 className='mb-4'>Leave your experience</h4>
                <form action='' onSubmit={submitHandler}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter name" ref={reviewsUser} />
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <span className='cursor-pointer' onClick={() => setRating(1)}>1 <ImStarFull /></span>
                    <span className='cursor-pointer' onClick={() => setRating(2)}>2 <ImStarFull /></span>
                    <span className='cursor-pointer' onClick={() => setRating(3)}>3 <ImStarFull /></span>
                    <span className='cursor-pointer' onClick={() => setRating(4)}>4 <ImStarFull /></span>
                    <span className='cursor-pointer' onClick={() => setRating(5)}>5 <ImStarFull /></span>
                  </div>
                  <div className="mb-3">
                    <textarea rows={4} type="text" className="form-control" placeholder="Review message" ref={reviewsMsg} />
                  </div>
                  <button type='submit' className='ec-btn px-3 py-2 mt-3'>Submit</button>
                </form>
              </div>
            </div>
        }

      </div>
    </section>
    <section className='mt-5 pt-4'>
      <div className='container'>
        <h4>You may also like</h4>
        <div className='row'>
          {
            relatedProducts?.map((item, index) => (
              <ProductCard key={index} productItem={item} />
            ))
          }
        </div>
      </div>
    </section>
  </Helmet>
}

export default ProductDetails
