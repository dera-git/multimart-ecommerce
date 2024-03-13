import React, { useState } from 'react'
import useGetData from '../custom-hooks/useGetData'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase.confing'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const EditProducts = () => {

  const { id } = useParams()

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const { data: categorieData } = useGetData('categories')

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
    const docRef = doc(db, 'products', id);
    const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)

    const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(() => {
        toast.error('Images not uploaded')
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            price: enterPrice,
            category: enterCategory,
            imgUrl: downloadURL,
          })
        })
      })
      

      toast.success('Product updated');
    } catch (error) {
      console.error(error);
      toast.error('Product not updated');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            {
              loading ? <h6>Loading.....</h6> : <>

                <h5 className='fw-bold mb-4'>Add products</h5>
                <form onSubmit={handleUpdate}>
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
                  <button className='ec-btn px-3 py-2 mt-4' type='Submit'>Update product</button>
                </form>

              </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditProducts
