import React from 'react'
import { motion } from 'framer-motion'
import serviceData from '../assets/data/serviceData'

const Services = () => {
    return <section className='mt-5 pt-4'>
        <div className='container'>
            <div className='row'>
                {
                    serviceData.map((item, index) => (
                        <div className='col-md-4 col-lg-3 mb-4 mb-md-0' key={index}>
                            <motion.div
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.25 }}
                                className="ec-services-item"
                                style={{ background: `${item.bg}` }}>
                                <span><item.icon fontSize={23} color='#ffffff' /></span>
                                <div>
                                    <h5 className='mb-0'>{item.title}</h5>
                                    <p>{item.subtitle}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
}

export default Services