import React from 'react'
import logo from './../assets/images/eco-logo.png'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import { GrNotification } from 'react-icons/gr'
import { FiSettings } from 'react-icons/fi'

import useAuth from '../custom-hooks/useAuth'

const admin_Nav = [
  {
    display: 'Dashboard',
    path: '/admin/dashboard',
    subMenu: ''
  },
  {
    display: 'Products',
    path: '',
    subMenu: [
      {
        display: 'Add Products',
        path: '/admin/add-products'
      },
      {
        display: 'All Products',
        path: '/admin/all-products'
      },
      {
        display: 'Categories',
        path: '/admin/categories'
      }
    ]
  },
  {
    display: 'Orders',
    path: '/admin/orders',
    subMenu: ''
  },
  {
    display: 'Users',
    path: '/admin/users',
    subMenu: ''
  }
]

const AdminNav = () => {
  const { currentUser } = useAuth()

  return <>
    <header>
      <div className='py-3'>
        <div className='container'>
          <div className='d-flex align-items-center'>
            <div className='me-auto'>
              <Link to='home' className="navbar-brand ec-logo">
                <img src={logo} className='img-fluid logo' alt='' />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className='fw-bold fs-4 ms-3'>
                  MultiMart
                </motion.div>
              </Link>
            </div>
            <div className='ec-search-box w-50'>
              <input type='text' placeholder='Search....' />
              <span><BiSearchAlt2 /></span>
            </div>
            <div className='ms-4'>
              <span className='mx-1'><GrNotification /></span>
              <span className='mx-1'><FiSettings /></span>
              <span className='ms-2'>{currentUser && currentUser.displayName}</span>
              <img src={currentUser && currentUser.photoURL} className='ec-img-profil cursor-pointer img-fluid' alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                admin_Nav.map((item, index) => (
                  <li key={index} className={ item.subMenu === '' ? 'nav-item' : 'nav-item dropdown'}>
                    <NavLink to={item.path} 
                      className={ (navClass) => `nav-link ${navClass.isActive ? 'active' : ''} ${
                        item.subMenu !== '' ? 'dropdown-toggle' : ''
                      }` }
                      {...(item.subMenu !== ''
                        ? { id: `navbarDropdown-${index}`, 'data-bs-toggle': 'dropdown', 'aria-expanded': 'false' }
                        : {})
                      }
                       >
                      {item.display}
                    </NavLink>
                    
                    { item.subMenu ? (
                      <ul className="dropdown-menu" aria-labelledby={`navbarDropdown-${index}`}>
                      { 
                        item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink to={subItem.path} className="dropdown-item">{subItem.display}</NavLink>
                          </li>
                        )) 
                        
                      }
                      </ul>
                    ) : null }
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </>
}

export default AdminNav