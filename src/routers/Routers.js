import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'

import AllProducts from '../admin/AllProducts'
import AddProducts from '../admin/AddProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'
import EditProducts from '../admin/EditProducts'
import AddCategory from '../admin/AddCategory'

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Navigate to='home' />} />
    <Route path='home' element={<Home />} />
    <Route path='shop' element={<Shop />} />
    <Route path='shop/:id' element={<ProductDetails />} />
    <Route path='cart' element={<Cart />} />

    {/* Tsy tafiditra @ireto raha tsy connecter */}
    <Route path='/*' element={<ProtectedRoute />} >
      <Route path='checkout' element={<Checkout />} />
      <Route path='admin/dashboard' element={<Dashboard />} />
      <Route path='admin/all-products' element={<AllProducts />} />
      <Route path='admin/add-products' element={<AddProducts />} />
      <Route path='admin/categories' element={<AddCategory />} />
      <Route path='admin/edit-products/:id' element={<EditProducts />} />
      <Route path='admin/users' element={<Users />} />
    </Route>

    <Route path='login' element={<Login />} />
    <Route path='signup' element={<Signup />} />
  </Routes>
}

export default Routers
