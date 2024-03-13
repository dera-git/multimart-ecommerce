import React from 'react'
import useGetData from '../custom-hooks/useGetData'

const Dashboard = () => {

  const { data: products } = useGetData('products')
  const { data: users } = useGetData('users')

  return <>
    <section className='pt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='bg1 px-2 py-3'>
              <h5>Total Sales</h5>
              <span>$30</span>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='bg2 px-2 py-3'>
              <h5>Orders</h5>
              <span>$30</span>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='bg3 px-2 py-3'>
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='bg4 px-2 py-3'>
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Dashboard