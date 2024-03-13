import React from 'react'

const CommonSection = ({title}) => {
  return <section className='ec-section-common'>
    <div className='container'>
        <h1 className='text-center'>{title}</h1>
    </div>
  </section>
}

export default CommonSection