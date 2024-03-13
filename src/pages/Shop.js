import React, { useDebugValue, useEffect, useMemo, useState } from "react";
import Helmet from "../components/healmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { BiSearchAlt2 } from "react-icons/bi";
// import products from "../assets/data/products";
import ProductCard from "../components/UI/ProductCard";
import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
  
  const {data: productData, loading, setData: setProductsData, getData:refetch} = useGetData('products');
  const {data: categoryData} = useGetData('categories');

  const [productsCategory, setProductsCategory] = useState();

  useEffect(() => {
    console.log('products',productData);
  }, [productData]);

  const getFilteredProduct = () => {
    if (!productsCategory) {
      // Detect all category
      return productData;
    }
    return productData.filter((item) => item.category === productsCategory);
  };

  const filteredProducts = useMemo(getFilteredProduct, [
    productsCategory,
    productData,
  ]);

  const handleChange = (event) => {
    setProductsCategory(event.target.value);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;

    if(!searchValue){
      refetch()
      return;
    }
    const searchProducts = productData.filter((item) =>
      item.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setProductsData(searchProducts);
   
  };

  // const uniqueCategories = [
  //   ...new Set(productData.map((product) => product.category)),
  // ]

  const handleChangeStatus = (e) => {
    let valueChange = e.target.value
    const copyArray = [...productData];
    
    copyArray.sort((a, b) => {
      return valueChange === 'ascending' ? a.price - b.price : b.price - a.price
    })
    setProductsData(copyArray)
  }

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="ec-filter-widget">
                <select name="cats" onChange={handleChange}>
                  <option value="">All categories</option>
                  {categoryData.map((category, index) => (
                    <option key={index} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="ec-filter-widget">
                <select onChange={handleChangeStatus}>
                  <option>Sort by</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ec-search-box">
                <input
                  type="text"
                  placeholder="Search...."
                  onChange={handleSearch}
                />
                <span>
                  <BiSearchAlt2 />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            { loading ? (
              <h5>Loading...</h5>
            ) : (
              filteredProducts?.map((item, index) => (
                <ProductCard key={index} productItem={item} />
              ))
            )}
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Shop;
