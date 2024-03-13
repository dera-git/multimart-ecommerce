import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ data }) => {
    return <>
        {
            data?.map((item, index) => (
                <ProductCard key={index} productItem={item} />
            ))
        }
    </>
}

export default ProductList