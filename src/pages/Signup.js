import React, { useState } from 'react'
import Helmet from '../components/healmet/Helmet'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'

import { auth } from '../firebase.confing'
import { storage } from '../firebase.confing'
import { db } from '../firebase.confing'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

          // Update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL
          })

          // store user data in firebase database
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          })
        })
      })

      setLoading(false)
      toast.success('Account created')
      navigate('/login')

    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }

  return <Helmet title={'Signup'}>
    <section className='mt-5 pt-4'>
      <div className='container'>
        <div className='row'>
          {
            loading ?
              <div className='col-12'>
                <h5 className='fw-bold text-center'>Loading...</h5>
              </div> :
              <div className='col-lg-6 m-auto text-center'>
                <h3 className='mb-5'>Signup</h3>
                <div className='ec-login-form'>
                  <form onSubmit={signup}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username" />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" />
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <button type='submit' className='ec-btn ec-btn-white px-5 py-2 mt-4'>Create an account</button>
                    <p className='text-white mt-4'>Already have an account? <Link to='/login'>Login</Link></p>
                  </form>
                </div>
              </div>
          }
        </div>
      </div>
    </section>
  </Helmet>
}

export default Signup