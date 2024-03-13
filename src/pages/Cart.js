import React from 'react'
import Helmet from '../components/healmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { MdDelete } from 'react-icons/md'

import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Cart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)

  return <Helmet title={'Cart'}>
    <CommonSection title={'Shopping cart'} />
    <section className='mt-5 pt-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-9'>
            {
              cartItems.length === 0 ? <h2>No products added to the cart</h2>
                : <table className='table bordered ec-table-cart'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems?.map((item, index) => (
                        <Tr item={item} key={index} />
                      ))
                    }
                  </tbody>
                </table>
            }

          </div>
          <div className='col-lg-3'>
            <div className='mb-5 d-flex justify-content-between align-items-center'>
              <h6 className='fw-bold mb-0'>Subtotal</h6>
              <span className='fs-5 fw-bold'>${totalAmount}</span>
            </div>
            <div className='mb-5 d-flex justify-content-between align-items-center'>
              <h6 className='fw-bold mb-0'>Total quantity</h6>
              <span className='fs-5 fw-bold'>{totalQuantity} items</span>
            </div>
            <p>Taxes and shipping wille calculate in chechout</p>
            <div>
              <button className='ec-btn px-3 py-2 mb-3 w-100'>
                <Link to='/shop'>continue shopping</Link>
              </button>
              <button className='ec-btn px-3 py-2 w-100'>
                <Link to='/checkout'>Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Helmet>
}

const Tr = ({ item }) => {

  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))

    toast.success('Product removed')
  }

  return <tr>
    <td><img src={item.imgUrl} className='img-fluid ec-img-cart-product' alt='' /></td>
    <td>{item.productName}</td>
    <td>${item.price}</td>
    <td>
      <div className='d-flex align-items-center'>
        <span className='me-3'><AiOutlineMinus /></span>
        {item.quantity}
        <span className='ms-3'><AiOutlinePlus /></span>
      </div>
    </td>
    <td>
      <span className='cursor-pointer' onClick={deleteProduct}><MdDelete fontSize={20} /></span>
    </td>
  </tr>
}

export default Cart
