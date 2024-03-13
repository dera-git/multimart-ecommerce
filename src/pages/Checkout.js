import React from 'react'
import Helmet from '../components/healmet/Helmet'
import CommonSection from '../components/UI/CommonSection'

import { useSelector } from 'react-redux'

const Checkout = () => {

  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  return <Helmet title={'Checkout'}>
    <CommonSection title={'Checkout'} />
    <section className='mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            <h5 className='fw-bold mb-4'>Billing informations</h5>
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Enter name" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" placeholder="Phone" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Street address" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="City" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Postal code" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Country" />
              </div>
            </form>
          </div>
          <div className='col-lg-4'>
            <div className='ec-cart-checkout'>
              <h6>Total quantity: <span>{totalQuantity} items</span></h6>
              <h6>Subtotal: <span>${totalAmount}</span></h6>
              <h6>Shipping <br />Free shipping: <span>$0</span></h6>
              <h5 className='mb-4'>Total coast: <span>${totalAmount}</span></h5>
              <button className='ec-btn ec-btn-white fw-bold px-3 py-2 w-100'>Place on order</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Helmet>
}

export default Checkout