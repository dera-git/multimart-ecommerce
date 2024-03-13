import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { storage } from '../firebase.confing'
import { db } from '../firebase.confing'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import useGetData from '../custom-hooks/useGetData'

const AddProducts = () => {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const { data: categorieData } = useGetData('categories')

  const navigate = useNavigate()

  const addNewProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   description: enterDescription,
    //   price: enterPrice,
    //   category: enterCategory,
    //   imgUrl: enterProductImg
    // }

    // ========== Add product to the database firebase ==========
    try {
      const docRef = await collection(db, 'products')
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(() => {
        toast.error('Images not uploaded')
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            price: enterPrice,
            category: enterCategory,
            imgUrl: downloadURL
          })
        })

      })

      setLoading(false)
      toast.success('Product successfully added')
      navigate('/admin/all-products')
    } catch (err) {
      setLoading(false)
      toast.error('product not added!')
    }


    // console.log(product);
  }

  return (
    <section className='mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            {
              loading ? <h6>Loading.....</h6> : <>

                <h5 className='fw-bold mb-4'>Add products</h5>
                <form onSubmit={addNewProduct}>
                  <div className="mb-3">
                    <label htmlFor="#p-name">Product title</label>
                    <input type="text" id='p-name' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} className="form-control" placeholder="Product title" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="#p-short-desc">Short description</label>
                    <input type="text" id='p-short-desc' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} className="form-control" placeholder="desc" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="#p-desc">Description</label>
                    {/* <input type="text" id='p-desc' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} className="form-control" placeholder="Description" required /> */}
                    <textarea className="form-control" id="p-desc" cols="30" rows="5" defaultValue={enterDescription} onChange={e => setEnterDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="#p-price">Price</label>
                    <input type="number" id='p-price' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} className="form-control" placeholder="$100" required />
                  </div>
                  <div className="mb-3">
                    <label>Category</label>
                    <select name='category' value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required >
                      <option>Select category</option>
                      {
                        categorieData?.map((itemCategory, index) => (
                          <option key={index} value={itemCategory.category}>
                            {itemCategory.category}
                            </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="#p-image">Product image</label>
                    <input type="file" id='p-image' onChange={e => setEnterProductImg(e.target.files[0])} className="form-control" placeholder="Image" required />
                  </div>
                  <button className='ec-btn px-3 py-2 mt-4' type='Submit'>Add product</button>
                </form>

              </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddProducts