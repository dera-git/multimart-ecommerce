import React, { useEffect, useState } from 'react'
import Helmet from '../components/healmet/Helmet'
import heroImg from '../assets/images/hero-img.png'
import { Link } from 'react-router-dom'
import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'
// import products from '../assets/data/products'
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock'

import useGetData from '../custom-hooks/useGetData'

const Home = () => {

    const { data: products, loading } = useGetData('products')

    const [tendingProducts, setTendingProducts] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const [mobileProducts, setMobileProducts] = useState([])
    const [wirelessProducts, setwirelessProducts] = useState([])
    const [popularProducts, setPopularProducts] = useState([])

    const year = new Date().getFullYear()

    useEffect(() => {
        const filterTrendingProducts = products.filter(
            item => item.category === 'Chair'
        )
        const filterbestSalesProducts = products.filter(
            item => item.category === 'Sofa'
        )
        const mobileProducts = products.filter(
            item => item.category === 'Mobile'
        )
        const wirelessProducts = products.filter(
            item => item.category === 'Wireless'
        )
        const popularProducts = products.filter(
            item => item.category === 'Watch'
        )

        setTendingProducts(filterTrendingProducts)
        setBestSalesProducts(filterbestSalesProducts)
        setMobileProducts(mobileProducts)
        setwirelessProducts(wirelessProducts)
        setPopularProducts(popularProducts)
    }, [products])

    return <Helmet title={'Home'}>
        <section className='ec-banner'>
            <div className='container'>
                <div className='row flex-column-reverse flex-md-row'>
                    <div className='col-md-6'>
                        <p>Trending product in {year}</p>
                        <h2>Make your interior More Minimalistic </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Molestiae, a. Nesciunt blanditiis voluptatibus harum rem alias,
                            beatae voluptates quidem iure maxime, optio, quasi sunt. Incidunt, optio. Assumenda reiciendis enim corporis.</p>
                        <button className='ec-btn'>
                            <Link to='/shop'>SHOP NOW</Link>
                        </button>
                    </div>
                    <div className='col-md-6'>
                        <div>
                            <img src={heroImg} className='img-fluid' alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Services />

        <section className='ec-mt-100'>
            <div className='container'>
                <div className='text-center mb-5'>
                    <h2 className='ec-title'>Trending product</h2>
                </div>
                <div className='row gx-5 gy-5'>
                    {
                        loading ? <h5>Loading...</h5> :
                            <ProductList data={tendingProducts} />
                    }
                </div>
            </div>
        </section>
        <section className='ec-mt-100'>
            <div className='container'>
                <div className='text-center mb-5'>
                    <h2 className='ec-title'>Best sales product</h2>
                </div>
                <div className='row gx-5 gy-5'>
                    {
                        loading ? <h5>Loading...</h5> :
                            <ProductList data={bestSalesProducts} />
                    }
                </div>
            </div>
        </section>
        <section className='ec-mt-100 ec-counter py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div>
                            <h3 className='text-white fs-6 mb-2'>Limiter offers</h3>
                            <h4 className='text-white fs-5 mb-3'>Quality Armchair</h4>
                        </div>
                        <Clock />
                        <button className='ec-btn ec-btn-store'>
                            <Link to='/shop'>Visit store</Link>
                        </button>
                    </div>
                    <div className='col-md-6 text-end'>
                        <img src={counterImg} className='img-fluid' alt='' />
                    </div>
                </div>
            </div>
        </section>
        <section className='ec-mt-100'>
            <div className='container'>
                <div className='text-center mb-5'>
                    <h2 className='ec-title'>New arrivals</h2>
                </div>
                <div className='row gx-5 gy-5'>
                    {
                        loading ? <h5>Loading...</h5> :
                            <ProductList data={mobileProducts} />
                    }
                    {
                        loading ? <h5>Loading...</h5> :
                            <ProductList data={wirelessProducts} />
                    }
                </div>
            </div>
        </section>
        <section className='ec-mt-100'>
            <div className='container'>
                <div className='text-center mb-5'>
                    <h2 className='ec-title'>Popular in category</h2>
                </div>
                <div className='row gx-5 gy-5'>
                    {
                        loading ? <h5>Loading...</h5> :
                            <ProductList data={popularProducts} />
                    }
                </div>
            </div>
        </section>
    </Helmet>
}

export default Home
