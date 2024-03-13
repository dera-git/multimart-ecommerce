import React, { useState } from 'react'
import Helmet from '../components/healmet/Helmet'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.confing'
import { toast } from 'react-toastify'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user
      // console.log(user);
      setLoading(false)
      toast.success('Successfully logged in')
      navigate('/admin/dashboard')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return <Helmet title={'Login'}>
    <section className='mt-5 pt-4'>
      <div className='container'>
        <div className='row'>
          {
            loading ?
              <div className='col-12'>
                <h5 className='fw-bold text-center'>Loading...</h5>
              </div> :
              <div className='col-lg-6 m-auto text-center'>
                <h3 className='mb-5'>Login</h3>
                <div className='ec-login-form'>
                  <form onSubmit={signIn}>
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
                    <button type='submit' className='ec-btn ec-btn-white px-5 py-2 mt-4'>Login</button>
                    <p className='text-white mt-4'>Don't have account? <Link to='/signup'>Create account</Link></p>
                  </form>
                </div>
              </div>
          }
        </div>
      </div>
    </section>
  </Helmet>
}

export default Login