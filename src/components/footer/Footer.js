import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return <footer>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'>
          <Link to='home' className="navbar-brand ec-logo">
            <img src={logo} className='img-fluid logo' alt='' />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className='fw-bold fs-4 ms-3'>
              MultiMart
            </motion.div>
          </Link>
          <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Reiciendis quasi mollitia repudiandae consequatur optio, at pariatur consequuntur ducimus a quaerat!</p>
        </div>
        <div className='col-lg-3'>
          <div>
            <h4 className='mb-4'>Top categories</h4>
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0"><Link to='#'>An item</Link></li>
            </ul>
          </div>
        </div>
        <div className='col-lg-2'>
          <div>
            <h4 className='mb-4'>usefull links</h4>
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0"><Link to='/shop'>Shop</Link></li>
              <li className="list-group-item border-0 ps-0"><Link to='/cart'>Sart</Link></li>
              <li className="list-group-item border-0 ps-0"><Link to='/login'>Login</Link></li>
              <li className="list-group-item border-0 ps-0"><Link to='/'>Privacy policy</Link></li>
            </ul>
          </div>
        </div>
        <div className='col-lg-3'>
          <div>
            <h4 className='mb-4'>Contact</h4>
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0 d-flex">
                  <span><MdLocationOn fontSize={20} /></span>
                  <p className='ms-2'>101 Antananarivo, Madagascar</p>
              </li>
              <li className="list-group-item border-0 ps-0 d-flex">
                  <span><FaPhoneAlt /></span>
                  <p className='ms-2'>+026 65 765 865</p>
              </li>
              <li className="list-group-item border-0 ps-0 d-flex">
                  <span><MdOutlineEmail fontSize={20} /></span>
                  <p className='ms-2'>example123@email.com</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='col-12 mt-5'>
          <p>Copyright {year} developed by Rdf dev. All rights reserved</p>
        </div>
      </div>
    </div>
  </footer>

}

export default Footer