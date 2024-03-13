import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { db } from '../firebase.confing'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AllProducts = () => {

  const { data: productsData, loading } = useGetData('products')

  const deleteProduct = async (id) => {
    if(window.confirm('Are yor sure to delete this?')){
      await deleteDoc(doc(db, "products", id))
      toast.success('Product deleted successfully!')
    }else{
      toast.error('Product not deleted!')
    }
  }

  return (
    <section>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? <tr><td colSpan={5}><h5 className='py-5'>Loading...</h5></td></tr> :
                productsData.map(item => (
                  <tr key={item.id} className='align-middle'>
                    <td><img src={item.imgUrl} alt="" className='img-fluid ec-img-cart-product' /></td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>
                      <Link to={`/shop/${item.id}`}>View</Link>
                      <Link to={`/admin/edit-products/${item.id}`} className='btn cursor-pointer'>
                        <MdEdit color={'green'} fontSize={20} />
                      </Link>
                      <button onClick={() => { deleteProduct(item.id) }} className='btn cursor-pointer'><MdDelete color={'red'} fontSize={20} /></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllProducts