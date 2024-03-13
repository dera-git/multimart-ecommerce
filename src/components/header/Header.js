import React, { useEffect, useRef } from 'react'

import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiShoppingBag, BiHeart } from 'react-icons/bi'
import userIcon from '../../assets/images/user-icon.png'

import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.confing'
import { toast } from 'react-toastify'

const nav__links = [
    {
        path: 'home',
        menu: 'Home'
    },
    {
        path: 'shop',
        menu: 'Shop'
    },
    {
        path: 'cart',
        menu: 'Cart'
    }
]

const Header = () => {

    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const navigate = useNavigate()
    const headerRef = useRef(null)
    const { currentUser } = useAuth()

    const headerSticky = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 || headerRef.current !== null) {
                headerRef.current.classList.add('ec-header-sticky')
            } else {
                headerRef.current.classList.remove('ec-header-sticky')
            }
        })
    }

    useEffect(() => {
        headerSticky()
        return () => {}
        // return () => window.removeEventListener('scroll', headerSticky)
    }, [])

    const navigateToCart = () => {
        navigate('/cart')
    }

    const logout = () => {
        signOut(auth).then(() =>{
            toast.success('Logged out')
            navigate('/home')
        }).catch((err)=>{
            toast.error(err.message)
        })
    }

    return <header ref={headerRef}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to='home' className="navbar-brand ec-logo">
                    <img src={logo} className='img-fluid logo' alt='' />
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className='fw-bold fs-4 ms-3'>
                        MultiMart
                    </motion.div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            nav__links.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <NavLink to={item.path} className="nav-link">{item.menu}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='ec-nav-icons'>
                    <div className='ec-with-badge cursor-pointer'>
                        {<BiHeart />}
                        <span>1</span>
                    </div>
                    <div className='ec-with-badge cursor-pointer' onClick={navigateToCart}>
                        {<BiShoppingBag />}
                        <span>{totalQuantity}</span>
                    </div>
                    <div className='w-25'>
                        <div className="dropdown">
                            <button className="btn p-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <motion.img
                                    whileTap={{ scale: 1.2 }}
                                    src={currentUser ? currentUser.photoURL : userIcon}
                                    alt=""
                                    className='img-fluid ec-img-profil cursor-pointer' />
                                {currentUser ? currentUser.displayName : ''}
                            </button>

                            {
                                currentUser ?
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><span onClick={logout}>Logout</span></li>
                                        <li><Link to='/admin/dashboard' className="dropdown-item">Dashboard</Link></li>
                                    </ul> :
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link to='/signup' className="dropdown-item">Signup</Link></li>
                                        <li><Link to='/login' className="dropdown-item">Login</Link></li>
                                        <li><Link to='/admin/dashboard' className="dropdown-item">Dashboard</Link></li>
                                    </ul>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
}

export default Header